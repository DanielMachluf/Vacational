import { NavLink } from "react-router-dom";
import "./Page404.css";

export function Page404() {

    return (
        <div className="Page404">
            <div className="content-404">
                <h1>404</h1>
                <h2>Looks like you're stranded!</h2>
                <p>We searched everywhere, but this destination doesn't exist on our map.</p>
                <div className="island-emoji">🏝️🥥</div>
                <NavLink to="/vacations" className="home-btn">Take me back to the resort</NavLink>
            </div>
        </div>
    );
}
