import { useEffect, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import "./ConveyorBelt.css";

export function ConveyorBelt() {
    const [destinations, setDestinations] = useState<string[]>([]);

    useEffect(() => {
        vacationsService.getAllVacations(1, "all")
            .then(data => {
                const uniqueDestinations = Array.from(new Set(data.map(v => v.destination).filter(d => Boolean(d)))) as string[];
                setDestinations(uniqueDestinations);
            })
            .catch(err => console.log(err));
    }, []);

    if (destinations.length === 0) return null;

    return (
        <div className="ConveyorBeltWrapper">
            <h2 className="conveyor-title">Get ready to see our top locations !</h2>
            <div className="ConveyorBelt">
                <div className="conveyor-track">
                    {/* Render twice for seamless infinite scroll */}
                    {destinations.map((dest, index) => (
                        <span key={`first-${index}`} className="conveyor-item">✯ {dest}</span>
                    ))}
                    {destinations.map((dest, index) => (
                        <span key={`second-${index}`} className="conveyor-item">✯ {dest}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
