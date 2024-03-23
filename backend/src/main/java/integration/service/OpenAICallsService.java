package integration.service;

import integration.OpenAIConstants;
import integration.models.Message;
import integration.models.OpenAiRequestBody;
import integration.models.OpenAiResponseBody;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

public class OpenAICallsService {

    public String callOpenAi(String label, String category) {
        String prompt = "does "+label+" fall in a category "+category+"? write probability in percents without percentage symbol, nothing else";

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

        System.out.println(response.block().getChoices().get(0).getMessage().getContent());
        return "";
    }
}
