/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import OAuth from "./OAuth";
import nighteCodingLogo from '../../assets/logo/nighteCoding-logo.png';
import { NotificationContext } from "../NotificationContext";


export const RegisterTemp = () => {
    return (
        <div className="dark:bg-zinc-950 py-4 md:py-10 text-zinc-200 selection:bg-zinc-600">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1.25,
                    ease: "easeInOut",
                }}
                className="relative z-10 mx-auto w-full max-w-xl p-4"
            >
                <Heading />
                <OAuth />
                <Or />
                <Email />
            </motion.div>

            <CornerGrid />
        </div>
    );
};

const Heading = () => (
    <div>
        <Link to='/' className='flex items-center font-semibold dark:text-white group gap-1' >
            <img 
                src={nighteCodingLogo} 
                alt={'NighteCoding Logo'} 
                className='h-14 md:h-16 lg:h-20 w-14 md:w-16 lg:w-20 group-hover:scale-110 transition-transform' 
            />
            <span className='text-xl font-bold text-black dark:text-white'>NighteCoding</span>
        </Link>

        <div className="mb-9 mt-6 space-y-1.5">
            <h1 className="text-2xl font-semibold text-black dark:text-white">Create an account</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
                Dont have an account?{" "}
                <Link to='/sign-up' className='text-blue-500'>
                    Sign Up
                </Link>
            </p>
        </div>
    </div>
);



const Or = () => {
    return (
        <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] w-full bg-zinc-700" />
            <span className="text-zinc-400">OR</span>
            <div className="h-[1px] w-full bg-zinc-700" />
        </div>
    );
};

const Email = () => {

    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
        return setErrorMessage('Please fill out all fields.');
        }
        try {
        setLoading(true);
        setErrorMessage(null);
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
            return setErrorMessage(data.message);
        }
        setLoading(false);
        if(res.ok) {
            showNotification("User Made!");
            navigate('/sign-in');
        }
        } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="user-input" className="mb-1.5 block text-zinc-400">
                        Username
                    </label>
                    <input
                        onChange={handleChange}
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email-input" className="mb-1.5 block text-zinc-400">
                        Email
                    </label>
                    <input
                        onChange={handleChange}
                        id="email"
                        type="email"
                        placeholder="your.email@provider.com"
                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                    />
                </div>

                <div className="mb-6">
                    <div className="mb-1.5 flex items-end justify-between">
                        <label htmlFor="password-input" className="block text-zinc-400">
                            Password
                        </label>
                    </div>
                    <input
                        type='password'
                        placeholder='**********'
                        id='password'
                        onChange={handleChange}
                        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                    />
                </div>

                <SplashButton type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner size='sm' />
                            <span className='pl-3'>Loading...</span>
                        </>
                    ) : (
                        'Sign In'
                    )}
                    
                </SplashButton>

                {errorMessage && (
                    <Alert className='mt-5' color='failure'>
                        {errorMessage}
                    </Alert>
                )}
            </form>

        </div>
    
    );
};

const SplashButton = ({ children, className, ...rest }) => {
    return (
        <button
            className={twMerge(
                "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
};


const CornerGrid = () => {
    return (
        <div
        style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
        className="absolute right-0 top-0 z-0 size-[50vw]"
        >
        <div
            style={{
            backgroundImage:
                "radial-gradient(100% 100% at 100% 0%, rgba(9,9,11,0), rgba(9,9,11,1))",
            }}
            className="absolute inset-0"
        />
        </div>
    );
};

