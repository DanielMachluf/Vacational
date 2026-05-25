import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { appConfig } from "../../../Utils/AppConfig";
import { useState } from "react";
import { UserModel } from "../../../Models/UserModel";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Register.css";

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const navigate = useNavigate();
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    async function send(user: UserModel) {
        if (!captchaValue) {
            notify.error("Please complete the reCAPTCHA");
            return;
        }
        try {
            await authService.register(user);
            notify.success(`Welcome ${user.firstName}!`);
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(send)}>
                <h2>Register</h2>

                <label>First Name:</label>
                <input type="text" {...register("firstName", {
                    required: "First name is required",
                    minLength: { value: 2, message: "First name must be at least 2 characters" },
                    maxLength: { value: 30, message: "First name cannot exceed 30 characters" }
                })} />
                {errors.firstName && <span className="error-msg">{errors.firstName.message}</span>}

                <label>Last Name:</label>
                <input type="text" {...register("lastName", {
                    required: "Last name is required",
                    minLength: { value: 2, message: "Last name must be at least 2 characters" },
                    maxLength: { value: 30, message: "Last name cannot exceed 30 characters" }
                })} />
                {errors.lastName && <span className="error-msg">{errors.lastName.message}</span>}

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

                <button>Register</button>

                <p className="auth-footer">
                    Already have an account? <NavLink to="/login">Login here</NavLink>
                </p>
            </form>
        </div>
    );
}
