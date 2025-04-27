import { HeartPulse, UserCircle2 } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import { ModeToggle } from "./theme-toggle";
import { Button } from "../ui/button";

const Layout = () => {
    const navigate = useNavigate();
    const handleProfileClick = () => {
        navigate("/profile");
    };
    return (
        <div>
            <div className="flex justify-between items-center p-4 bg-primary text-white shadow-2xl fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center gap-2 justify-center">
                    <HeartPulse />
                    <h1 className="font-bold text-md"> Fitter / Happier</h1>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button variant="ghost" onClick={handleProfileClick}>
                        <UserCircle2 />
                    </Button>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;
