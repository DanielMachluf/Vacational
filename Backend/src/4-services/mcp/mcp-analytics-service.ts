import { dal } from "../../2-utils/dal";

class McpAnalyticsService {
    public async getAverageVacationPrice(): Promise<{ averagePrice: number }> {
        const sql = "SELECT AVG(price) AS averagePrice FROM vacations";
        const rows = await dal.execute(sql) as { averagePrice: number | null }[];
        return { averagePrice: Number(rows[0]?.averagePrice || 0) };
    }

    public async getMostLikedVacation(): Promise<{ vacationId: number; destination: string; likesCount: number } | null> {
        const sql = `
            SELECT v.vacationId, v.destination, COUNT(l.userId) AS likesCount
            FROM vacations v
            LEFT JOIN likes l ON v.vacationId = l.vacationId
            GROUP BY v.vacationId, v.destination
            ORDER BY likesCount DESC, v.destination ASC
            LIMIT 1
        `;

        const rows = await dal.execute(sql) as { vacationId: number; destination: string; likesCount: number }[];
        return rows[0] || null;
    }

    public async getActiveVacationsCount(): Promise<{ activeVacationsCount: number }> {
        const sql = `
            SELECT COUNT(*) AS activeVacationsCount
            FROM vacations
            WHERE startDate <= CURRENT_DATE() AND endDate >= CURRENT_DATE()
        `;
        const rows = await dal.execute(sql) as { activeVacationsCount: number }[];
        return { activeVacationsCount: Number(rows[0]?.activeVacationsCount || 0) };
    }

    public async getFutureVacationsCount(): Promise<{ futureVacationsCount: number }> {
        const sql = "SELECT COUNT(*) AS futureVacationsCount FROM vacations WHERE startDate > CURRENT_DATE()";
        const rows = await dal.execute(sql) as { futureVacationsCount: number }[];
        return { futureVacationsCount: Number(rows[0]?.futureVacationsCount || 0) };
    }

    public async getTopLikedVacations(args: { limit?: number }): Promise<Array<{ vacationId: number; destination: string; likesCount: number }>> {
        const limit = args.limit && args.limit > 0 ? Math.min(args.limit, 20) : 5;
        const sql = `
            SELECT v.vacationId, v.destination, COUNT(l.userId) AS likesCount
            FROM vacations v
            LEFT JOIN likes l ON v.vacationId = l.vacationId
            GROUP BY v.vacationId, v.destination
            ORDER BY likesCount DESC, v.destination ASC
            LIMIT ?
        `;

        return await dal.execute(sql, [limit]) as Array<{ vacationId: number; destination: string; likesCount: number }>;
    }
}

export const mcpAnalyticsService = new McpAnalyticsService();