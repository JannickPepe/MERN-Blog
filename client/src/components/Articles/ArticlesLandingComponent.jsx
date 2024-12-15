import { useEffect, useState } from 'react';
import { ArticlesLanding } from '../Landing/Articles';
import { Link } from 'react-router-dom';


const ArticlesLandingComponent = () => {
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
        <section className="max-w-8xl mx-auto px-3 flex flex-col gap-8 py-10 md:py-20">
            <div className="text-center px-4 md:px-2 lg:px-0">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                    NighteCoding&apos;s exciting <span className="text-sky-600 dark:text-indigo-500">Articles</span>
                </h2>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold mt-3">Our articles are a perfect match for an evening coffee.</p>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold">A good learning is on the go!</p>
            </div>

            {articles && articles.length > 0 && (
                <div>
                    <div className="max-w-3xl mx-auto">
                        {articles.map((article) => (
                            <ArticlesLanding key={article._id} article={article} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-2 mt-4">
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
            
            <Link to='/articles'>
                <p className='text-center text-lg hover:underline'>See all articles</p>
            </Link>
        
        </section>
    );
};

export default ArticlesLandingComponent;

