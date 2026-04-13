class AppConfig {
	public readonly baseUrl = "http://localhost:4000";

	public readonly registerUrl = `${this.baseUrl}/api/register`;
	public readonly loginUrl = `${this.baseUrl}/api/login`;

	public readonly vacationsUrl = `${this.baseUrl}/api/vacations`;
	public readonly vacationsReportUrl = `${this.baseUrl}/api/vacations/report`;
	public readonly vacationsReportCsvUrl = `${this.baseUrl}/api/vacations/report/csv`;
	public readonly vacationImagesUrl = `${this.baseUrl}/api/vacations/images/`;

    public readonly likesUrl = `${this.baseUrl}/api/likes`;

    public readonly recaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Google reCAPTCHA v2 testing key

	public readonly aiUrl = `${this.baseUrl}/api/ai`;
	public readonly aiMcpUrl = `${this.baseUrl}/api/ai/mcp`;

    // Admin URLs
    public readonly adminAddVacationUrl = `${this.baseUrl}/api/admin/add`;
    public readonly adminUpdateVacationUrl = `${this.baseUrl}/api/admin/update`;
    public readonly adminDeleteVacationUrl = `${this.baseUrl}/api/admin/delete`;
    public readonly adminVacationReportUrl = `${this.baseUrl}/api/admin/report`;
}

export const appConfig = new AppConfig(); 
