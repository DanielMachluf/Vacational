import { OkPacketParams } from "mysql2";
import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { appConfig } from "../2-utils/app-config";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacation-model";

class AdminService {
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validate();

        const imageName = vacation.image ? await fileSaver.add(vacation.image) : vacation.imageName || null;

        const sql = `
            INSERT INTO vacations(destination, description, startDate, endDate, price, imageName)
            VALUES(?, ?, ?, ?, ?, ?)
        `;
        const values = [
            vacation.destination,
            vacation.description,
            vacation.startDate ? new Date(vacation.startDate).toISOString().slice(0, 19).replace('T', ' ') : null,
            vacation.endDate ? new Date(vacation.endDate).toISOString().slice(0, 19).replace('T', ' ') : null,
            vacation.price,
            imageName
        ];

        const result = await dal.execute(sql, values) as OkPacketParams;
        vacation.vacationId = result.insertId;
        vacation.imageName = imageName || undefined;
        vacation.imageUrl = imageName ? `${appConfig.imagesBaseUrl}/${imageName}` : undefined;

        return vacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validate();

        const oldImageName = await this.getImageName(vacation.vacationId!);
        const imageName = vacation.image
            ? await fileSaver.update(oldImageName || "", vacation.image)
            : vacation.imageName || oldImageName || null;

        const sql = `
            UPDATE vacations SET
            destination = ?,
            description = ?,
            startDate = ?,
            endDate = ?,
            price = ?,
            imageName = ?
            WHERE vacationId = ?
        `;
        const values = [
            vacation.destination,
            vacation.description,
            vacation.startDate ? new Date(vacation.startDate).toISOString().slice(0, 19).replace('T', ' ') : null,
            vacation.endDate ? new Date(vacation.endDate).toISOString().slice(0, 19).replace('T', ' ') : null,
            vacation.price,
            imageName,
            vacation.vacationId !
        ];

        const result = await dal.execute(sql, values) as OkPacketParams;
        if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId as any);

        vacation.imageName = imageName || undefined;
        vacation.imageUrl = imageName ? `${appConfig.imagesBaseUrl}/${imageName}` : undefined;

        return vacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        const oldImageName = await this.getImageName(vacationId);

        // First delete associated likes to respect foreign-key constraints
        const deleteLikesSql = "DELETE FROM likes WHERE vacationId = ?";
        await dal.execute(deleteLikesSql, [vacationId]);

        const deleteVacationSql = "DELETE FROM vacations WHERE vacationId = ?";
        const result = await dal.execute(deleteVacationSql, [vacationId]) as OkPacketParams;
        if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

        if (oldImageName) await fileSaver.delete(oldImageName);
    }

    public async getVacationReport(): Promise<any[]> {
        const sql = `
            SELECT v.destination, COUNT(l.userId) AS likesCount
            FROM vacations v
            LEFT JOIN likes l ON v.vacationId = l.vacationId
            GROUP BY v.vacationId
        `;
        const result = await dal.execute(sql);
        return result as any[];
    }

    private async getImageName(vacationId: number): Promise<string | null> {
        const sql = "SELECT imageName FROM vacations WHERE vacationId = ?";
        const vacations = await dal.execute(sql, [vacationId]) as VacationModel[];
        const vacation = vacations[0];
        if (!vacation) return null;
        return vacation.imageName || null;
    }
}

export const adminService = new AdminService();
