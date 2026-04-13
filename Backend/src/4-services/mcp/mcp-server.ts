import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpRegister } from "./mcp-register";

class VacationMcpServer {
	public createMcpServer(): McpServer {
		const mcpServer = new McpServer({
			name: "vacation-mcp",
			version: "1.0.0"
		});

		mcpRegister.registerGetAverageVacationPriceTool(mcpServer);
		mcpRegister.registerGetMostLikedVacationTool(mcpServer);
		mcpRegister.registerGetActiveVacationsCountTool(mcpServer);
		mcpRegister.registerGetFutureVacationsCountTool(mcpServer);
		mcpRegister.registerGetTopLikedVacationsTool(mcpServer);

		return mcpServer;
	}
}

export const vacationMcpServer = new VacationMcpServer();
