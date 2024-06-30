//dynamically importing the ollama module
import("ollama")
    .then((ollama) => {
        ollama = import("ollama");
        let modelResponse = "";

        let chatConfig = {
            model: "mistral",
            role: "user",
            content: "Default message", // this is the default message, replace it for now
        };

        const chatBot = async (message) => {
            try {
                chatConfig.content = message;
                modelResponse = await ollama.chat({
                    model: chatConfig.model,
                    role: chatConfig.role,
                    content: chatConfig.content,
                });
                return modelResponse;
            } catch (err) {
                console.log(err);
            }
        };

        module.exports = {chatBot};
    })
    .catch((error) => {
        console.error("Failed to load ollama module", error);
    });
