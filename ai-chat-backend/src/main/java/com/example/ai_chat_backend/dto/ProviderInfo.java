package com.example.ai_chat_backend.dto;

public class ProviderInfo {

    private String name;
    private String model;
    private String baseUrl;
    private Boolean enabled = true;

    public ProviderInfo() {
    }

    public ProviderInfo(String name, String model, String baseUrl) {
        this.name = name;
        this.model = model;
        this.baseUrl = baseUrl;
        this.enabled = true;
    }

    public String getName() {
        return name;
    }

    public String getModel() {
        return model;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
