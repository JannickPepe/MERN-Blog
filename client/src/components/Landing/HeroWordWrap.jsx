import { motion } from "framer-motion";

export const HeroWordWrap = () => {
    return (
        <div className="">
            <h1 className="max-w-2xl text-center text-5xl ">
                The NighteCoding{" "}
                <span className="relative">
                    Community!
                    <svg
                        viewBox="0 0 286 73"
                        fill="none"
                        className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
                    >
                        <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{
                                duration: 1.25,
                                ease: "easeInOut",
                            }}
                            d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                            stroke="#0694a2"
                            strokeWidth="3"
                        />
                    </svg>
                </span>
            </h1>
            <p className="text-stone-600 dark:text-zinc-400 text-sm md:text-base text-center max-w-xl mx-auto my-6">
                A <span className="font-semibold underline">community</span> for every person in tech and programming - <span className="font-semibold underline">no matter</span> the skillset. <br/>
                Newsletters and blogs will be available for all!
            </p>
        </div>
    );
};