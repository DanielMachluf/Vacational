import OpenAI from "openai";
import { appConfig } from "../2-utils/app-config";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";

class GptService {
    private openai = new OpenAI({
        apiKey: appConfig.chatGptApiKey
    });

   // Get GPT completion: 
    public async getCompletion(prompt: string): Promise<string> {

        // Data to send: 
        const body: ChatCompletionCreateParamsNonStreaming = {
            model: "gpt-4o-mini", // Better model
            messages: [
                {
                    role: "system",
                    content: "You are a helpful travel assistant. Your job is to read the user's message, identify if they provided a vacation destination, and write a short, fun summary about that destination packed with nice emojis. If the user does not clearly provide a destination, politely and playfully tell them you need a destination to work your magic, and ask them where they want to go!"
                },
                { role: "user", content: prompt }
            ]
        };

        // Send request: 
        const response = await this.openai.chat.completions.create(body)

        // Return completion: 
        const completion = response.choices[0].message.content!;
        return completion;
    }

    public async getMcpResult(input: string): Promise<string> {
      
        const body: OpenAI.Responses.ResponseCreateParams = {
            model: "gpt-4.1-mini",
            tools: [{
                type: "mcp",
                server_label: "VacationMCP",
                server_description: "Vacation project MCP server exposing vacation analytics data.",
                server_url: appConfig.mcpServerUrl,
                require_approval: "never"
            }],
            input
        };

        const response = await this.openai.responses.create(body);
        return response.output_text || "No response from AI";
    }
}

export const gptService = new GptService();
