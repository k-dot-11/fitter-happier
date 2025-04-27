import { Bot, Quote } from "lucide-react";
import { HeroDonutChart } from "../charts/home/hero-donut";
import { AIDropdown } from "../spec/home/ai-dropdown";
import HomeRecentWorkout from "../spec/home/recent-workout";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const HomePage = () => {
    const name = "James Darmody";
    return (
        <div className="flex flex-col gap-4 pt-24 px-4 pb-3">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                    Good Evening {name.split(" ")[0]}
                </h1>
                <AIDropdown />
            </div>
            <HeroDonutChart />
            <HomeRecentWorkout />
            <Card className="px-4">
                <div className="flex gap-5 items-center">
                    <Bot className="text-primary" />
                    <div>
                        <p>Feeling a bit lazy today?</p>
                        <p className="text-gray-500">
                            Ask Greep to motivate you!
                        </p>
                    </div>
                    <Button variant="outline">
                        <Quote className="text-primary" />
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default HomePage;
