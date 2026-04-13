import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { authService } from "../../../Services/AuthService";
import { Role } from "../../../Models/Role";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./UpdateVacation.css";

export function UpdateVacation() {
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [previewUrl, setPreviewUrl] = useState<string>("");

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
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate?.toString().slice(0, 10));
                setValue("endDate", vacation.endDate?.toString().slice(0, 10));
                setValue("price", vacation.price);
                if (vacation.imageUrl) {
                    setPreviewUrl(vacation.imageUrl);
                }
                setLoading(false);
            })
            .catch(err => {
                notify.error(err);
                navigate("/vacations");
            });
    }, [id, navigate, setValue]);

    const { onChange: onImageChange, ...imageRegisterRest } = register("image");

    /**
     * Handles local image selection by the user.
     * Creates a temporary preview URL for the UI and properly registers
     * the change with react-hook-form.
     */
    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.target.files?.[0];
        
        if (selectedFile) {
            // Generate a local object URL to display the image preview
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
        }
        
        // Trigger the original onChange handler from react-hook-form
        onImageChange(event);
    }

    async function send(vacation: VacationModel) {
        try {
            if (new Date(vacation.endDate!) < new Date(vacation.startDate!)) {
                notify.error("End date must be after or equal to start date!");
                return;
            }

            const files = vacation.image as unknown as FileList;
            vacation.image = files?.[0];

            await vacationsService.updateVacation(vacation);
            notify.success("Vacation updated successfully!");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    if (loading) return <Spinner />;

    return (
        <div className="UpdateVacation">
            <form onSubmit={handleSubmit(send)}>
                <h2>✏️ Update Vacation</h2>

                <input type="hidden" {...register("vacationId")} />

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

                <label>Cover image:</label>
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

                <div className="form-actions">
                    <button type="submit" className="btn-update">Update</button>
                    <button type="button" className="btn-cancel" onClick={() => navigate("/vacations")}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
