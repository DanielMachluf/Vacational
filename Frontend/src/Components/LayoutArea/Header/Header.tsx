import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import "./Header.css";

export function Header() {
    return (
        <div className="Header">
            <h1>🌴 Vacational</h1>
            <UserMenu />
        </div>
    );
}
