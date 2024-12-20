import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { RiExpandUpDownLine } from "react-icons/ri";


const MostData = ({ mostCommentedPostTitle, mostLikedComments }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const animationVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <div className="relative">
            <RiExpandUpDownLine
                onClick={toggleOpen}
                className="text-lg text-teal-500 cursor-pointer hover:text-teal-700 transition"
            />

            {isOpen && (
                <motion.div
                    className="absolute top-full mt-2 left-0 bg-white dark:bg-slate-800 shadow-md rounded-md p-4 w-full z-50 space-y-2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animationVariants}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <p className="text-sm text-gray-400">
                        <span className='font-bold'>Most comments on:</span><br/> {mostCommentedPostTitle}
                    </p>
                    <div className="text-sm text-gray-400">
                        <span className='font-bold'>Most liked comments:</span>{' '}
                        {mostLikedComments.length > 0 ? (
                            <ul className="list-disc ml-5">
                                {mostLikedComments.map((comment) => (
                                    <li key={comment._id}>
                                        {comment.content} ({comment.numberOfLikes} likes)
                                    </li>
                                ))}
                            </ul>
                        ) : (
                        'N/A'
                        )}
                    </div>
                    <button
                        onClick={toggleOpen}
                        className="text-sm text-teal-800 dark:text-teal-600 hover:underline mt-4"
                    >
                        Close
                    </button>
                </motion.div>
            )}
        </div>
    );
};

MostData.propTypes = {
    mostCommentedPostTitle: PropTypes.string.isRequired,
    mostLikedComments: PropTypes.arrayOf(
        PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        numberOfLikes: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default MostData;
