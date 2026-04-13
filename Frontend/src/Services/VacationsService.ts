import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";

class VacationsService {

    // Backend accepts ?page=1&filter=all|liked|active|future
    public async getAllVacations(page: number = 1, filter: string = "all"): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(
            `${appConfig.vacationsUrl}?page=${page}&filter=${filter}`
        );
        return response.data;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + "/" + id);
        return response.data;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination || "");
        formData.append("description", vacation.description || "");
        formData.append("startDate", vacation.startDate || "");
        formData.append("endDate", vacation.endDate || "");
        formData.append("price", vacation.price?.toString() || "0");
        if (vacation.image) formData.append("image", vacation.image);

        await axios.post<VacationModel>(appConfig.adminAddVacationUrl, formData);
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("vacationId", vacation.vacationId?.toString() || "0");
        formData.append("destination", vacation.destination || "");
        formData.append("description", vacation.description || "");
        formData.append("startDate", vacation.startDate || "");
        formData.append("endDate", vacation.endDate || "");
        formData.append("price", vacation.price?.toString() || "0");
        if (vacation.image) formData.append("image", vacation.image);

        await axios.put<VacationModel>(appConfig.adminUpdateVacationUrl + "/" + vacation.vacationId, formData);
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.adminDeleteVacationUrl + "/" + id);
    }

    // Admin report: { destination, likesCount }[]
    public async getVacationReport(): Promise<{ destination: string; likesCount: number }[]> {
        const response = await axios.get<{ destination: string; likesCount: number }[]>(appConfig.adminVacationReportUrl);
        return response.data;
    }

    public async getVacationReportCsv(): Promise<string> {
        const response = await axios.get<string>(appConfig.vacationsReportCsvUrl);
        return response.data;
    }
}

export const vacationsService = new VacationsService();
