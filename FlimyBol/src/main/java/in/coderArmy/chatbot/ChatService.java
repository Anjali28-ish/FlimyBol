
package in.coderArmy.chatbot;

import in.coderArmy.chatbot.dto.DialogueRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    private final String SYSTEM_PROMPT = """
            You are CineTalk AI, a professional screenplay writer.

            Rewrite the user's sentence into a completely original cinematic dialogue.

            Rules:
            - Never copy existing movie dialogues.
            - Preserve the original meaning.
            - Match the requested genre.
            - Match the requested emotion.
            - Use the requested language.
            - Make the dialogue engaging.
            - Return only the dialogue.
            """;

    public String chat(DialogueRequest request) {

        String userPrompt = """
                Sentence: %s
                Genre: %s
                Emotion: %s
                Language: %s
                """.formatted(
                request.getSentence(),
                request.getGenre(),
                request.getEmotion(),
                request.getLanguage()
        );

        return chatClient.prompt()
                .system(SYSTEM_PROMPT)
                .user(userPrompt)
                .call()
                .content();
    }
}

