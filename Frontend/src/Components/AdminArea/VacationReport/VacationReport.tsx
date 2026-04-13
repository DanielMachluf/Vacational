import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { authService } from "../../../Services/AuthService";
import { vacationsService } from "../../../Services/VacationsService";
import { Role } from "../../../Models/Role";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./VacationReport.css";

export function VacationReport() {
    const [data, setData] = useState<{ destination: string; likesCount: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authService.user || authService.user.role !== Role.Admin) {
            notify.error("Only admins can view reports.");
            navigate("/vacations");
            return;
        }

        vacationsService.getVacationReport()
            .then(report => {
                setData(report);
                setLoading(false);
            })
            .catch(err => {
                notify.error(err);
                setLoading(false);
            });
    }, [navigate]);

    async function downloadCsv() {
        try {
            const csvData = await vacationsService.getVacationReportCsv();
            const blob = new Blob([csvData], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "vacations-report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            notify.success("CSV report downloaded!");
        } catch (err: any) {
            notify.error(err);
        }
    }

    if (loading) return <Spinner />;

    return (
        <div className="VacationReport">
            <div className="report-header">
                <h2>📊 Vacations Report</h2>
                <button className="btn-download" onClick={downloadCsv}>📥 Download CSV</button>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="destination" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="likesCount" name="Likes" fill="#36b5d8" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
