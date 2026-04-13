import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { gptService } from "../../../Services/GptService";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./AskAI.css";

export function AskAI() {
    const [prompt, setPrompt] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authService.user) {
            notify.error("Please login to use AI features.");
            navigate("/login");
        }
    }, [navigate]);

    async function sendChat() {
        if (!prompt.trim()) return;
        
        try {
            setIsLoading(true);
            setAnswer("");
            const response = await gptService.getChatResult(prompt);
            setAnswer(response);
        } catch (err: any) {
            notify.error(err);
        } finally {
            setIsLoading(false);
            setPrompt("");
        }
    }

    return (
        <div className="AskAI">
            <h2>🏖️ Ask Vacation AI</h2>
            <div className="ai-chat-container">
                <div className="ai-input-area">
                    <input 
                        type="text" 
                        placeholder="E.g., where are the best sunny destinations?" 
                        value={prompt} 
                        onChange={e => setPrompt(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && sendChat()}
                    />
                    <button onClick={sendChat} disabled={isLoading}>Ask</button>
                </div>

                {isLoading && <Spinner />}

                {answer && (
                    <div className="ai-response">
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
