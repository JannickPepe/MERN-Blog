/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import article1 from "../../assets/images/FERN-Projects.webp";
import article2 from "../../assets/images/MERN-Projects.webp";
import article3 from "../../assets/images/NextJS-Projects.png";
import article4 from "../../assets/images/Projects-Community.webp";

export const Articles = () => {
    return (
        <section className="py-16 max-w-5xl mx-auto">
            <div className="text-center pb-10">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                    NighteCoding&apos;s exciting <span className="text-sky-600 dark:text-indigo-500">Articles</span>
                </h2>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold mt-3">Our articles are a perfect match for an evening coffee</p>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold">With redirect link to the article</p>
            </div>

            <div className="mx-auto px-6 md:px-0">
                <Link
                    heading="ReactJS"
                    subheading="Read about FERM implementation"
                    imgSrc={article1}
                    href='#'
                />
                <Link
                    heading="NextJS"
                    subheading="NextJS with either Appwrite or Neon"
                    imgSrc={article3}
                    href='#'
                />
                <Link
                    heading="NodeJS"
                    subheading="Read about NodeJS in MERN"
                    imgSrc={article2}
                    href='#'
                />
                <Link
                    heading="Tech"
                    subheading="The newest trends in 2025"
                    imgSrc={article4}
                    href='#'
                />
            </div>
        </section>
    );
};

const Link = ({ heading, imgSrc, subheading, href }) => {
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
            </div>

            <motion.img
                style={{
                    top,
                    left,
                    translateX: "-50%",
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
                <FiArrowRight className="text-5xl text-neutral-50" />
            </motion.div>
        </motion.a>
    );
};