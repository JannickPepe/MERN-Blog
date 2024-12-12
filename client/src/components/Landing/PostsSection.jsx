import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../Posts/PostCard';

const PostsSection = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const postsPerPage = 6; // Change this value to modify the default posts per page

    // Fetch posts based on the current page
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?startIndex=${(currentPage - 1) * postsPerPage}&limit=${postsPerPage}`);
                const data = await res.json();
                setPosts(data.posts);
                setTotalPages(Math.ceil(data.totalPosts / postsPerPage));

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
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
            <div className="text-center pb-2">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                    NighteCoding&apos;s exciting{" "}
                    <span className="text-sky-600 dark:text-indigo-500">Posts</span>
                </h2>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold mt-3">
                    Our posts are a perfect match for an evening coffee
                </p>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold">
                    With redirect link to the full post
                </p>
            </div>

            {posts && posts.length > 0 && (
                <div className="">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
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

                    <section className="relative group flex flex-col items-center justify-center mx-auto w-1/2 h-full mt-14" >
                        <div className="file relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] z-50" >
                            <div
                                className="work-5 bg-amber-600 w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-amber-600 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"
                            ></div>
                            <div
                                className="work-4 absolute inset-1 bg-zinc-400 rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]"
                            ></div>
                            <div
                                className="work-3 absolute inset-1 bg-zinc-300 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]"
                            ></div>
                            <div
                                className="work-2 absolute inset-1 bg-zinc-200 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]"
                            ></div>
                            <div
                                className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-amber-400 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(1px)]"
                            ></div>
                        </div>

                        <div className="text-3xl pt-4">
                            <Link to={'/search'} className='text-lg text-teal-600 hover:underline text-center uppercase font-mono' >
                                all posts
                            </Link>
                        </div>
                    </section>
                </div>
            )}
        </section>
    );
};

export default PostsSection;

