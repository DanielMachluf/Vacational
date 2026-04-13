import helmet from "helmet";
import cors from "cors";
import express, { Request } from "express";
import rateLimit from "express-rate-limit";
import { sseHandlers } from "express-mcp-handler";
import { appConfig } from "./2-utils/app-config";
import { vacationMcpServer } from "./4-services/mcp/mcp-server";
import { adminController } from "./5-controllers/admin-controller";
import { gptController } from "./5-controllers/gpt-controller";
import { likeController } from "./5-controllers/like-controller";
import { userController } from "./5-controllers/user-controller";
import { vacationController } from "./5-controllers/vacation-controller";
import { errorsMiddleware } from "./6-middleware/errors-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";
import expressFileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";


class App {
    server: any;

    public start(): void {
        try {
            const server = express();
            
            // Prevent DoS attack:
            server.use(rateLimit({
                windowMs: 1000, // Time window
                limit: 20, // How many requests are permitted in this time window
                skip: (request: Request) => request.path.startsWith("/api/vacations/images/") // When to skip the rate-limit
            }));

            server.use(helmet({
                crossOriginResourcePolicy: false // Allow loading images from different origins if needed
            }));
            
            server.use(cors());
            server.use(express.json());
            
            // Prevent XSS attack (must be before controllers, after body-parsers like express.json):
            server.use(securityMiddleware.preventXss);

            server.use(expressFileUpload());

            const imageLocation = path.join(__dirname, "1-assets", "images");
            fileSaver.config(imageLocation); // Tell this library where to save uploaded images.

            
            server.use(userController.router);
            server.use(adminController.router);
            server.use(vacationController.router);
            server.use(likeController.router);
            server.use(gptController.router);

            // MCP Server setup
            const mcpServer = vacationMcpServer.createMcpServer();
            const factory = () => mcpServer as any;
            const { getHandler, postHandler } = sseHandlers(factory, {});
            server.get("/sse", getHandler);
            server.post("/messages", postHandler);

            server.use(errorsMiddleware.routeNotFound);
            server.use(errorsMiddleware.catchAll);

            server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
        }
        catch (err: any) {
            console.error(err);
        }
    }
}

const app = new App();
app.start();
