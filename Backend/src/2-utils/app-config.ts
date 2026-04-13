import dotenv from "dotenv";

dotenv.config({ quiet: true });

function normalizeEnv(value?: string): string | undefined {
    return value
        ?.trim()
        .replace(/^['"]+/, "")
        .replace(/['";]+$/, "")
        .trim();
}

class AppConfig {
    public readonly isDevelopment = normalizeEnv(process.env.ENVIRONMENT) === "development";
    public readonly isProduction = normalizeEnv(process.env.ENVIRONMENT) === "production";
    public readonly port = Number(normalizeEnv(process.env.PORT));
    public readonly imagesBaseUrl = normalizeEnv(process.env.IMAGES_BASE_URL) || `http://localhost:${normalizeEnv(process.env.PORT)}/api/vacations/images`;
    public readonly mysqlHost = normalizeEnv(process.env.MYSQL_HOST);
    public readonly mysqlUser = normalizeEnv(process.env.MYSQL_USER);
    public readonly mysqlPassword = normalizeEnv(process.env.MYSQL_PASSWORD);
    public readonly mysqlDatabase = normalizeEnv(process.env.MYSQL_DATABASE);
    public readonly hashSalt = normalizeEnv(process.env.HASH_SALT);
    public readonly jwtSecret = normalizeEnv(process.env.JWT_SECRET);
    public readonly chatGptApiKey = normalizeEnv(process.env.CHAT_GPT_API_KEY);
    public readonly mcpServerUrl = normalizeEnv(process.env.MCP_SERVER_URL);
}

export const appConfig = new AppConfig();
