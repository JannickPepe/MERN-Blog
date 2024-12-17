/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiX } from "react-icons/fi";

export const NotificationContext = createContext();

// Time to live for each notification: 5 seconds
const NOTIFICATION_TTL = 5000;

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    // showNotification function to be used anywhere in the app
    const showNotification = (text) => {
        const newNotif = {
        id: Math.random(),
        text,
        };
        setNotifications((prev) => [...prev, newNotif]);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
        removeNotification(newNotif.id);
        }, NOTIFICATION_TTL);
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
        {children}
        <div className="fixed z-50 bottom-4 right-4 space-y-2 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        {...notification}
                        removeNotif={removeNotification}
                    />
                ))}
            </AnimatePresence>
        </div>
        </NotificationContext.Provider>
    );
}

const Notification = ({ text, id, removeNotif }) => {
    return (
        <motion.div
            layout
            initial={{ y: 15, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -25, scale: 0.9, opacity: 0 }}
            transition={{ type: "spring" }}
            className="p-4 w-80 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg text-white bg-teal-600 pointer-events-auto relative"
            style={{ cursor: "pointer" }}
            onClick={() => removeNotif(id)}
        >
            <FiAlertCircle className="text-3xl absolute -top-4 -left-4 p-2 rounded-full bg-white text-teal-600 shadow" />
            <span>{text}</span>
            <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
                <FiX />
            </button>
        </motion.div>
    );
};
