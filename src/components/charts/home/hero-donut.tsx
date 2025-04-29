"use client";

import { CalendarDays, FlameIcon, PlusCircle, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { useDashboardComparison } from "@/services/hooks/analytics-hooks";
import { convertDateYYYYMMDDToMonDD } from "@/utils/functions";
import { useNavigate } from "react-router";

// Helper: Map date string to weekday
function getDayOfWeek(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
}

// Helper: Build chart data from attendance
function buildChartData(attendanceDates: Record<string, boolean>) {
    // Count workouts per day of week
    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const dayColors = [
        "hsl(142, 76%, 36%)",
        "hsl(142, 71%, 45%)",
        "hsl(142, 76%, 53%)",
        "hsl(141, 84%, 60%)",
        "hsl(143, 85%, 66%)",
        "hsl(141, 79%, 85%)",
        "hsl(142, 77%, 73%)",
    ];
    const dayCount: Record<string, number> = {};
    daysOfWeek.forEach((day) => (dayCount[day] = 0));

    Object.entries(attendanceDates).forEach(([date, present]) => {
        if (present) {
            const day = getDayOfWeek(date);
            dayCount[day] += 1;
        }
    });

    return daysOfWeek.map((day, idx) => ({
        day,
        minutes: dayCount[day], // Here, "minutes" means "workouts attended" for this day
        fill: dayColors[idx],
    }));
}

const chartConfig = {
    minutes: {
        label: "Days Attended",
    },
    Monday: { label: "Monday", color: "hsl(142, 76%, 36%)" },
    Tuesday: { label: "Tuesday", color: "hsl(142, 71%, 45%)" },
    Wednesday: { label: "Wednesday", color: "hsl(142, 76%, 53%)" },
    Thursday: { label: "Thursday", color: "hsl(141, 84%, 60%)" },
    Friday: { label: "Friday", color: "hsl(143, 85%, 66%)" },
    Saturday: { label: "Saturday", color: "hsl(141, 79%, 85%)" },
    Sunday: { label: "Sunday", color: "hsl(142, 77%, 73%)" },
} satisfies ChartConfig;

export function HeroDonutChart() {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useDashboardComparison();

    if (isLoading)
        return (
            <Card className="flex flex-col">
                <Spinner />
            </Card>
        );

    if (isError || !data)
        return (
            <Card className="flex flex-col">
                <p>An error occurred while fetching data</p>
            </Card>
        );

    const timePeriodData = data.weekly;
    const chartData = buildChartData(timePeriodData.attendance.dates);

    const totalMinutes = timePeriodData.totalDuration.totalMinutes;

    const formattedChange = timePeriodData.totalDuration.formattedChange;

    const attendanceDates = Object.keys(timePeriodData.attendance.dates);
    const weekStart = convertDateYYYYMMDDToMonDD(attendanceDates[0]);
    const weekEnd = convertDateYYYYMMDDToMonDD(attendanceDates[attendanceDates.length - 1]);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <div className="flex items-center gap-3">
                    <FlameIcon className="text-amber-500" size={40} />
                    <div>
                        <p className="align-baseline">Your Weekly Workout Summary</p>
                        <p className="text-gray-400">
                            {weekStart} - {weekEnd}
                        </p>
                    </div>
                </div>

                {/* <CardDescription>
                    <span className="font-semibold">{streak} day streak</span> – {streakMessage}
                </CardDescription> */}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="minutes"
                            nameKey="day"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                    {formattedChange}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-5 pt-3">
                    <Button variant="outline">
                        <CalendarDays /> Daily View
                    </Button>
                    <Button variant="default" onClick={() => navigate("/workouts/create")}>
                        <PlusCircle />
                        Add Workout
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
