import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchArticleStats } from "../../api/fetchArticleCharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ArticleLineChart = () => {
    const [timeRange, setTimeRange] = useState("24h"); // Default to Last 24 Hours

    // Fetch article stats based on selected time range
    const { data: graphData = { articles: [] }, isLoading, isError } = useQuery({
        queryKey: ["articleStats", timeRange],
        queryFn: () => fetchArticleStats(timeRange),
        keepPreviousData: true,
    });

    const chartData = graphData.articles.map((point) => ({
        date: point.date,
        count: point.count,
    }));

    // Calculate total articles for the selected time range
    const totalArticlesForTimeRange = graphData.articles.reduce((sum, article) => sum + article.count, 0);

    // Dropdown handler
    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
    };

    if (isLoading) {
        return <p>Loading chart...</p>;
    }

    if (isError) {
        return <p className="text-red-500">Failed to load chart data.</p>;
    }

    return (
        <Card className="w-full max-w-4xl mx-auto p-4">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Article Amount Statistics</CardTitle>
                        <CardDescription>
                            Select a time range to view detailed statistics of articles created.
                        </CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {timeRange === "24h" ? "Last 24 Hours" : timeRange === "7d" ? "Last 7 Days" : "Last Month"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleTimeRangeChange("24h")}>
                                Last 24 Hours
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTimeRangeChange("7d")}>
                                Last 7 Days
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTimeRangeChange("30d")}>
                                Last Month
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent>
                {/* Line Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                            formatter={(value) => `${value} Articles`}
                            labelFormatter={(label) =>
                                `Date: ${new Date(label).toLocaleDateString()}`
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="rgba(59, 130, 246, 1)"
                            strokeWidth={2}
                            dot={{ fill: "rgba(59, 130, 246, 1)" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    <span className="text-gray-700 dark:text-gray-300">
                        Total Articles for {timeRange === "24h" ? "Last 24 Hours" : timeRange === "7d" ? "Last 7 Days" : "Last Month"}: {totalArticlesForTimeRange}
                    </span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Showing statistics for the selected time range: <strong>{timeRange}</strong>.
                </p>
            </CardFooter>
        </Card>
    );
};

export default ArticleLineChart;
