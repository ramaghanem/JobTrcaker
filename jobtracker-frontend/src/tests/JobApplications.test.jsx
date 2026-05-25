import { useState } from "react";

export default function JobApplicationsTest() {
    const [applications, setApplications] = useState([
        {
            id: 1,
            status: "pending",
            location: "Nablus",
            user: { name: "Ali Ahmed", email: "ali@test.com" },
        },
        {
            id: 2,
            status: "accepted",
            location: "Ramallah",
            user: { name: "Sara Ali", email: "sara@test.com" },
        },
    ]);

    const [matchResults, setMatchResults] = useState({});
    const [analyzing, setAnalyzing] = useState(null);

    const handleStatus = (appId, status) => {
        setApplications((prev) =>
            prev.map((a) => (a.id === appId ? { ...a, status } : a))
        );
    };

    const analyzeCV = (appId) => {
        setAnalyzing(appId);

        setTimeout(() => {
            setMatchResults((prev) => ({
                ...prev,
                [appId]: {
                    score: Math.floor(Math.random() * 40 + 60),
                    summary: "Good match for frontend role",
                    strengths: ["React", "HTML", "CSS"],
                    weaknesses: ["Backend experience"],
                },
            }));

            setAnalyzing(null);
        }, 1000);
    };

    const scoreColor = (score) => {
        if (score >= 75) return "text-green-600";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    const scoreBarColor = (score) => {
        if (score >= 75) return "bg-green-500";
        if (score >= 50) return "bg-yellow-400";
        return "bg-red-500";
    };

    return (
        <div className="p-6 font-sans">

            <h2 className="text-xl font-bold mb-4">
                Applications Test Mode
            </h2>

            {applications.map((app) => (
                <div
                    key={app.id}
                    className="border p-4 mb-4 rounded-lg"
                >

                    {/* USER INFO */}
                    <h3 className="font-bold">{app.user.name}</h3>
                    <p className="text-gray-500">{app.user.email}</p>
                    <p>{app.location}</p>
                    <p>Status: {app.status}</p>

                    {/* ACTIONS */}
                    <div className="flex gap-2 mt-2">

                        <button onClick={() => handleStatus(app.id, "accepted")}>
                            Accept
                        </button>

                        <button onClick={() => handleStatus(app.id, "rejected")}>
                            Reject
                        </button>

                        <button onClick={() => analyzeCV(app.id)}>
                            {analyzing === app.id ? "Analyzing..." : "Analyze"}
                        </button>
                    </div>

                    {/* ANALYSIS RESULT */}
                    {matchResults[app.id] && (
                        <div className="mt-3 p-3 bg-gray-100 rounded">

                            <p className={scoreColor(matchResults[app.id].score)}>
                                Score: {matchResults[app.id].score}
                            </p>

                            <div className="w-full bg-gray-300 h-2 mt-2">
                                <div
                                    className={scoreBarColor(matchResults[app.id].score)}
                                    style={{
                                        width: `${matchResults[app.id].score}%`,
                                        height: "100%",
                                    }}
                                />
                            </div>

                            <p className="mt-2">
                                {matchResults[app.id].summary}
                            </p>

                            <p className="text-green-600 mt-2">
                                Strengths: {matchResults[app.id].strengths.join(", ")}
                            </p>

                            <p className="text-red-500">
                                Weaknesses: {matchResults[app.id].weaknesses.join(", ")}
                            </p>

                        </div>
                    )}

                </div>
            ))}

        </div>
    );
}