import express, { NextFunction, Request, Response, Router } from "express";
import { cyber } from "../2-utils/cyber";
import { StatusCode } from "../3-models/enums";
import { vacationService } from "../4-services/vacation-service";
import { securityMiddleware } from "../6-middleware/security-middleware";

class VacationController {
    public readonly router: Router = express.Router();

    public constructor() {
        this.router.get("/api/vacations", securityMiddleware.verifyToken, this.getAll);
        this.router.get("/api/vacations/report/csv", securityMiddleware.verifyToken, this.getReportCsv);
        this.router.get("/api/vacations/images/:imageName", this.getImage);
        this.router.get("/api/vacations/:id", securityMiddleware.verifyToken, this.getOneVacation);
    }

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const token = cyber.extractToken(request);
            const userId = cyber.getTokenUserId(token);
            const page = request.query.page ? Number(request.query.page) : 1;
            const filter = typeof request.query.filter === "string" ? request.query.filter : "all";

            const vacations = await vacationService.getAll(userId, page, filter);
            response.status(StatusCode.OK).json(vacations);
        }
        catch (err: any) {
            next(err);
        }
    };

    private getReportCsv = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const csvData = await vacationService.getVacationsReportCsv();
            response.setHeader("Content-Type", "text/csv");
            response.setHeader("Content-Disposition", "attachment; filename=vacations-report.csv");
            response.status(StatusCode.OK).send(csvData);
        }
        catch (err: any) {
            next(err);
        }
    };

    private getImage = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const imageName = request.params.imageName.toString();
            const filePath = vacationService.getImagePath(imageName);
            response.sendFile(filePath);
        }
        catch (err: any) {
            next(err);
        }
    };

    private getOneVacation = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationId = Number(request.params.id);
            const vacation = await vacationService.getOneVacation(vacationId);
            response.status(StatusCode.OK).json(vacation);
        }
        catch (err: any) {
            next(err);
        }
    };
}

export const vacationController = new VacationController();
