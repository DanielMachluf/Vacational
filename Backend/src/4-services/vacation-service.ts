import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacation-model";
import { adminService } from "./admin-service";

class VacationService {
    // You can adjust the returned type or define a DTO model to match this exact shape
    public async getAll(userId: number, page: number, filter: string): Promise<any[]> {
        const limit = 9;
        const offset = (page - 1) * limit;

        let sql = `
            SELECT DISTINCT 
                v.*,
                (SELECT COUNT(*) FROM likes WHERE vacationId = v.vacationId) AS likesCount,
                EXISTS(SELECT * FROM likes WHERE vacationId = v.vacationId AND userId = ?) AS isLiked
            FROM vacations v
        `;
        
        const values: any[] = [userId];

        // 1. Match Filters
        if (filter === "future") {
            sql += `
                WHERE v.startDate > CURRENT_DATE()
            `;
        } else if (filter === "active") {
            sql += `
                WHERE v.startDate <= CURRENT_DATE() 
                  AND v.endDate >= CURRENT_DATE()
            `;
        } else if (filter === "liked") {
            // Match only the vacations liked by the user
            sql += `
                JOIN likes l ON v.vacationId = l.vacationId 
                WHERE l.userId = ?
            `;
            values.push(userId);
        }

        // 2. Order and Pagination
        sql += `
            ORDER BY v.startDate ASC 
            LIMIT ? OFFSET ?
        `;
        
        values.push(limit, offset);

        const vacations = await dal.execute(sql, values) as VacationModel[];
        return vacations.map(vacation => ({
            ...vacation,
            imageUrl: vacation.imageName ? `${appConfig.imagesBaseUrl}/${vacation.imageName}` : null
        }));
    }

    public async getOneVacation(vacationId: number): Promise<any> {
        const sql = `
            SELECT 
                v.*,
                (SELECT COUNT(*) FROM likes WHERE vacationId = v.vacationId) AS likesCount
            FROM vacations v
            WHERE v.vacationId = ?
        `;
        const vacations = await dal.execute(sql, [vacationId]) as VacationModel[];
        const vacation = vacations[0];
        if (!vacation) throw new ResourceNotFoundError(vacationId);
        return {
            ...vacation,
            imageUrl: vacation.imageName ? `${appConfig.imagesBaseUrl}/${vacation.imageName}` : null
        };
    }

    public async getVacationsReportCsv(): Promise<string> {
        const reportData = await adminService.getVacationReport();

        let csv = "Destination,Likes\n";

        for (const vacation of reportData) {
            // Escape possible commas in destination strings by wrapping in quotes
            const destination = `"${vacation.destination.replace(/"/g, '""')}"`;
            csv += `${destination},${vacation.likesCount}\n`;
        }

        return csv;
    }

    public getImagePath(imageName: string): string {
        return fileSaver.getFilePath(imageName);
    }
}

export const vacationService = new VacationService();
