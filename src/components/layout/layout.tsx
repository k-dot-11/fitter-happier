import { HeartPulse } from "lucide-react";
import { Link, Outlet } from "react-router";
import { ModeToggle } from "./theme-toggle";
import UserDropdown from "./user-dropdown";

const Layout = () => {
    return (
        <div>
            <div className="flex justify-between items-center p-4 bg-primary text-white shadow-2xl fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center gap-2 justify-center">
                    <HeartPulse />
                    <h1 className="font-bold text-md">
                        <Link to={"/"}>Fitter / Happier</Link>
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <UserDropdown />
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;
