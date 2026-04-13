import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { authService } from "../../../Services/AuthService";
import { Role } from "../../../Models/Role";
import { notify } from "../../../Utils/Notify";
import { useEffect, useState } from "react";
import "./AddVacation.css";

export function AddVacation() {
    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
        if (!authService.user || authService.user.role !== Role.Admin) {
            notify.error("Only admins can access this page.");
            navigate("/vacations");
        }
    }, [navigate]);

    const { onChange: onImageChange, ...imageRegisterRest } = register("image");

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
        onImageChange(e);
    }

    async function send(vacation: VacationModel) {
        try {
            if (new Date(vacation.startDate!) < new Date(new Date().setHours(0,0,0,0))) {
                notify.error("Start date cannot be in the past!");
                return;
            }
            if (new Date(vacation.endDate!) < new Date(vacation.startDate!)) {
                notify.error("End date must be after or equal to start date!");
                return;
            }

            // Extract the File from the FileList
            const files = vacation.image as unknown as FileList;
            vacation.image = files?.[0];

            await vacationsService.addVacation(vacation);
            notify.success("Vacation added successfully!");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)}>
                <h2>➕ Add Vacation</h2>

                <label>Destination:</label>
                <input type="text" {...register("destination", { required: true, minLength: 2, maxLength: 50 })} />

                <label>Description:</label>
                <textarea {...register("description", { required: true, minLength: 2, maxLength: 500 })} rows={4} />

                <label>Start Date:</label>
                <input type="date" {...register("startDate", { required: true })} />

                <label>End Date:</label>
                <input type="date" {...register("endDate", { required: true })} />

                <label>Price ($):</label>
                <input type="number" step="0.01" {...register("price", { required: true, min: 0, max: 10000 })} />

                <label>Cover Image:</label>
                <label className="image-upload-box">
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} {...imageRegisterRest} />
                    {previewUrl ? (
                        <div className="image-preview">
                            <img src={previewUrl} alt="Preview" />
                            <div className="image-overlay">Change Image</div>
                        </div>
                    ) : (
                        <div className="image-placeholder">
                            <span>Select Image</span>
                        </div>
                    )}
                </label>

                <button>Add Vacation</button>
            </form>
        </div>
    );
}
