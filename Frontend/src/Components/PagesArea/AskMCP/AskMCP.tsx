import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { gptService } from "../../../Services/GptService";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./AskMCP.css";

export function AskMCP() {
    const [prompt, setPrompt] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authService.user) {
            notify.error("Please login to use analytics features.");
            navigate("/login");
        }
    }, [navigate]);

    async function sendMcp() {
        if (!prompt.trim()) return;
        
        try {
            setIsLoading(true);
            setAnswer("");
            const response = await gptService.getMcpResult(prompt);
            setAnswer(response);
        } catch (err: any) {
            notify.error("Analytics service is temporarily unavailable. Please try again later.");
        } finally {
            setIsLoading(false);
            setPrompt("");
        }
    }

    return (
        <div className="AskMCP">
            <h2>🤖 Ask MCP (Database Analytics)</h2>
            <div className="mcp-chat-container">
                <div className="mcp-input-area">
                    <input 
                        type="text" 
                        placeholder="E.g., what is the average price of all vacations?" 
                        value={prompt} 
                        onChange={e => setPrompt(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && sendMcp()}
                    />
                    <button onClick={sendMcp} disabled={isLoading}>Analyze</button>
                </div>

                {isLoading && <Spinner />}

                {answer && (
                    <div className="mcp-response">
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
