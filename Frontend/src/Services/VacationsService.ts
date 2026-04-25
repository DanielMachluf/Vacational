import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { vacationActions } from "../Redux/VacationSlice";

class VacationsService {

    // Backend accepts ?page=1&filter=all|liked|active|future
    public async getAllVacations(page: number = 1, filter: string = "all"): Promise<VacationModel[]> {
        // Only fetch if Redux state is empty or when forced by specific filters on component side
        const response = await axios.get<VacationModel[]>(
            `${appConfig.vacationsUrl}?page=${page}&filter=${filter}`
        );
        store.dispatch(vacationActions.initVacations(response.data));
        return response.data;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        // Try fetching from Redux first
        const vacationInStore = store.getState().vacations.find(v => v.vacationId === id);
        if (vacationInStore) return vacationInStore;

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

        const response = await axios.post<VacationModel>(appConfig.adminAddVacationUrl, formData);
        store.dispatch(vacationActions.addVacation(response.data));
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

        const response = await axios.put<VacationModel>(appConfig.adminUpdateVacationUrl + "/" + vacation.vacationId, formData);
        store.dispatch(vacationActions.updateVacation(response.data));
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.adminDeleteVacationUrl + "/" + id);
        store.dispatch(vacationActions.deleteVacation(id));
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
