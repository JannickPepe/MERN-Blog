/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiTrash2, FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { GrPowerReset } from "react-icons/gr";


const DashArticlesNew = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [userArticles, setUserArticles] = useState([]); // Articles Data
    const [showMore, setShowMore] = useState(true); // Pagination flag
    const [showModal, setShowModal] = useState(false); // Modal state
    const [articleIdToDelete, setArticleIdToDelete] = useState(""); // Article ID for deletion

    // Fetch Articles
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(`/api/article/getarticles?userId=${currentUser._id}`);
                const data = await res.json();
                
                if (res.ok) {
                    setUserArticles(data.articles);
                    if (data.articles.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        if (currentUser.isAdmin) {
            fetchArticles();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id]);

    // Show More Articles
    const handleShowMore = async () => {
        const startIndex = userArticles.length;

        try {
            const res = await fetch(
                `/api/article/getarticles?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();

            if (res.ok) {
                setUserArticles((prev) => [...prev, ...data.articles]);
                if (data.articles.length < 9) {
                    setShowMore(false);
                }
            }
            } catch (error) {
            console.error("Error fetching more articles:", error);
        }
    };

    // Open Modal to Confirm Deletion
    const confirmDelete = (articleId) => {
        setArticleIdToDelete(articleId);
        setShowModal(true);
    };

    // Delete Article
    const handleDeleteArticle = async () => {
        setShowModal(false);

        try {
            const res = await fetch(
                `/api/article/deletearticle/${articleIdToDelete}/${currentUser._id}`,
                { method: "DELETE" }
            );
            const data = await res.json();

            if (res.ok) {
                setUserArticles((prev) => prev.filter((article) => article._id !== articleIdToDelete));
            } else {
                console.error("Failed to delete article:", data.message);
            }
            } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    // Function to save updated ranks to the backend
    const saveRankOrder = async (articles) => {
        try {
            const payload = articles.map((article) => ({
                _id: article._id,
                rank: article.rank,
            }));
        
            const res = await fetch('/api/article/update-rank', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.token}`,
                },
                body: JSON.stringify({ updatedArticles: payload }),
            });
        
            const data = await res.json();
            if (!res.ok) {
                alert(`Error: ${data.message}`);
            } else {
                console.log('Rank updated successfully!');
            }
        } catch (error) {
            console.error('Error saving rank order:', error);
        }
    };

    // Ranking Functions (UI Shift)
    const shift = (id, direction) => {
        const index = userArticles.findIndex((u) => u._id === id);
        let articlesCopy = [...userArticles];

        if (direction === "up" && index > 0) {
            [articlesCopy[index], articlesCopy[index - 1]] = [articlesCopy[index - 1], articlesCopy[index]];

        } else if (direction === "down" && index < articlesCopy.length - 1) {
            [articlesCopy[index], articlesCopy[index + 1]] = [articlesCopy[index + 1], articlesCopy[index]];
        }

        // After reordering, assign rank = index + 1 based on the new order
        articlesCopy.forEach((a, idx) => {
        a.rank = idx + 1;
        });

        setUserArticles(articlesCopy);
        saveRankOrder(articlesCopy); // Save updated ranks
    };

    const resetRankOrder = async () => {
        try {
            // Fetch articles sorted by createdAt in ascending order
            const res = await fetch(`/api/article/getarticles?sortBy=createdAt&order=asc`);
            const data = await res.json();
        
            if (!res.ok) {
                alert(`Error resetting rank order: ${data.message}`);
                return;
            }
        
            // Now assign ranks based on the original creation order
            const resetArticles = data.articles.map((article, index) => ({
                ...article,
                rank: index + 1, // Assign rank by their original creation order
            }));
        
            setUserArticles(resetArticles);
            await saveRankOrder(resetArticles); // Save reset ranks to the backend
            
        } catch (error) {
            console.error('Error resetting rank order:', error);
        }
    };
    

    return (
        <div className="">
            <div className=" bg-zinc-200 shadow-lg rounded-lg overflow-x-scroll mx-auto">
                <table className="">
                    <thead>
                        <tr className="border-b-[1px] border-slate-200 text-slate-800 text-sm uppercase">
                        <th className="pl-4 w-8">
                            <button
                                onClick={resetRankOrder}
                                className="mt-2 hover:rotate-180 transition-transform duration-300"
                            >
                                <GrPowerReset className="h-5 w-5" />
                            </button>
                        </th>
                        <th className="text-start p-4 font-medium">Date Updated</th>
                        <th className="text-start p-4 font-medium">Image</th>
                        <th className="text-start p-4 font-medium">Title</th>
                        <th className="text-start p-4 font-medium">Text</th>
                        <th className="text-start p-4 font-medium">URL</th>
                        <th className="text-start p-4 font-medium">Likes</th>
                        <th className="text-start p-4 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userArticles.map((article, index) => (
                            <TableRows
                                key={article._id}
                                article={article}
                                index={index}
                                shift={shift}
                                confirmDelete={confirmDelete}
                            />
                        ))}
                    </tbody>
                </table>

                {showMore && (
                    <button
                        onClick={handleShowMore}
                        className="w-full text-teal-500 self-center text-sm py-7"
                    >
                        Show more
                    </button>
                )}
            </div>

            {/* Modal for Confirming Deletion */}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FiTrash2 className="h-14 w-14 text-red-600 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500">
                            Are you sure you want to delete this article?
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={handleDeleteArticle}>
                            Yes, I&apos;m sure
                        </Button>
                        <Button color="gray" onClick={() => setShowModal(false)}>
                            No, cancel
                        </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};


