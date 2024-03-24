package com.zydrunas.imageAnalyzer.integration.service;

import com.zydrunas.imageAnalyzer.integration.OpenAIConstants;
import com.zydrunas.imageAnalyzer.integration.models.Message;
import com.zydrunas.imageAnalyzer.integration.models.OpenAiRequestBody;
import com.zydrunas.imageAnalyzer.integration.models.OpenAiResponseBody;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@Log4j2
public class OpenAICallsService {

    public String callOpenAi(String label, String category) {
        String prompt = "does "+label+" fall in any of these categories: "+category+"? if yes write category name if no just write no, no other symbols in response";

        WebClient client = WebClient.builder()
                .baseUrl(OpenAIConstants.URL)
                .defaultHeader("Authorization","Bearer "+OpenAIConstants.API_KEY)
                .build();

        Message message = new Message("user",prompt);

        OpenAiRequestBody openAiRequestBody = OpenAiRequestBody.builder()
                .model(OpenAIConstants.MODEL)
                .messages(List.of(message))
                .build();

        Mono<OpenAiResponseBody> response = client.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(openAiRequestBody)
                .retrieve()
                .bodyToMono(OpenAiResponseBody.class);

        return response.block().getChoices().get(0).getMessage().getContent();
    }
}
