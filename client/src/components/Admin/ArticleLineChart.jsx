import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchArticleStats } from "../../api/fetchArticleCharts";
import { TrendingUp, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ArticleLineChart = () => {
    const [timeRange, setTimeRange] = useState("7d"); // Default to Last 24 Hours
    const [percentageChange, setPercentageChange] = useState({ articles: 0, likes: 0 }); // % changes for articles and likes

    // Fetch article stats based on selected time range
    const { data: graphData = { articles: [] }, isLoading, isError } = useQuery({
        queryKey: ["articleStats", timeRange],
        queryFn: () => fetchArticleStats(timeRange),
        keepPreviousData: true,
    });

    const chartData = useMemo(
        () =>
            graphData.articles.map((point) => ({
                date: point.date,
                articles: point.count,
                likes: point.likes || 0,
            })),
        [graphData]
    );

    const totalArticlesForTimeRange = useMemo(
        () => graphData.articles.reduce((sum, article) => sum + article.count, 0),
        [graphData]
    );

    const totalLikesForTimeRange = useMemo(
        () => graphData.articles.reduce((sum, article) => sum + (article.likes || 0), 0),
        [graphData]
    );

    useEffect(() => {
        const fetchPreviousStats = async () => {
            const previousTimeRange = timeRange === "24h" ? "7d" : timeRange === "7d" ? "30d" : "30d";
            const previousData = await fetchArticleStats(previousTimeRange);

            const previousArticlesTotal = previousData.articles.reduce((sum, article) => sum + (article.count || 0), 0);
            const previousLikesTotal = previousData.articles.reduce((sum, article) => sum + (article.likes || 0), 0);

            const articlesChange = previousArticlesTotal
                ? ((totalArticlesForTimeRange - previousArticlesTotal) / previousArticlesTotal) * 100
                : totalArticlesForTimeRange > 0
                ? 100
                : 0;

            const likesChange = previousLikesTotal
                ? ((totalLikesForTimeRange - previousLikesTotal) / previousLikesTotal) * 100
                : totalLikesForTimeRange > 0
                ? 100
                : 0;

            setPercentageChange({ articles: articlesChange, likes: likesChange });
        };

        fetchPreviousStats();
    }, [timeRange, totalArticlesForTimeRange, totalLikesForTimeRange]);

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
    };

    const getColorForPercentage = (percentage) => {
        if (percentage <= 33) return "text-red-500";
        if (percentage <= 66) return "text-yellow-500";
        return "text-green-500";
    };

    const getTooltipMessage = (percentage, type) => {
        if (percentage <= 33) {
            return type === "articles"
                ? "How to use AI to get better"
                : "Optimize your content strategy";
        } else if (percentage <= 66) {
            return type === "articles"
                ? "How to make SEO and track analytics"
                : "Enhance audience engagement";
        } else {
            return type === "articles"
                ? "Well done, now feel free to share with people"
                : "Keep up the great work!";
        }
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
                <div className="md:flex justify-between items-center">
                    <div>
                        <CardTitle className="text-lg">Articles & Likes Statistics</CardTitle>
                        <CardDescription className="max-w-xs mb-4 md:mb-0">
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
                            <DropdownMenuItem onClick={() => handleTimeRangeChange("7d")}>Last 7 Days</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTimeRangeChange("24h")}>Last 24 Hours</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTimeRangeChange("30d")}>Last Month</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={300} className="dark:text-slate-800">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            tickLine={false}
                            axisLine={false}
                            className="text-red-400"
                        />
                        <YAxis />
                        <Tooltip formatter={(value, name) => `${value} ${name}`} />
                        <Line
                            type="monotone"
                            dataKey="articles"
                            stroke="rgba(59, 130, 246, 1)"
                            strokeWidth={2}
                            dot={{ fill: "rgba(59, 130, 246, 1)" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="likes"
                            stroke="rgba(255, 99, 132, 1)"
                            strokeWidth={2}
                            dot={{ fill: "rgba(255, 99, 132, 1)" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    <span className="text-gray-700 dark:text-gray-300">
                        Total Articles: {totalArticlesForTimeRange} | Total Likes: {totalLikesForTimeRange} within{" "}
                        {timeRange === "24h" ? "24 Hours" : timeRange === "7d" ? "7 Days" : "1 Month"}
                    </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Showing statistics for the selected time range: <strong>{timeRange}</strong>.
                </p>
                <div className={`flex items-center gap-2 font-medium leading-none ${getColorForPercentage(percentageChange.articles)}`}>
                    <TrendingUp className="h-4 w-4" />
                    <span>{percentageChange.articles.toFixed(2)}% {percentageChange.articles > 0 ? "increase" : "decrease"} in articles</span>
                    <div className="relative group">
                        <Info className="h-4 w-4 text-gray-500 hover:text-gray-800" />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white p-2 min-w-[140px] rounded shadow-lg text-xs">
                            {getTooltipMessage(percentageChange.articles, "articles")}
                        </div>
                    </div>
                </div>
                <div className={`flex items-center gap-2 font-medium leading-none ${getColorForPercentage(percentageChange.likes)}`}>
                    <TrendingUp className="h-4 w-4" />
                    <span>{percentageChange.likes.toFixed(2)}% {percentageChange.likes > 0 ? "increase" : "decrease"} in likes</span>
                    <div className="relative group">
                        <Info className="h-4 w-4 text-gray-500 hover:text-gray-800" />
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white p-2 min-w-[140px] rounded shadow-lg text-xs">
                            {getTooltipMessage(percentageChange.likes, "likes")}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ArticleLineChart;
