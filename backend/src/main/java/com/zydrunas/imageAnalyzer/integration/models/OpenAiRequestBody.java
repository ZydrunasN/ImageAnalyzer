package com.zydrunas.imageAnalyzer.integration.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class OpenAiRequestBody {
    private String model;
    private List<Message> messages;

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}