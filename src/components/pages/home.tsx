import { Bot, ChartColumnIncreasing, History, Plus } from "lucide-react";
import { Link } from "react-router";
import { HeroDonutChart } from "../charts/home/hero-donut";
import { AIDropdown } from "../spec/home/ai-dropdown";
import QuoteDialog from "../spec/home/quote-dialog";
import HomeRecentWorkout from "../spec/home/recent-workout";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const HomePage = () => {
    const name = "James Darmody";
    return (
        <div className="flex flex-col gap-4 pt-24 px-4 pb-3">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                    Good Evening, {name.split(" ")[0]}
                </h1>
            </div>
            <div className="flex gap-2 justify-around items-center">
                <div className="flex flex-col items-center gap-2">
                    <Button className="bg-secondary text-foreground border-primary border-1">
                        <Plus />
                    </Button>
                    <p className="text-xs">Add</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Link to="/workouts">
                        <Button className="bg-secondary text-foreground border-primary border-1">
                            <History />
                        </Button>
                    </Link>
                    <p className="text-xs">History</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Button className="bg-secondary text-foreground border-primary border-1">
                        <ChartColumnIncreasing />
                    </Button>
                    <p className="text-xs">Analytics</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <AIDropdown />
                    <p className="text-xs">Greep</p>
                </div>
            </div>
            <HeroDonutChart />
            <HomeRecentWorkout />
            <Card className="px-4">
                <div className="flex gap-5 items-center">
                    <Bot className="text-primary" />
                    <div>
                        <p>Feeling a bit lazy today?</p>
                        <p className="text-gray-500">Ask Greep to motivate you!</p>
                    </div>
                    <QuoteDialog />
                </div>
            </Card>
        </div>
    );
};

export default HomePage;
