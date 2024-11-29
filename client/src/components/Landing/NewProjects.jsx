/* eslint-disable react/prop-types */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectSectionOne from "../../assets/images/MERN-Projects.webp";
import ProjectSectionTwo from "../../assets/images/FERN-Projects.webp";
import ProjectSectionThree from "../../assets/images/NextJS-Projects.png";

export const NewProjects = () => {
    return (
        <div className="bg-white">
            <TextParallaxContent
                imgUrl={ProjectSectionOne}
                subheading="Building"
                heading="Something we grown on."
            >
                <MernContent />
            </TextParallaxContent>
            <TextParallaxContent
                imgUrl={ProjectSectionTwo}
                subheading="Quality"
                heading="Never compromise."
            >
                <FernContent />
            </TextParallaxContent>
            <TextParallaxContent
                imgUrl={ProjectSectionThree}                
                subheading="Impact"
                heading="Modernized environment tools"
            >
                <NextjsContent />
            </TextParallaxContent>
        </div>
    );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
    return (
        <div
            style={{
                paddingLeft: IMG_PADDING,
                paddingRight: IMG_PADDING,
            }}
        >
            <div className="relative h-[150vh]">
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
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: `calc(100vh - ${IMG_PADDING * 2}px)`,
                top: IMG_PADDING,
                scale,
            }}
            ref={targetRef}
            className="sticky z-0 overflow-hidden rounded-3xl"
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

    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
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
            <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
        </motion.div>
    );
};

const MernContent = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
            MERN (MongoDB, ExpressJS, ReactJS and NodeJS) <br/> Projects
        </h2>

        <div className="col-span-1 md:col-span-8">
            <div className="flex gap-4">
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">Scaleable</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">Middlewares</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">State Mangement</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">Event-driven</span>
            </div>
            <h3 className="mb-4 text-xl text-neutral-600 md:text-2xl font-bold">
                Advantages of Using the MERN Stack
            </h3>
            <ul className="text-lg space-y-2">
                <li><span className="underline">Unified Language:</span> Using JavaScript for both frontend and backend simplifies development and allows for code reuse.</li>
                <li><span className="underline">Strong Community:</span> Each technology in the MERN stack has a large, active community, providing ample resources and support.</li>
                <li><span className="underline">Performance:</span> NodeJSs non-blocking nature ensures that applications built with the MERN stack can handle high traffic with minimal latency.</li>
                <li><span className="underline">Flexibility:</span> MongoDBs schema-less design and Reacts component-based architecture offer great flexibility in designing and scaling applications.</li>
            </ul>

            <button className="w-full mt-6 rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                Learn more <FiArrowUpRight className="inline" />
            </button>
        </div>
    </div>
);

const FernContent = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
            FERN (Firebase, ExpressJS, ReactJS and NodeJS) <br/> Projects
        </h2>

        <div className="col-span-1 md:col-span-8">
            <div className="flex gap-4">
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">Virtual DOM</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">Middlewares</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">State Mangement</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">Event-driven</span>
            </div>
            <h3 className="mb-4 text-xl text-neutral-600 md:text-2xl font-bold">
                Advantages of Using the FERN Stack
            </h3>
            <ul className="text-lg space-y-2">
                <li><span className="underline">Real-Time Capabilities:</span> Firebase offers real-time data synchronization, making it ideal for applications that require instant updates and interactions.</li>
                <li><span className="underline">Unified Language:</span> Using JavaScript for both frontend and backend simplifies development and allows for code reuse.</li>
                <li><span className="underline">Ease of Setup:</span> Firebase provides numerous out-of-the-box solutions for authentication, storage, and hosting, reducing the time needed to set up the backend.</li>
                <li><span className="underline">Scalability:</span> Both Firebase and NodeJS are designed to handle large volumes of data and concurrent connections, making them suitable for scalable applications.</li>
            </ul>

            <button className="w-full mt-6 rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                Learn more <FiArrowUpRight className="inline" />
            </button>
        </div>
    </div>
);

const NextjsContent = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
            NextJS projects with usage of Appwrite and Neon database
        </h2>

        <div className="col-span-1 md:col-span-8">
            <div className="flex gap-4">
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">Scaleable</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">Type Safe</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">State Mangement</span>
                <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">PostgreSQL</span>
            </div>
            <h3 className="mb-4 text-xl text-neutral-600 md:text-2xl font-bold">
                Advantages of Using the Framework NextJS
            </h3>
            <div>
                <h4 className="text-xl font-semibold">
                    NextJS and Appwrite (TSX)
                </h4>
                <p>
                    Next.js is a popular React-based framework for building fast, full-stack web applications. 
                    Appwrite is a backend-as-a-service platform that provides a variety of services, including authentication, databases, file storage, and more. 
                    Combining these two technologies allows developers to create powerful and scalable applications with ease.
                </p>
            </div>

            <div className="mt-4">
                <h4 className="text-xl font-semibold">
                    NextJS and Neon (TSX)
                </h4>
                <p>
                    Neon is a serverless PostgreSQL database designed for the cloud. 
                    It offers instant branching making it easy to create isolated environments for development, testing, and staging. 
                    Auto-scaling, and a familiar PostgreSQL interface, making it an excellent choice for modern web applications.
                </p>
            </div>
        

            <button className="w-full mt-6 rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                Learn more <FiArrowUpRight className="inline" />
            </button>
        </div>
    </div>
);