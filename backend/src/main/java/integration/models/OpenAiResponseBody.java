package integration.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpenAiResponseBody {
    private String id;
    private String object;
    private long created;
    private String model;
    private List<Choice> choices;
    private Usage usage;
    private String system_fingerprint;
    // Getters and setters

    @Getter
    @Setter
    public static class Choice {
        private int index;
        private Message message;
        private Object logprobs;
        private String finish_reason;

        // Getters and setters
    }

    @Getter
    @Setter
    public static class Message {
        private String role;
        private String content;

        // Getters and setters
    }

    @Getter
    @Setter
    public static class Usage {
        private int prompt_tokens;
        private int completion_tokens;
        private int total_tokens;

        // Getters and setters
    }
}
