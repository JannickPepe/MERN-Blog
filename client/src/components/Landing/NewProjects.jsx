/* eslint-disable react/prop-types */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectSectionOne from "../../assets/images/MERN-Projects.webp";
import ProjectSectionTwo from "../../assets/images/FERN-Projects.webp";
import ProjectSectionThree from "../../assets/images/NextJS-Projects.png";
import FernContentSection from "./FernContentSection";
import MernContentSection from "./MernContentSection";
import NextjsContentSection from "./NextjsContentSection";


export const NewProjects = () => {

    return (
        <section className="pt-14 md:pt-28">
            <div className="text-center pb-6 md:pb-10">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                    Exciting <span className="text-sky-600 dark:text-indigo-500">Real Life</span> Projects 
                </h2>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold mt-3">Our projects ranges from React, to Anglular and C# in fullstack environment.</p>
                <p className="text-xl text-zinc-600 dark:text-slate-400 font-semibold">With Github and Live Server Link</p>
            </div>

            <TextParallaxContent
                imgUrl={ProjectSectionOne}
                subheading="Building"
                heading="Something we grown on."
            >
                <MernContentSection />
            </TextParallaxContent>
            <TextParallaxContent
                imgUrl={ProjectSectionTwo}
                subheading="Quality"
                heading="Never compromise."
            >
                <FernContentSection />
            </TextParallaxContent>
            <TextParallaxContent
                imgUrl={ProjectSectionThree}                
                subheading="Impact"
                heading="Modernized environment tools"
            >
                <NextjsContentSection />
            </TextParallaxContent>
        </section>
    );
};

const IMG_PADDING = 20;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
    return (
        <div
            style={{
                paddingLeft: IMG_PADDING,
                paddingRight: IMG_PADDING,
            }}
        >
            <div className="relative h-[80vh] md:h-[100vh]">
                <StickyImage imgUrl={imgUrl} />
                <OverlayCopy heading={heading} subheading={subheading} />
            </div>
            {children}
        </div>
    );
};

const StickyImage = ({ imgUrl }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <motion.div
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "",
                backgroundPosition: "",
                height: `calc(90vh - ${IMG_PADDING * 2}px)`,
                top: IMG_PADDING,
                scale,
            }}
            ref={targetRef}
            className="sticky z-0 max-h-[60vh] md:max-h-none overflow-hidden rounded-3xl"
        >
            <motion.div
                className="absolute inset-0 bg-neutral-950/70"
                style={{
                opacity,
                }}
            />
        </motion.div>
    );
};

const OverlayCopy = ({ subheading, heading }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [280, -250]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

    return (
        <motion.div
            style={{
                y,
                opacity,
            }}
            ref={targetRef}
            className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
        >
            <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
                {subheading}
            </p>
            <p className="text-center text-4xl font-bold md:text-7xl px-2 md:px-0">{heading}</p>
        </motion.div>
    );
};
