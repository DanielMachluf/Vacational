import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { appConfig } from "../../../Utils/AppConfig";
import { useState } from "react";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    const navigate = useNavigate();
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    async function send(credentials: CredentialsModel) {
        if (!captchaValue) {
            notify.error("Please complete the reCAPTCHA");
            return;
        }
        try {
            await authService.login(credentials);
            notify.success(`Welcome back ${authService.user?.firstName}!`);
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>

                <label>Email:</label>
                <input type="email" {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                })} />
                {errors.email && <span className="error-msg">{errors.email.message}</span>}

                <label>Password:</label>
                <input type="password" {...register("password", {
                    required: "Password is required",
                    minLength: { value: 4, message: "Password must be at least 4 characters" },
                    maxLength: { value: 30, message: "Password cannot exceed 30 characters" }
                })} />
                {errors.password && <span className="error-msg">{errors.password.message}</span>}

                <ReCAPTCHA
                    sitekey={appConfig.recaptchaSiteKey}
                    onChange={(val) => setCaptchaValue(val)}
                    style={{ margin: "1rem auto" }}
                />

                <button>Login</button>

                <p className="auth-footer">
                    Don't have an account? <NavLink to="/register">Register here</NavLink>
                </p>
            </form>
        </div>
    );
}
