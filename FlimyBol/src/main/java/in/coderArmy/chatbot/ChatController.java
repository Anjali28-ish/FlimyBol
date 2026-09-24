package in.coderArmy.chatbot;

import in.coderArmy.chatbot.dto.DialogueRequest;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody DialogueRequest request) {
        return chatService.chat(request);
    }
}
