import { UserCircle2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/utils/context/auth-provider";

const UserDropdown = () => {
    const { logout } = useAuth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserCircle2 size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>James Darmody</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
