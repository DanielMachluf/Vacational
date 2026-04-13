import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class GptService {

    public async getChatResult(prompt: string): Promise<string> {
        const response = await axios.post<string>(appConfig.aiUrl, { prompt });
        return response.data;
    }

    public async getMcpResult(prompt: string): Promise<string> {
        const response = await axios.post<string>(appConfig.aiMcpUrl, { prompt });
        return response.data;
    }

}

export const gptService = new GptService();
