import React, { useEffect, useState } from "react";

const Tester = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://task-management-server-weld.vercel.app/alldata")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((result) => {
                console.log("Fetched Data:", result); // Debugging log
                if (result.length > 0) {
                    setData(result[0]); // Since there's only one data entry
                }
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Tester Collection Data</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {data && !error && (
                <div className="border p-3 rounded-lg shadow-sm ">
                    <p><strong>ID:</strong> {data._id}</p>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Description:</strong> {data.description}</p>
                    <p><strong>Age:</strong> {data.age}</p>
                </div>
            )}
        </div>
    );
};

export default Tester;
