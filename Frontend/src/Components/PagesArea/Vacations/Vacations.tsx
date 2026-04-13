import { VacationList } from "../../VacationArea/VacationList/VacationList";
import { Hero } from "../Hero/Hero";
import "./Vacations.css";

export function Vacations() {
    return (
        <div className="Vacations">

            <Hero />
            <VacationList />

        </div>
    );
}