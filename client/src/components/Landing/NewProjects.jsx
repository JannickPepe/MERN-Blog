/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectSectionOne from "../../assets/images/MERN-Projects.webp";
import ProjectSectionTwo from "../../assets/images/FERN-Projects.webp";
import ProjectSectionThree from "../../assets/images/NextJS-Projects.png";
import { Link } from "react-router-dom";


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

const MernContent = () => {
    const [currentState, setCurrentState] = useState(0);

    // Content data for different states
    const contentStates = [
        {
            title: "Advantages of Using the MERN Stack",
            items: [
                {
                    label: "Unified Language:",
                    text: " Using JavaScript for both frontend and backend simplifies development and allows for code reuse.",
                },
                {
                    label: "Strong Community:",
                    text: " Each technology in the MERN stack has a large, active community, providing ample resources and support.",
                },
                {
                    label: "Performance:",
                    text: " NodeJS's non-blocking nature ensures that applications built with the MERN stack can handle high traffic with minimal latency.",
                },
                {
                    label: "Flexibility:",
                    text: " MongoDB's schema-less design and React's component-based architecture offer great flexibility in designing and scaling applications.",
                },
            ],
        },
        {
            title: "Challenges with the MERN Stack",
            items: [
                {
                    label: "Learning Curve:",
                    text: " Understanding the integration of all four technologies can take time for beginners.",
                },
                {
                    label: "Performance Bottlenecks:",
                    text: " Poorly written code or large data operations in MongoDB can impact performance.",
                },
                {
                    label: "Limited Native Tools:",
                    text: " While the MERN stack is flexible, it lacks some native tools found in other stacks.",
                },
                {
                    label: "Scalability:",
                    text: " Scaling NodeJS apps with MongoDB may require extra considerations for distributed systems.",
                },
            ],
        },
        {
            title: "Best Practices for MERN Stack",
            items: [
                {
                    label: "Use TypeScript:",
                    text: " Type safety improves the maintainability and scalability of your applications.",
                },
                {
                    label: "Optimize MongoDB:",
                    text: " Ensure indexes and queries are optimized for large-scale data operations.",
                },
                {
                    label: "Implement Middleware:",
                    text: " Reusable middleware in ExpressJS simplifies server-side logic.",
                },
                {
                    label: "Leverage React Hooks:",
                    text: " Hooks and context API can streamline state management and improve code readability.",
                },
            ],
        },
    ];

    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
            <div className="col-span-1 md:col-span-4">
                <h3 className="text-3xl font-bold mb-4">MERN (MongoDB, ExpressJS, ReactJS and NodeJS) <br /> Projects</h3>
                <Link to={'/projects'} className="group">
                    <span className="border-2 border-sky-800 px-4 py-2 flex justify-center items-center font-semibold max-w-[150px]">
                        See Projects <FiArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </span>
                </Link>
            </div>
            
            <div className="Content-Body col-span-1 md:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center">
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        Scalable
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        Middlewares
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        State Management
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        Event-driven
                    </span>
                </div>

                {/* Dynamic Content with Animations */}
                <motion.div
                    key={currentState} // Trigger re-render on state change
                    className="Content-Change mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="mb-4 text-xl text-neutral-600 md:text-2xl font-bold">
                        {contentStates[currentState].title}
                    </h3>
                    <ul className="text-lg space-y-2">
                        {contentStates[currentState].items.map((item, index) => (
                            <motion.li
                                key={index}
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + index * 0.2, // Stagger delay for each item
                                }}
                            >
                                <span className="underline font-semibold">{item.label}</span>
                                <span>{item.text}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Circle Icons for State Change */}
                <div className="mt-6 flex justify-center space-x-4">
                    {contentStates.map((_, index) => (
                        <button
                            key={index}
                            className={`h-4 w-4 rounded-full border-2 ${
                                currentState === index
                                    ? "bg-sky-900 border-sky-700"
                                    : "bg-neutral-300 border-neutral-500"
                            } transition-colors hover:bg-slate-500`}
                            onClick={() => setCurrentState(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FernContent = () => {
    const [currentState, setCurrentState] = useState(0);

    // Content data for different states
    const contentStates = [
        {
            title: "Advantages of Using the FERN Stack",
            items: [
                {
                    label: "Real-Time Capabilities:",
                    text: " Firebase offers real-time data synchronization, making it ideal for applications that require instant updates and interactions.",
                },
                {
                    label: "Unified Language:",
                    text: " Using JavaScript for both frontend and backend simplifies development and allows for code reuse.",
                },
                {
                    label: "Ease of Setup:",
                    text: " Firebase provides numerous out-of-the-box solutions for authentication, storage, and hosting, reducing the time needed to set up the backend.",
                },
                {
                    label: "Scalability:",
                    text: " Both Firebase and NodeJS are designed to handle large volumes of data and concurrent connections, making them suitable for scalable applications.",
                },
            ],
        },
        {
            title: "Challenges with the FERN Stack",
            items: [
                {
                    label: "Vendor Lock-In:",
                    text: " Firebase ties applications to its ecosystem, making it harder to migrate to other platforms.",
                },
                {
                    label: "Cost Scaling:",
                    text: " Firebase's pricing model can become expensive for high-usage apps.",
                },
                {
                    label: "Custom Logic Limitations:",
                    text: " Firebase's functions are limited compared to custom backend solutions like traditional servers.",
                },
                {
                    label: "Complex Querying:",
                    text: " Firebase's NoSQL structure can make complex queries more challenging to implement compared to traditional SQL databases.",
                },
            ],
        },
        {
            title: "Best Practices for FERN Stack",
            items: [
                {
                    label: "Use Firebase Rules:",
                    text: " To ensure data security and prevent unauthorized access.",
                },
                {
                    label: "Optimize Data Structure:",
                    text: " Design your Firebase database to minimize reads and writes.",
                },
                {
                    label: "Middleware for Logic:",
                    text: " Use ExpressJS middleware for reusable server-side logic.",
                },
                {
                    label: "Leverage React Features:",
                    text: " Use React's hooks and context API for efficient state management.",
                },
            ],
        },
    ];

    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
            <div className="col-span-1 md:col-span-4">
                <h3 className="text-3xl font-bold mb-4">FERN (Firebase, ExpressJS, ReactJS and NodeJS) <br /> Projects</h3>
                <Link to={'/projects'} className="group">
                    <span className="border-2 border-sky-800 px-4 py-2 flex justify-center items-center font-semibold max-w-[150px]">
                        See Projects <FiArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </span>
                </Link>
            </div>

            <div className="Content-Body col-span-1 md:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center">
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        Virtual DOM
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        Middlewares
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        State Management
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        Event-driven
                    </span>
                </div>

                {/* Dynamic Content with Animations */}
                <motion.div
                    key={currentState} // Trigger re-render on state change
                    className="Content-Change mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="mb-4 text-xl text-neutral-600 md:text-2xl font-bold">
                        {contentStates[currentState].title}
                    </h3>
                    <ul className="text-lg space-y-2">
                        {contentStates[currentState].items.map((item, index) => (
                            <motion.li
                                key={index}
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + index * 0.2, // Stagger delay for each item
                                }}
                            >
                                <span className="underline font-semibold">{item.label}</span>
                                <span>{item.text}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

               {/* Circle Icons for State Change */}
                <div className="mt-6 flex justify-center space-x-4">
                    {contentStates.map((_, index) => (
                        <button
                            key={index}
                            className={`h-4 w-4 rounded-full border-2 ${
                                currentState === index
                                    ? "bg-sky-900 border-sky-700"
                                    : "bg-neutral-300 border-neutral-500"
                            } transition-colors hover:bg-slate-500`}
                            onClick={() => setCurrentState(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};


const NextjsContent = () => {
    const [currentState, setCurrentState] = useState(0);

    const contentStates = [
        {
            title: "Advantages of Using the Framework NextJS With Appwrite",
            items: [
                {
                    label: "Server-Side Rendering (SSR):",
                    text: " Next.js provides built-in support for SSR, improving SEO and performance.",
                },
                {
                    label: "Type Safety:",
                    text: " Using TypeScript with Next.js ensures fewer runtime errors and better developer experience.",
                },
                {
                    label: "Built-in API Routes:",
                    text: " Next.js allows you to create API endpoints directly in your application without needing a separate backend setup.",
                },
                {
                    label: "Appwrite Integration:",
                    text: " Seamless integration with Appwrite enables features like authentication, real-time database updates, and file storage.",
                },
            ],
        },
        {
            title: "Challenges with NextJS and Appwrite",
            items: [
                {
                    label: "Learning Curve:",
                    text: " Getting started with both technologies together might be daunting for beginners.",
                },
                {
                    label: "Server Costs:",
                    text: " Hosting Next.js applications with server-side rendering can be more expensive compared to purely static applications.",
                },
                {
                    label: "Appwrite Customization:",
                    text: " Certain features in Appwrite may require custom logic to fit specific use cases.",
                },
                {
                    label: "Migration Complexity:",
                    text: " Migrating data or features to or from Appwrite can be challenging without proper planning.",
                },
            ],
        },
        {
            title: "Best Practices for NextJS and Appwrite",
            items: [
                {
                    label: "Use ISR (Incremental Static Regeneration):",
                    text: " Optimize performance by serving pre-rendered pages with periodic updates.",
                },
                {
                    label: "Leverage Appwrite SDK:",
                    text: " Use the official Appwrite SDK for seamless backend communication.",
                },
                {
                    label: "Separate Concerns:",
                    text: " Keep business logic separate from UI components for maintainable code.",
                },
                {
                    label: "TypeScript Everywhere:",
                    text: " Enforce type safety across the stack for better consistency and error handling.",
                },
            ],
        },
    ];

    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
            <div className="col-span-1 md:col-span-4">
                <h3 className="text-3xl font-bold mb-4">NextJS projects with usage of Appwrite and Neon database</h3>
                <Link to={'/projects'} className="group">
                    <span className="border-2 border-sky-800 px-4 py-2 flex justify-center items-center font-semibold max-w-[150px]">
                        See Projects <FiArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </span>
                </Link>
            </div>

            <div className="Content-Body col-span-1 md:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center">
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        Scaleable
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        Type Safe
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        State Management
                    </span>
                    <span className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full">
                        PostgreSQL
                    </span>
                </div>

                {/* Dynamic Content with Animations */}
                <motion.div
                    key={currentState} // Trigger re-render on state change
                    className="Content-Change mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="mb-4 text-xl text-neutral-600 md:text-2xl font-bold">
                        {contentStates[currentState].title}
                    </h3>
                    <ul className="text-lg space-y-2">
                        {contentStates[currentState].items.map((item, index) => (
                            <motion.li
                                key={index}
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + index * 0.2, // Stagger delay for each item
                                }}
                            >
                                <span className="underline font-semibold">{item.label}</span>
                                <span>{item.text}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Circle Icons for State Change */}
                <div className="mt-6 flex justify-center space-x-4">
                    {contentStates.map((_, index) => (
                        <button
                            key={index}
                            className={`h-4 w-4 rounded-full border-2 ${
                                currentState === index
                                    ? "bg-sky-900 border-sky-700"
                                    : "bg-neutral-300 border-neutral-500"
                            } transition-colors hover:bg-slate-500`}
                            onClick={() => setCurrentState(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};
