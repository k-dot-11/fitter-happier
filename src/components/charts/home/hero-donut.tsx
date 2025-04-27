"use client";

import { CalendarDays, FlameIcon, PlusCircle, TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
const chartData = [
    { day: "Monday", minutes: 45, fill: "hsl(142, 76%, 36%)" }, // Green-600
    { day: "Tuesday", minutes: 60, fill: "hsl(142, 71%, 45%)" }, // Green-500
    { day: "Wednesday", minutes: 30, fill: "hsl(142, 76%, 53%)" }, // Green-400
    { day: "Thursday", minutes: 45, fill: "hsl(141, 84%, 60%)" }, // Green-300
    { day: "Friday", minutes: 50, fill: "hsl(143, 85%, 66%)" }, // Green-200
    { day: "Saturday", minutes: 75, fill: "hsl(141, 79%, 85%)" }, // Green-100
    { day: "Sunday", minutes: 40, fill: "hsl(142, 77%, 73%)" }, // Green-150
];

const chartConfig = {
    minutes: {
        label: "Minutes",
    },
    Monday: {
        label: "Monday",
        color: "hsl(142, 76%, 36%)",
    },
    Tuesday: {
        label: "Tuesday",
        color: "hsl(142, 71%, 45%)",
    },
    Wednesday: {
        label: "Wednesday",
        color: "hsl(142, 76%, 53%)",
    },
    Thursday: {
        label: "Thursday",
        color: "hsl(141, 84%, 60%)",
    },
    Friday: {
        label: "Friday",
        color: "hsl(143, 85%, 66%)",
    },
    Saturday: {
        label: "Saturday",
        color: "hsl(141, 79%, 85%)",
    },
    Sunday: {
        label: "Sunday",
        color: "hsl(142, 77%, 73%)",
    },
} satisfies ChartConfig;

export function HeroDonutChart() {
    const totalMinutes = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.minutes, 0);
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <div className="flex items-center gap-3">
                    <FlameIcon className="text-amber-500" size={40} />
                    <div>
                        <p className="align-baseline">
                            Your Weekly Workout Summary
                        </p>
                        <p className="text-gray-400">
                            {new Date().toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            -{" "}
                            {new Date(
                                Date.now() + 6 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="minutes"
                            nameKey="day"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalMinutes}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Minutes
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-bold leading-none">
                    13% more than last week
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-5 pt-3">
                    <Button variant="outline">
                        <CalendarDays /> Daily View
                    </Button>
                    <Button>
                        <PlusCircle />
                        Add Workout
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
