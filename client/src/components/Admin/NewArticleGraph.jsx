import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchArticleStats } from "../../api/fetchArticleCharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const NewArticleChart = () => {
    const [timeRange, setTimeRange] = useState("24h"); // Default to Last 24 Hours

    // Fetch article stats based on selected time range
    const { data: graphData = { articles: [] }, isLoading, isError } = useQuery({
        queryKey: ["articleStats", timeRange],
        queryFn: () => fetchArticleStats(timeRange),
        keepPreviousData: true,
    });

    const chartData = graphData.articles.map((point) => ({
        date: point.date,
        articles: point.count,
        likes: point.likes || 0, // Ensure likes data is included, defaulting to 0 if not present
    }));

    // Calculate total articles and likes for the selected time range
    const totalArticlesForTimeRange = graphData.articles.reduce((sum, article) => sum + article.count, 0);
    const totalLikesForTimeRange = graphData.articles.reduce((sum, article) => sum + (article.likes || 0), 0);

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
                        <CardTitle>Article & Likes Statistics</CardTitle>
                        <CardDescription>
                            Select a time range to view statistics of articles created and likes received.
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
                {/* Bar Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                            formatter={(value, name) =>
                                `${value} ${name === "articles" ? "Articles" : "Likes"}`
                            }
                            labelFormatter={(label) =>
                                `Date: ${new Date(label).toLocaleDateString()}`
                            }
                        />
                        <Bar dataKey="articles" fill="rgba(59, 130, 246, 1)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="likes" fill="rgba(255, 99, 132, 1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    <span className="text-gray-700 dark:text-gray-300">
                        Total Articles: {totalArticlesForTimeRange} | Total Likes: {totalLikesForTimeRange} within{" "}
                        {timeRange === "24h" ? "24 Hours" : timeRange === "7d" ? "7 Days" : "1 Month"}
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

export default NewArticleChart;