const TableRows = ({ article, index, shift, confirmDelete }) => {

    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded((prev) => !prev);

    return (
        <motion.tr
            layoutId={`row-${article._id}`}
            className={`text-sm ${index % 2 ? "bg-zinc-200" : "bg-zinc-100"}`}
        >
            <td className="pl-4 w-8 text-lg">
                <button className="hover:text-sky-600" onClick={() => shift(article._id, "up")}>
                    <FiChevronUp className="hover:scale-110" />
                </button>
                <button className="hover:text-sky-600" onClick={() => shift(article._id, "down")}>
                    <FiChevronDown className="hover:scale-110" />
                </button>
            </td>
            <td className="p-4 font-medium">
                {new Date(article.updatedAt).toLocaleDateString()}
            </td>
            <td className="p-4 flex items-center gap-3">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-10 md:w-14 h-10 md:h-14 rounded-full bg-slate-300 object-cover"
                />
            </td>
            <td className="p-4 font-medium">{article.title}</td>
            <td className="p-4 font-normal">
                <div className="md:flex items-center gap-1 w-[240px]">
                    <p>
                        {expanded
                        ? article.text // Show full text if expanded
                        : article.text.length > 50
                        ? `${article.text.slice(0, 50)}...` // Truncated text
                        : article.text}
                    </p>
                    {article.text.length > 50 && (
                        <button
                            onClick={toggleExpand}
                            className="text-slate-800 hover:text-sky-600"
                        >
                            {expanded ? (
                                <>
                                    <FiChevronUp className="w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    <FiChevronDown className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </td>
            <td className="p-4 font-nomral">{article.link}</td>
            <td className="p-4 font-medium">{article.likes}</td>
            <td className="p-4 ">
                <div className="flex items-end gap-4">
                    <Link
                        to={`/update-article/${article._id}`}
                        className="text-teal-600 hover:text-teal-800"
                    >
                        <FiEdit className="h-5 w-5" />
                    </Link>
                    <button
                        onClick={() => confirmDelete(article._id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <FiTrash2 className="h-5 w-5" />
                    </button>
                </div>
            
            </td>
        </motion.tr>
    );
};

export default DashArticlesNew;
