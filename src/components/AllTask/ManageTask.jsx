import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/authProvider";
import AddTask from "./Addtask/AddTask";
import ToGether from "./ToGether/ToGether";

const ManageTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/register");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Add Task Section */}
            <div className="mb-6">
                <AddTask />
            </div>

            {/* Task Lists */}
            <ToGether />
        </div>
    );
};

export default ManageTask;
