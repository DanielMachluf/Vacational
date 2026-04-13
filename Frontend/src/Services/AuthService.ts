import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { CredentialsModel } from "../Models/CredentialsModel";
import { appConfig } from "../Utils/AppConfig";

class AuthService {
    public constructor() {
        const token = localStorage.getItem("token");
        if (token) {
            this.user = jwtDecode<{ user: UserModel }>(token).user;
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
    }

    public user: UserModel | null = null;

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        localStorage.setItem("token", token);
        this.user = jwtDecode<{ user: UserModel }>(token).user;
        // Set default authorization header for future requests
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        localStorage.setItem("token", token);
        this.user = jwtDecode<{ user: UserModel }>(token).user;
        // Set default authorization header for future requests
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    public logout(): void {
        localStorage.removeItem("token");
        this.user = null;
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const authService = new AuthService();
