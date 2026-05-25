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
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VacationModel>();
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
            if (new Date(vacation.startDate!) < new Date(new Date().setHours(0,0,0,0))) {
                notify.error("Start date cannot be in the past!");
                return;
            }
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
                <input type="text" {...register("destination", {
                    required: "Destination is required",
                    minLength: { value: 2, message: "Destination must be at least 2 characters" },
                    maxLength: { value: 50, message: "Destination cannot exceed 50 characters" }
                })} />
                {errors.destination && <span className="error-msg">{errors.destination.message}</span>}

                <label>Description:</label>
                <textarea {...register("description", {
                    required: "Description is required",
                    minLength: { value: 2, message: "Description must be at least 2 characters" },
                    maxLength: { value: 500, message: "Description cannot exceed 500 characters" }
                })} rows={4} />
                {errors.description && <span className="error-msg">{errors.description.message}</span>}

                <label>Start Date:</label>
                <input type="date" {...register("startDate", { required: "Start date is required" })} />
                {errors.startDate && <span className="error-msg">{errors.startDate.message}</span>}

                <label>End Date:</label>
                <input type="date" {...register("endDate", { required: "End date is required" })} />
                {errors.endDate && <span className="error-msg">{errors.endDate.message}</span>}

                <label>Price ($):</label>
                <input type="number" step="0.01" {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price cannot be negative" },
                    max: { value: 10000, message: "Price cannot exceed $10,000" }
                })} />
                {errors.price && <span className="error-msg">{errors.price.message}</span>}

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
