import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [auth]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Welcome to TaskOverFlow
            </h1>
            <p className="text-gray-600 mb-6 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed">
                Stay organized and boost your productivity with our powerful Task Management
                Application. Effortlessly create, edit, and reorder your tasks with a simple
                drag-and-drop interface. Keep track of your progress by categorizing tasks into
                "To-Do," "In Progress," and "Done." Your changes are saved in real-time, ensuring
                you never lose track of important work. Whether you're managing personal projects
                or collaborating with a team, our user-friendly platform makes it easy to stay on
                top of your tasks.
            </p>

            {/* Show buttons only if user is NOT logged in */}
            {!user && (
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <Link to="/register">
                        <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-gray-700 transition">
                            Register
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-gray-700 transition">
                            Login
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
