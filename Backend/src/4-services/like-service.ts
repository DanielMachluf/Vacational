import { dal } from "../2-utils/dal";

class LikeService {
    // add like
    public async addLike(userId: number, vacationId: number): Promise<void> {
        const sql = "INSERT INTO likes(userId, vacationId) VALUES(?, ?)";
        await dal.execute(sql, [userId, vacationId]); // Will fail if duplicate due to DB unique constraints
    }

    // remove like
    public async removeLike(userId: number, vacationId: number): Promise<void> {
        const sql = "DELETE FROM likes WHERE userId = ? AND vacationId = ?";
        await dal.execute(sql, [userId, vacationId]);
    }
}

export const likeService = new LikeService();
