/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import LandingCTA from "./LandingCTA";

const NewHero = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    return (
        <section ref={targetRef} className="h-[350vh]">
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
            <h1 className="text-stone-950 dark:text-zinc-300 text-5xl md:text-7xl font-bold text-center max-w-xl">
                The NighteCoding Community!
            </h1>
            <p className="text-stone-600 dark:text-zinc-400 text-sm md:text-base text-center max-w-xl my-6">
                A community for every person in tech and programming - no matter the skillset. <br/>
                Newsletters and blogs will be available for all!
            </p>
    
            <LandingCTA />
        </motion.div>
    );
};

const Images = ({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

    const image1Offset = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

    const image2OffsetX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
    const image2OffsetY = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

    const image3OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
    const image3OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

    const image4OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
    const image4OffsetY = useTransform(scrollYProgress, [0, 1], ["-145%", "0%"]);

    const image5OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
    const image5OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

    const image6OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
    const image6OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

    return (
        <>
            <motion.div
                className="col-span-2 relative z-10 rounded-lg"
                style={{
                backgroundImage:
                    "url(https://ilearnengineering.com/wp-content/uploads/2023/05/Screenshot-2023-05-23-at-18.45.53-1024x455.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                scale,
                x: image1Offset,
                y: image1Offset,
                scrollBehavior: "smooth"
                }}
            />
            <motion.div
                className="row-span-2 relative z-10 rounded-lg"
                style={{
                backgroundImage:
                    "url(https://www.21kschool.com/lk/wp-content/uploads/sites/24/2023/07/Coding.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                scale,
                x: image2OffsetX,
                y: image2OffsetY,
                scrollBehavior: "smooth"
                }}
            />

            <motion.div
                className="row-span-2 relative z-10 rounded-lg"
                style={{
                backgroundImage:
                    "url(https://www.edology.com/uploads/media/sulu-700x450/00/1720-blog-why-coding-is-so-important-for-IT-jobs-s.jpg?v=2-0)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                scale,
                x: image3OffsetX,
                y: image3OffsetY,
                scrollBehavior: "smooth"
                }}
            />
            <motion.div
                className="relative z-10 rounded-lg"
                style={{
                backgroundImage:
                    "url(https://xclcamps.com/wp-content/uploads/coding-difference-1.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                scale,
                x: image4OffsetX,
                y: image4OffsetY,
                scrollBehavior: "smooth"
                }}
            />

            <motion.div
                className="relative z-10 rounded-lg"
                style={{
                backgroundImage:
                    "url(https://blog-media.byjusfutureschool.com/bfs-blog/2022/08/03035002/Article-Image-945%C3%97498.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                scale,
                x: image5OffsetX,
                y: image5OffsetY,
                scrollBehavior: "smooth"
                }}
            />
            <motion.div
                className="relative z-10 rounded-lg"
                style={{
                backgroundImage:
                    "url(https://www.phoenix.edu/content/dam/edu/blog/2023/08/blog-hero-what-is-coding.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                scale,
                x: image6OffsetX,
                y: image6OffsetY,
                scrollBehavior: "smooth"
                }}
            />
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