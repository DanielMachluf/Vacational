import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import { mcpTools } from "./mcp-tools";

class McpRegister {
	public registerGetAverageVacationPriceTool(mcpServer: McpServer): void {
		const config = {
			description: "Get the average price of all vacations in the database."
		};

		mcpServer.registerTool("getAverageVacationPrice", config, async () => await mcpTools.getAverageVacationPriceTool());
	}

	public registerGetMostLikedVacationTool(mcpServer: McpServer): void {
		const config = {
			description: "Get the most liked vacation from the database."
		};

		mcpServer.registerTool("getMostLikedVacation", config, async () => await mcpTools.getMostLikedVacationTool());
	}

	public registerGetActiveVacationsCountTool(mcpServer: McpServer): void {
		const config = {
			description: "Get the number of active vacations in the database."
		};

		mcpServer.registerTool("getActiveVacationsCount", config, async () => await mcpTools.getActiveVacationsCountTool());
	}

	public registerGetFutureVacationsCountTool(mcpServer: McpServer): void {
		const config = {
			description: "Get the number of future vacations in the database."
		};

		mcpServer.registerTool("getFutureVacationsCount", config, async () => await mcpTools.getFutureVacationsCountTool());
	}

	public registerGetTopLikedVacationsTool(mcpServer: McpServer): void {
		const config = {
			description: "Get the top liked vacations from the database.",
			inputSchema: z.object({
				limit: z.number().int().positive().max(20).optional()
			})
		};

		mcpServer.registerTool("getTopLikedVacations", config, async (args) => await mcpTools.getTopLikedVacationsTool(args));
	}
}

export const mcpRegister = new McpRegister();
