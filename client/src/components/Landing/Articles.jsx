/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';  // Import Redux hooks
import { useEffect, useRef, useState } from "react";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { FiArrowRight, FiThumbsDown, FiThumbsUp } from "react-icons/fi";

export const ArticlesLanding = ({ article }) => {

    const [likes, setLikes] = useState(article.likes || 0);
    const [liked, setLiked] = useState(false);

    const user = useSelector(state => state.user);
    const userId = user?.id;
    const token = user?.token;

    useEffect(() => {
        if (article.likedByUsers && userId) {
            const userHasLiked = article.likedByUsers.includes(userId);
            setLiked(userHasLiked);
        }
        setLikes(article.likes); // Ensure likes state matches article
    }, [article, userId]);

    const handleToggleLike = async () => {
        try {
            const res = await fetch(`/api/article/likearticle/${article._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                setLikes(data.likes);
                setLiked(data.liked);
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    return (
        <section className="py-8 max-w-5xl mx-auto">
            <div className="mx-auto px-6 md:px-0 mt-4">
                <Link
                    heading={article.title}
                    subheading={article.text}
                    linkheading={article.link}
                    imgSrc={article.image}
                    href={article.link}
                />

                <div className="mt-4 flex items-center gap-2">
                    {!liked && (
                        <button
                        className=" text-sky-600"
                        onClick={handleToggleLike}
                        >
                        <FiThumbsUp />
                        </button>
                    )}

                    {liked && (
                        <button
                        className=" text-red-600"
                        onClick={handleToggleLike}
                        >
                        <FiThumbsDown />
                        </button>
                    )}

                    <span className='bg-sky-600 px-2 py-1 rounded-full text-zinc-200 font-medium'>{likes} Likes</span>
                </div>

            </div>
        </section>
    );
};


const Link = ({ heading, imgSrc, subheading, href, linkheading }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
    const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    return (
        <motion.a
            href={href}
            ref={ref}
            onMouseMove={handleMouseMove}
            initial="initial"
            whileHover="whileHover"
            className="group relative flex items-center justify-between border-b-2 border-neutral-700 dark:border-neutral-500 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
        >
            <div>
                <motion.span
                    variants={{
                        initial: { x: 0 },
                        whileHover: { x: -16 },
                    }}
                    transition={{
                        type: "spring",
                        staggerChildren: 0.075,
                        delayChildren: 0.25,
                    }}
                    className="relative z-10 block text-4xl font-bold text-neutral-500 dark:text-indigo-500 transition-colors duration-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-50 md:text-6xl"
                >
                    {heading.split("").map((l, i) => (
                        <motion.span
                            variants={{
                                initial: { x: 0 },
                                whileHover: { x: 16 },
                            }}
                            transition={{ type: "spring" }}
                            className="inline-block"
                            key={i}
                        >
                            {l}
                        </motion.span>
                    ))}
                </motion.span>
                <span className="relative z-10 mt-2 block text-base text-neutral-500 dark:text-slate-400 transition-colors duration-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-50">
                    {subheading}
                </span>
                <span className="relative z-10 mt-2 block text-xs font-serif font-light text-neutral-500 dark:text-slate-400 transition-colors duration-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-50 group-hover:u">
                    {linkheading}
                </span>
            </div>

            <motion.img
                style={{
                    top,
                    left,
                    translateX: "-30%",
                    translateY: "-50%",
                }}
                variants={{
                    initial: { scale: 0, rotate: "-12.5deg" },
                    whileHover: { scale: 1, rotate: "12.5deg" },
                }}
                transition={{ type: "spring" }}
                src={imgSrc}
                className="absolute z-0 h-20 w-28 rounded-lg object-cover md:h-48 md:w-64"
                alt={`Image representing a link for ${heading}`}
            />

            <motion.div
                variants={{
                    initial: {
                        x: "25%",
                        opacity: 0,
                    },
                    whileHover: {
                        x: "0%",
                        opacity: 1,
                    },
                }}
                transition={{ type: "spring" }}
                className="relative z-10 p-4"
            >
                <FiArrowRight className="text-5xl text-slate-600" />
            </motion.div>
        </motion.a>
    );
};