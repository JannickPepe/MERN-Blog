import React, { Suspense, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchArticles } from '../../api/fetchArticles';


// Lazy load the ArticlesLanding component
const ArticlesLanding = React.lazy(() => import('../../components/Landing/Articles'));

const Articles = React.memo(() => {
    const queryClient = useQueryClient();
    const articlesPerPage = 6;
    const [currentPage, setCurrentPage] = React.useState(1);

    // Fetch articles using React Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['articles', currentPage],
        queryFn: () => fetchArticles((currentPage - 1) * articlesPerPage, articlesPerPage),
        keepPreviousData: true, // Retain previous page data while loading new data
    });

    // Prefetch the next page
    React.useEffect(() => {
        if (data?.totalArticles && currentPage < Math.ceil(data.totalArticles / articlesPerPage)) {
            queryClient.prefetchQuery({
                queryKey: ['articles', currentPage + 1],
                queryFn: () =>
                    fetchArticles(currentPage * articlesPerPage, articlesPerPage),
            });
        }
    }, [currentPage, queryClient, data]);

    // Memoized handlers for pagination
    const handleNextPage = useCallback(() => {
        if (data?.totalArticles && currentPage < Math.ceil(data.totalArticles / articlesPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }, [currentPage, data]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }, [currentPage]);

    const handlePageChange = useCallback(
        (page) => {
            setCurrentPage(page);
        },
        [] // `setCurrentPage` is a stable function, so no dependencies are needed
    );

    // Safely calculate total pages with a fallback value
    const totalPages = useMemo(() => {
        if (!data?.totalArticles) return 1; // Default to 1 page if data is unavailable
        return Math.ceil(data.totalArticles / articlesPerPage);
    }, [data, articlesPerPage]);

    const paginationButtons = useMemo(() => {
        return [...Array(totalPages)].map((_, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                        ? 'bg-sky-600 text-gray-200'
                        : 'bg-sky-600 text-gray-200 hover:bg-gray-700'
                }`}
            >
                {index + 1}
            </button>
        ));
    }, [currentPage, handlePageChange, totalPages]);

    if (isLoading) return <p>Loading Articles...</p>;
    if (isError) return <p className="text-red-500">Failed to load articles.</p>;

    return (
        <section className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-10 min-h-screen">
            <div className="text-center px-4 md:px-2 lg:px-0">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                    NighteCoding&apos;s exciting{' '}
                    <span className="text-sky-600 dark:text-indigo-500">Articles</span>
                </h2>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold mt-3">
                    Our articles are a perfect match for an evening coffee.
                </p>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold">
                    A good learning is on the go!
                </p>
            </div>

            {data?.articles && data.articles.length > 0 && (
                <div>
                    <div className="max-w-3xl mx-auto">
                        <Suspense fallback={<p>Loading Articles Page...</p>}>
                            {data.articles.map((article) => (
                                <ArticlesLanding key={article._id} article={article} />
                            ))}
                        </Suspense>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 hover:text-gray-200 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {paginationButtons}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 text-gray-700 hover:text-gray-200 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
});

// Add displayName
Articles.displayName = 'Articles Page';

export default Articles;
