import { useEffect, useState } from 'react';
import ArticleCard from '../../components/Articles/ArticleCard';


const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const articlesPerPage = 6; // Change this value to modify the default posts per page

    // Fetch posts based on the current page
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(`/api/article/getarticles?startIndex=${(currentPage - 1) * articlesPerPage}&limit=${articlesPerPage}`);
                const data = await res.json();
                setArticles(data.articles);
                setTotalPages(Math.ceil(data.totalArticles / articlesPerPage));

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchArticles();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <section className="max-w-8xl mx-auto p-3 flex flex-col gap-8 py-10">
            <h2>Articles Page</h2>

            {articles && articles.length > 0 && (
                <div className="">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {articles.map((article) => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-6 gap-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 hover:text-gray-200 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === index + 1
                                ? 'bg-sky-600 text-gray-200'
                                : 'bg-sky-600 text-gray-200 hover:bg-gray-700'
                            }`}
                        >
                            {index + 1}
                        </button>
                        ))}

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
};

export default Articles;

