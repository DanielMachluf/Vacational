import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class LikesService {
    // Backend expects: POST /api/likes with body { vacationId }
    public async addLike(vacationId: number): Promise<void> {
        await axios.post(appConfig.likesUrl, { vacationId });
    }

    // Backend expects: DELETE /api/likes/:vacationId
    public async removeLike(vacationId: number): Promise<void> {
        await axios.delete(appConfig.likesUrl + "/" + vacationId);
    }
}

export const likesService = new LikesService();
