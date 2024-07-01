/* Put `llm.js` file here instead of in middleware folder */

let ollama;

(async () => {
    ollama = (await import("ollama")).default;
})();

const chatBot = async (message) => {
    try {
        const response = await ollama.chat({
            model: "mistral",
            messages: [{role: "user", content: message}],
        });

        return response.message.content;
    } catch (err) {
        console.log(err);
        return {error: "Failed to get response from model"};
    }
};

module.exports = {chatBot};
