import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { Role } from "../../../Models/Role";
import "./Menu.css";

export function Menu() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsAdmin(authService.user?.role === Role.Admin);
    }, [location]);

    return (
        <nav className="Menu">
            <NavLink to="/vacations">🏖️ Vacations</NavLink>
            <NavLink to="/ask-ai">🤖 Ask AI</NavLink>
            <NavLink to="/ask-mcp">📊 Ask MCP</NavLink>

            {isAdmin && (
                <div className="admin-dropdown">
                    <button className="admin-btn" onClick={() => setAdminOpen(!adminOpen)}>
                        ⚙️ Admin {adminOpen ? "▲" : "▼"}
                    </button>
                    {adminOpen && (
                        <div className="dropdown-content">
                            <NavLink to="/admin/add" onClick={() => setAdminOpen(false)}>➕ Add Vacation</NavLink>
                            <NavLink to="/admin/report" onClick={() => setAdminOpen(false)}>📊 Vacation Report</NavLink>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
