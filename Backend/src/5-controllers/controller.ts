import express, { Request, Response, Router } from "express";

class Controller {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/____", this.get____);
    }

    private async get____(request: Request, response: Response) {

    }

}

export const controller = new Controller();
