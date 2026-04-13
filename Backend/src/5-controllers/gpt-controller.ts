import express, { NextFunction, Request, Response, Router } from "express";
import { StatusCode } from "../3-models/enums";
import { gptService } from "../4-services/gpt-service";
import { securityMiddleware } from "../6-middleware/security-middleware";

class GptController {
    public readonly router: Router = express.Router();

    public constructor() {
        this.router.post("/api/ai", securityMiddleware.verifyToken, securityMiddleware.preventXss, this.askAI);
        this.router.post("/api/ai/mcp", securityMiddleware.verifyToken, securityMiddleware.preventXss, this.askMcp);
    }

    private askAI = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const prompt = request.body.prompt;

            if (!prompt || typeof prompt !== "string") {
                response.status(StatusCode.BadRequest).json({ message: "Prompt is required." });
                return;
            }

            // You can optionally wrap the prompt here or just pass it directly.
            const answer = await gptService.getCompletion(prompt);

            response.status(StatusCode.OK).send(answer);
        }
        catch (err: any) {
            console.error("AI Error:", err.message);
            // Hide detailed OpenAI/MCP errors from the client
            response.status(StatusCode.InternalServerError).json({ message: "The AI service is currently unavailable. Please try again later." });
        }
    };

    private askMcp = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const input = typeof request.body.input === "string"
                ? request.body.input
                : typeof request.body.prompt === "string"
                    ? request.body.prompt
                    : "What is the average vacation price?";

            const answer = await gptService.getMcpResult(input);
            response.status(StatusCode.OK).send(answer);
        }
        catch (err: any) {
            console.error("MCP Error:", err.message);
            // Hide detailed OpenAI/MCP errors from the client
            response.status(StatusCode.InternalServerError).json({ message: "The MCP assistant is currently unavailable. Please try again later." });
        }
    };
}

export const gptController = new GptController();
