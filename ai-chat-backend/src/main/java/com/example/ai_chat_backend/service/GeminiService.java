package com.example.ai_chat_backend.service;

import com.example.ai_chat_backend.dto.ChatRequest;
import com.example.ai_chat_backend.dto.ChatResponse;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService implements AIService {

    @Value("${ai.providers.gemini.api-key:}")
    private String apiKey;

    @Value("${ai.providers.gemini.base-url}")
    private String baseUrl;

    @Value("${ai.providers.gemini.model}")
    private String model;

    @Value("${ai.providers.gemini.enabled:true}")
    private boolean enabled;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public ChatResponse chat(ChatRequest request) {

        if (!enabled || apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException("Gemini service is not configured");
        }

        // ✅ Combine all messages into one prompt
        StringBuilder fullPrompt = new StringBuilder();
        request.getMessages().forEach(msg -> {
            fullPrompt.append(msg.getRole())
                      .append(": ")
                      .append(msg.getContent())
                      .append("\n");
        });

        // ✅ Gemini request body format
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", fullPrompt.toString());

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(textPart));

        Map<String, Object> body = new HashMap<>();
        body.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        String url = baseUrl + "/v1/models/" + model + ":generateContent?key=" + apiKey;



        JsonNode response = restTemplate.postForObject(
                url,
                entity,
                JsonNode.class
        );

        String output = response
                .get("candidates")
                .get(0)
                .get("content")
                .get("parts")
                .get(0)
                .get("text")
                .asText();

        ChatResponse chatResponse = new ChatResponse();
        chatResponse.setId("gem-" + System.currentTimeMillis());
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
        return "Gemini";
    }

    @Override
    public boolean isEnabled() {
        return enabled && apiKey != null && !apiKey.isEmpty();
    }
}
