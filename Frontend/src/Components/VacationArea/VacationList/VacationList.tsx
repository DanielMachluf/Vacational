import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { authService } from "../../../Services/AuthService";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { VacationCard } from "../VacationCard/VacationCard";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./VacationList.css";

export function VacationList() {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authService.user) {
            notify.error("You must be logged in to view vacations.");
            navigate("/login");
            return;
        }

        setLoading(true);
        vacationsService.getAllVacations(page, filter)
            .then(data => {
                setVacations(data);
                setLoading(false);
            })
            .catch(err => {
                notify.error(err);
                setLoading(false);
            });
    }, [page, filter, navigate]);

    // Called from VacationCard after a like toggle
    function refreshList() {
        vacationsService.getAllVacations(page, filter)
            .then(data => setVacations(data))
            .catch(err => notify.error(err));
    }

    return (
        <div className="VacationListPage">
            {/* Filter buttons */}
            <div className="filter-bar">
                <button className={filter === "all" ? "active" : ""} onClick={() => { setFilter("all"); setPage(1); }}>🌍 All</button>
                <button className={filter === "liked" ? "active" : ""} onClick={() => { setFilter("liked"); setPage(1); }}>❤️ Liked</button>
                <button className={filter === "active" ? "active" : ""} onClick={() => { setFilter("active"); setPage(1); }}>🟢 Active</button>
                <button className={filter === "future" ? "active" : ""} onClick={() => { setFilter("future"); setPage(1); }}>🔜 Not Started</button>
            </div>

            {/* Vacation cards grid */}
            <div className="VacationList">
                {loading && <Spinner />}
                {!loading && vacations.length === 0 && <p className="no-results">No vacations found.</p>}
                {vacations.map(v => (
                    <VacationCard key={v.vacationId} vacation={v} onLikeToggle={refreshList} />
                ))}
            </div>

            {/* Pagination */}
            {!loading && vacations.length > 0 && (
                <div className="pagination">
                    <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>◀ Prev</button>
                    <span className="page-number">Page {page}</span>
                    <button disabled={vacations.length < 9} onClick={() => setPage(p => p + 1)}>Next ▶</button>
                </div>
            )}
        </div>
    );
}
