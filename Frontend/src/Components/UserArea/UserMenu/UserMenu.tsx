import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { UserModel } from "../../../Models/UserModel";
import { notify } from "../../../Utils/Notify";
import "./UserMenu.css";

export function UserMenu() {
    const [user, setUser] = useState<UserModel | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Update user state whenever the route changes
        setUser(authService.user);
    }, [location]);

    function logout() {
        authService.logout();
        notify.success("Logged out successfully");
        navigate("/login");
    }

    return (
        <div className="UserMenu">
            {user && (
                <div className="logged-in">
                    <span>Hello {user.firstName} {user.lastName}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            )}

            {!user && (
                <div className="logged-out">
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </div>
            )}
        </div>
    );
}
