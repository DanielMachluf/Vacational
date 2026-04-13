import "./Spinner.css";

export function Spinner() {
    return (
        <div className="Spinner">
            <div className="vacation-loading">
                <span className="plane">✈️</span>
                <span className="island">🏝️</span>
            </div>
            <p>Packing our bags... Please wait!</p>
        </div>
    );
}
