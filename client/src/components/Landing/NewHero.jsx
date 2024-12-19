/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import LandingCTA from "./LandingCTA";
import { HeroWordWrap } from "./HeroWordWrap";

const NewHero = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    return (
        <section ref={targetRef} className="h-[250vh]">
            <div className="h-[92vh] sticky top-0 z-0 grid grid-cols-3 grid-rows-3 gap-4 p-4 overflow-hidden">
                <Copy scrollYProgress={scrollYProgress} />
                <Images scrollYProgress={scrollYProgress} />
                <Circles />
            </div>
        </section>
    );
};



const Copy = ({ scrollYProgress }) => {
    const copyScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const copyY = useTransform(scrollYProgress, [0, 0.75], ["0%", "7.5%"]);

    return (
        <motion.div
            style={{
                scale: copyScale,
                opacity: copyOpacity,
                y: copyY,
            }}
            className="absolute px-8 w-full h-[92vh] z-20 flex flex-col items-center justify-center"
        >
            <HeroWordWrap />
            <LandingCTA />
        </motion.div>
    );
};

const Images = ({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

    const offsets = [
        { x: useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]), y: useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]) },
        { x: useTransform(scrollYProgress, [0, 1], ["30%", "0%"]), y: useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]) },
        { x: useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]), y: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]) },
        { x: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]), y: useTransform(scrollYProgress, [0, 1], ["-145%", "0%"]) },
        { x: useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]), y: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]) },
        { x: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]), y: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]) },
    ];

    const imageUrls = [
        "https://ilearnengineering.com/wp-content/uploads/2023/05/Screenshot-2023-05-23-at-18.45.53-1024x455.png",
        "https://www.21kschool.com/lk/wp-content/uploads/sites/24/2023/07/Coding.png",
        "https://www.edology.com/uploads/media/sulu-700x450/00/1720-blog-why-coding-is-so-important-for-IT-jobs-s.jpg?v=2-0",
        "https://xclcamps.com/wp-content/uploads/coding-difference-1.jpg",
        "https://blog-media.byjusfutureschool.com/bfs-blog/2022/08/03035002/Article-Image-945%C3%97498.jpg",
        "https://www.phoenix.edu/content/dam/edu/blog/2023/08/blog-hero-what-is-coding.png",
    ];

    const spans = [
        "col-span-2",
        "row-span-2",
        "row-span-2",
        "",
        "",
        "",
    ];

    return (
        <>
            {imageUrls.map((url, index) => (
                <motion.div
                    key={index}
                    className={`relative z-10 rounded-lg ${spans[index]}`}
                    style={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        scale,
                        x: offsets[index].x,
                        y: offsets[index].y,
                    }}
                    initial={{ opacity: 0 }} // Start invisible
                    animate={{ opacity: 1 }} // Fade in
                    transition={{
                        delay: 0.4 + index * 0.2, // Dynamic delay for each image
                        duration: 0.6, // Smooth fade duration
                        ease: "easeOut", // Smooth easing
                    }}
                />
            ))}
        </>
    );
};

const Circles = () => (
    <>
        <div className="w-3/5 max-w-[850px] min-w-[400px] aspect-square border-[8px] border-slate-300 dark:border-slate-200 rounded-full absolute z-0 left-0 top-0 -translate-x-[50%] -translate-y-[50%]" />
        <div className="w-1/2 max-w-[600px] min-w-[300px] aspect-square border-[8px] border-slate-300 dark:border-slate-200 rounded-full absolute z-0 right-0 bottom-0 translate-x-[50%] translate-y-[50%]" />
    </>
);

export default NewHero;