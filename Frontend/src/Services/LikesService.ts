import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { vacationActions } from "../Redux/VacationSlice";

class LikesService {
    // Backend expects: POST /api/likes with body { vacationId }
    public async addLike(vacationId: number): Promise<void> {
        await axios.post(appConfig.likesUrl, { vacationId });
        store.dispatch(vacationActions.toggleLike(vacationId));
    }

    // Backend expects: DELETE /api/likes/:vacationId
    public async removeLike(vacationId: number): Promise<void> {
        await axios.delete(appConfig.likesUrl + "/" + vacationId);
        store.dispatch(vacationActions.toggleLike(vacationId));
    }
}

export const likesService = new LikesService();
