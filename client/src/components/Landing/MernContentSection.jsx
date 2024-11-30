import { useState } from "react";
import { mernContentStates } from "../../utils/contenStates";
import { motion } from 'framer-motion';
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import BadgeGrid from "../GlobalBadge";


const MernContentSection = () => {
    const [currentState, setCurrentState] = useState(0);
    const badges = ["Scaleable", "Middlewares", "Redux", "Event-driven"];

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
                <BadgeGrid items={badges} />

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
                        {mernContentStates[currentState].title}
                    </h3>
                    
                    <ul className="text-lg space-y-2">
                        {mernContentStates[currentState].items.map((item, index) => (
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
                    {mernContentStates.map((_, index) => (
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

export default MernContentSection;