import { useState } from "react";
import { NavLink } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { Role } from "../../../Models/Role";
import { authService } from "../../../Services/AuthService";
import { likesService } from "../../../Services/LikesService";
import { appConfig } from "../../../Utils/AppConfig";
import { notify } from "../../../Utils/Notify";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    onLikeToggle?: () => void;
}

export function VacationCard(props: VacationCardProps) {
    const { vacation, onLikeToggle } = props;
    const isAdmin = authService.user?.role === Role.Admin;

    const [liked, setLiked] = useState<boolean>(!!vacation.isLiked);
    const [likesCount, setLikesCount] = useState<number>(vacation.likesCount || 0);

    // Formatting dates for display
    const startDate = new Date(vacation.startDate || "").toLocaleDateString("en-GB");
    const endDate = new Date(vacation.endDate || "").toLocaleDateString("en-GB");

    // Resolving image source properly (backend image vs strict URL)
    const imageUrl = vacation.imageUrl || (vacation.imageName ? `${appConfig.vacationImagesUrl}${vacation.imageName}` : "");

    async function toggleLike() {
        try {
            if (liked) {
                await likesService.removeLike(vacation.vacationId!);
                setLiked(false);
                setLikesCount(prev => prev - 1);
            } else {
                await likesService.addLike(vacation.vacationId!);
                setLiked(true);
                setLikesCount(prev => prev + 1);
            }
            onLikeToggle?.();
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="VacationCard">
            <div className="card-image-container">
                <img src={imageUrl} alt={vacation.destination} />
                <span className="card-price">${vacation.price}</span>
            </div>

            <div className="card-content">
                <h3 className="card-destination">{vacation.destination}</h3>
                <span className="card-dates">🗓 {startDate} - {endDate}</span>
                <p className="card-description">{vacation.description}</p>

                {/* Like section */}
                {!isAdmin && (
                    <div className="like-section">
                        <button className={`like-btn ${liked ? "liked" : ""}`} onClick={toggleLike}>
                            {liked ? "❤️" : "🤍"} {likesCount}
                        </button>
                    </div>
                )}

                {isAdmin && (
                    <div className="admin-actions">
                        <NavLink to={`/admin/update/${vacation.vacationId}`} className="btn-edit">✏️ Edit</NavLink>
                        <NavLink to={`/admin/delete/${vacation.vacationId}`} className="btn-remove">🗑️ Delete</NavLink>
                    </div>
                )}
            </div>
        </div>
    );
}
