import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import { authService } from "../../../Services/AuthService";
import { Role } from "../../../Models/Role";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./DeleteVacation.css";

export function DeleteVacation() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authService.user || authService.user.role !== Role.Admin) {
            notify.error("Only admins can access this page.");
            navigate("/vacations");
            return;
        }

        if (!id) {
            notify.error("No vacation ID provided.");
            navigate("/vacations");
            return;
        }

        vacationsService.getOneVacation(+id)
            .then(v => {
                setDestination(v.destination || "this vacation");
                setLoading(false);
            })
            .catch(err => {
                notify.error(err);
                navigate("/vacations");
            });
    }, [id, navigate]);

    async function confirmDelete() {
        try {
            await vacationsService.deleteVacation(+id!);
            notify.success("Vacation deleted successfully!");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    if (loading) return <Spinner />;

    return (
        <div className="DeleteVacation">
            <div className="delete-card">
                <h2>🗑️ Delete Vacation</h2>
                <p>Are you sure you want to delete <strong>{destination}</strong>?</p>
                <div className="delete-actions">
                    <button className="btn-delete" onClick={confirmDelete}>Yes, Delete</button>
                    <button className="btn-cancel" onClick={() => navigate("/vacations")}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
