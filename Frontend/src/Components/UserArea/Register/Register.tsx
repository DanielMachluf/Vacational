import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Register.css";

export function Register() {
    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
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
                <input type="text" {...register("firstName", { required: true, minLength: 2, maxLength: 30 })} />

                <label>Last Name:</label>
                <input type="text" {...register("lastName", { required: true, minLength: 2, maxLength: 30 })} />

                <label>Email:</label>
                <input type="email" {...register("email", { required: true })} />

                <label>Password:</label>
                <input type="password" {...register("password", { required: true, minLength: 2, maxLength: 30 })} />

                <button>Register</button>

                <p className="auth-footer">
                    Already have an account? <NavLink to="/login">Login here</NavLink>
                </p>
            </form>
        </div>
    );
}
