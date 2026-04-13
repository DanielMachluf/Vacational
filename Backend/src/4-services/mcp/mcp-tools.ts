import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { mcpHelper } from "../../2-utils/mcp-helper";
import { mcpAnalyticsService } from "./mcp-analytics-service";

class McpTools {
    public async getAverageVacationPriceTool(): Promise<CallToolResult> {
        console.log("starting getAverageVacationPriceTool");
        const result = await mcpAnalyticsService.getAverageVacationPrice();
        return mcpHelper.getToolResult(result);
    }

    public async getMostLikedVacationTool(): Promise<CallToolResult> {
        console.log("starting getMostLikedVacationTool");
        const result = await mcpAnalyticsService.getMostLikedVacation();
        return mcpHelper.getToolResult(result);
    }

    public async getActiveVacationsCountTool(): Promise<CallToolResult> {
        console.log("starting getActiveVacationsCountTool");
        const result = await mcpAnalyticsService.getActiveVacationsCount();
        return mcpHelper.getToolResult(result);
    }

    public async getFutureVacationsCountTool(): Promise<CallToolResult> {
        console.log("starting getFutureVacationsCountTool");
        const result = await mcpAnalyticsService.getFutureVacationsCount();
        return mcpHelper.getToolResult(result);
    }

    public async getTopLikedVacationsTool(args: { limit?: number }): Promise<CallToolResult> {
        console.log("starting getTopLikedVacationsTool, limit: " + (args.limit ?? 5));
        const result = await mcpAnalyticsService.getTopLikedVacations(args);
        return mcpHelper.getToolResult(result);
    }
}

export const mcpTools = new McpTools();