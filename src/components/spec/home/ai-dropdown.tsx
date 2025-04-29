import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot } from "lucide-react";

export function AIDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="border-amber-400 border-1 bg-secondary text-foreground">
                    <Bot />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Plan Workout</DropdownMenuItem>
                <DropdownMenuItem>Get Motivated</DropdownMenuItem>
                <DropdownMenuItem>AI Report</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
