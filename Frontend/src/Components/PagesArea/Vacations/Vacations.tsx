import { VacationList } from "../../VacationArea/VacationList/VacationList";
import { Hero } from "../Hero/Hero";
import { ConveyorBelt } from "../../ConveyorBelt/ConveyorBelt/ConveyorBelt";
import "./Vacations.css";

export function Vacations() {
    return (
        <div className="Vacations">

            <Hero />
            <ConveyorBelt />
            <VacationList />

        </div>
    );
}