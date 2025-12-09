package com.example.ai_chat_backend.service;

import com.example.ai_chat_backend.dto.ChatRequest;
import com.example.ai_chat_backend.dto.ChatResponse;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class OpenAIService implements AIService {

    @Value("${ai.providers.openrouter.api-key:}")
    private String apiKey;

    @Value("${ai.providers.openai.base-url:https://openrouter.ai/api/v1}")
    private String baseUrl;

    @Value("${ai.providers.openai.model:openai/gpt-oss-120b:free}")
    private String model;

    @Value("${ai.providers.openai.enabled:true}")
    private boolean enabled;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public ChatResponse chat(ChatRequest request) {

        if (!enabled || apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException("OpenAI service is not configured");
        }

        String finalModel = request.getModel() != null ? request.getModel() : this.model;

        Map<String, Object> body = Map.of(
                "model", finalModel,
                "messages", request.getMessages(),
                "temperature", request.getTemperature(),
                "max_tokens", request.getMaxTokens()
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        JsonNode response = restTemplate.postForObject(
                baseUrl + "/chat/completions",
                entity,
                JsonNode.class
        );

        ChatResponse chatResponse = new ChatResponse();
        chatResponse.setId(response.get("id").asText());
        chatResponse.setContent(
                response.get("choices").get(0).get("message").get("content").asText()
        );
        chatResponse.setModel(response.get("model").asText());

        JsonNode usageNode = response.get("usage");
        ChatResponse.Usage usage = new ChatResponse.Usage();
        usage.setPromptTokens(usageNode.get("prompt_tokens").asInt());
        usage.setCompletionTokens(usageNode.get("completion_tokens").asInt());
        usage.setTotalTokens(usageNode.get("total_tokens").asInt());

        chatResponse.setUsage(usage);

        return chatResponse;
    }

    @Override
    public String getProviderName() {
        return "OpenAI";
    }

    @Override
    public boolean isEnabled() {
        return enabled && apiKey != null && !apiKey.isEmpty();
    }
}
