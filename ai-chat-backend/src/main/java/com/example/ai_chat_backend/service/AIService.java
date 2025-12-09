package com.example.ai_chat_backend.service;

import com.example.ai_chat_backend.dto.ChatRequest;
import com.example.ai_chat_backend.dto.ChatResponse;

public interface AIService {

    ChatResponse chat(ChatRequest request);

    String getProviderName();

    boolean isEnabled();
}
