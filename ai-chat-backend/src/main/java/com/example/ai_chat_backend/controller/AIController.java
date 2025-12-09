package com.example.ai_chat_backend.controller;

import com.example.ai_chat_backend.dto.ChatRequest;
import com.example.ai_chat_backend.dto.ChatResponse;
import com.example.ai_chat_backend.dto.ProviderInfo;
import com.example.ai_chat_backend.service.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AIController {

    private final OpenAIService openAIService;
    private final GeminiService geminiService;
    private final GroqService groqService;
    private final DeepSeekService deepSeekService;
    private final HuggingFaceService huggingFaceService;

    // ✅ MANUAL CONSTRUCTOR (NO LOMBOK)
    public AIController(OpenAIService openAIService,
                        GeminiService geminiService,
                        GroqService groqService,
                        DeepSeekService deepSeekService,
                        HuggingFaceService huggingFaceService) {

        this.openAIService = openAIService;
        this.geminiService = geminiService;
        this.groqService = groqService;
        this.deepSeekService = deepSeekService;
        this.huggingFaceService = huggingFaceService;
    }

    // ✅ PROVIDERS API
    @GetMapping("/providers")
    public ResponseEntity<Map<String, ProviderInfo>> getProviders() {

        Map<String, ProviderInfo> providers = new HashMap<>();

        providers.put("openai", new ProviderInfo(
                openAIService.getProviderName(),
                openAIService.isEnabled() ? "gpt-3.5-turbo" : "Not configured",
                "https://api.openai.com/v1"
        ));

        providers.put("gemini", new ProviderInfo(
                geminiService.getProviderName(),
                geminiService.isEnabled() ? "gemini-free" : "Not configured",
                "https://generativelanguage.googleapis.com"
        ));

        providers.put("groq", new ProviderInfo(
                groqService.getProviderName(),
                groqService.isEnabled() ? "llama3-70b-8192" : "Not configured",
                "https://api.groq.com/openai/v1"
        ));

        providers.put("deepseek", new ProviderInfo(
                deepSeekService.getProviderName(),
                deepSeekService.isEnabled() ? "deepseek-chat" : "Not configured",
                "https://api.deepseek.com"
        ));

        
        providers.put("huggingface", new ProviderInfo(
                huggingFaceService.getProviderName(),
                huggingFaceService.isEnabled() ? "zephyr-7b-beta" : "Not configured",
                "https://router.huggingface.co"
        ));


        return ResponseEntity.ok(providers);
    }

    // ✅ CHAT API
    @PostMapping("/chat/{provider}")
    public ResponseEntity<ChatResponse> chat(
            @PathVariable String provider,
            @RequestBody ChatRequest request) {

        try {
            ChatResponse response;

            switch (provider.toLowerCase()) {

                case "openai":
                    response = openAIService.chat(request);
                    break;

                case "gemini":
                    response = geminiService.chat(request);
                    break;

                case "groq":
                    response = groqService.chat(request);
                    break;

                case "deepseek":
                    response = deepSeekService.chat(request);
                    break;

                
                case "huggingface":
                    response = huggingFaceService.chat(request);
                    break;

                default:
                    return ResponseEntity.badRequest()
                            .body(createErrorResponse("Invalid provider: " + provider));
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse(e.getMessage()));
        }
    }

    private ChatResponse createErrorResponse(String error) {
        ChatResponse response = new ChatResponse();
        response.setContent("Error: " + error);
        return response;
    }

    // ✅ HEALTH CHECK
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {

        Map<String, String> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "AI Chat Backend");

        return ResponseEntity.ok(health);
    }
}
