package com.example.ai_chat_backend.service;

import com.example.ai_chat_backend.dto.ChatRequest;
import com.example.ai_chat_backend.dto.ChatResponse;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class HuggingFaceService implements AIService {

    @Value("${ai.providers.huggingface.api-key}")
    private String apiKey;

    @Value("${ai.providers.huggingface.base-url}")
    private String baseUrl;

    @Value("${ai.providers.huggingface.model}")
    private String model;

    @Value("${ai.providers.huggingface.enabled:true}")
    private boolean enabled;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public ChatResponse chat(ChatRequest request) {

        if (!enabled || apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException("HuggingFace service is not configured");
        }

        // ✅ Merge full conversation into ONE prompt
        StringBuilder prompt = new StringBuilder();
        request.getMessages().forEach(msg -> {
            prompt.append(msg.getRole())
                  .append(": ")
                  .append(msg.getContent())
                  .append("\n");
        });

        // ✅ NEW ROUTER BODY FORMAT
        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt.toString());

        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", List.of(message));
        body.put("max_tokens", request.getMaxTokens());
        body.put("temperature", request.getTemperature());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey); // ✅ REQUIRED

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        // ✅ NEW OFFICIAL ROUTER ENDPOINT
        String url = baseUrl + "/v1/chat/completions";

        JsonNode response = restTemplate.postForObject(
                url,
                entity,
                JsonNode.class
        );

        String output = response
                .get("choices")
                .get(0)
                .get("message")
                .get("content")
                .asText();

        ChatResponse chatResponse = new ChatResponse();
        chatResponse.setId("hf-" + System.currentTimeMillis());
        chatResponse.setContent(output);
        chatResponse.setModel(model);

        ChatResponse.Usage usage = new ChatResponse.Usage();
        usage.setPromptTokens(0);
        usage.setCompletionTokens(0);
        usage.setTotalTokens(0);
        chatResponse.setUsage(usage);

        return chatResponse;
    }

    @Override
    public String getProviderName() {
        return "HuggingFace";
    }

    @Override
    public boolean isEnabled() {
        return enabled && apiKey != null && !apiKey.isEmpty();
    }
}
