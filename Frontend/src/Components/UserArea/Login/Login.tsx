import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";

export function Login() {
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
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
                <input type="email" {...register("email", { required: true })} />

                <label>Password:</label>
                <input type="password" {...register("password", { required: true, minLength: 2, maxLength: 30 })} />

                <button>Login</button>

                <p className="auth-footer">
                    Don't have an account? <NavLink to="/register">Register here</NavLink>
                </p>
            </form>
        </div>
    );
}
