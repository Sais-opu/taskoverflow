import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/authProvider";
import AddTask from "./Addtask/AddTask";
import InProgress from "./InProgress.jsx/InProgress";
import Done from "./Done/Done";
import ToDo from "./ToDo/ToDo";

const ManageTask = () => {
    const { user } = useContext(AuthContext); // Get user from context
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/register"); // Redirect if not logged in
        }
    }, [user, navigate]);

    if (!user) return null; // Prevent UI from rendering before redirect

    return (
        <div className="grid gap-6 px-4 md:px-8 lg:px-12 grid-cols-1 lg:grid-cols-2">
            {/* Left: Add Task Form */}
            <div>
                <AddTask />
            </div>

            {/* Right: Task Columns (ToDo, InProgress, Done) */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <ToDo />
                <InProgress />
                <Done />
            </div>
        </div>
    );
};

export default ManageTask;
