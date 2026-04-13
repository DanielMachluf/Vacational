import { Navigate, Route, Routes } from "react-router-dom";
import { Page404 } from "../../PagesArea/Page404/Page404";
import { AskMCP } from "../../PagesArea/AskMCP/AskMCP";
import { AskAI } from "../../PagesArea/AskAI/AskAI";
import { Vacations } from "../../PagesArea/Vacations/Vacations";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/Register";
import { AddVacation } from "../../AdminArea/AddVacation/AddVacation";
import { UpdateVacation } from "../../AdminArea/UpdateVacation/UpdateVacation";
import { DeleteVacation } from "../../AdminArea/DeleteVacation/DeleteVacation";
import { VacationReport } from "../../AdminArea/VacationReport/VacationReport";
import { About } from "../../PagesArea/About/About";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/vacations" />} />
            <Route path="/vacations" element={<Vacations />} />
            <Route path="/ask-ai" element={<AskAI />} />
            <Route path="/ask-mcp" element={<AskMCP />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            {/* Admin routes */}
            <Route path="/admin/add" element={<AddVacation />} />
            <Route path="/admin/update/:id" element={<UpdateVacation />} />
            <Route path="/admin/delete/:id" element={<DeleteVacation />} />
            <Route path="/admin/report" element={<VacationReport />} />

            <Route path="/404" element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
