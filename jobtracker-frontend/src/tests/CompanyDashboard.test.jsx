import { useState } from "react";
import { Link } from "react-router-dom";

export default function CompanyDashboardTest() {
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Frontend Developer",
            location: "Nablus",
            salary: "1200",
            status: "open",
        },
        {
            id: 2,
            title: "Backend Developer",
            location: "Ramallah",
            salary: "1500",
            status: "closed",
        },
    ]);

    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = () => {
        setJobs(jobs.filter((j) => j.id !== deleteId));
        setDeleteId(null);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* NAVBAR MOCK */}
            <div className="p-4 border-b">Navbar (Test)</div>

            {/* DELETE MODAL */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl">
                        <p>Delete this job?</p>

                        <button onClick={() => setDeleteId(null)}>
                            Cancel
                        </button>

                        <button onClick={handleDelete} className="text-red-500">
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Company Dashboard (TEST)</h2>

                <Link to="/jobs/create" className="text-blue-500">
                    + Post Job
                </Link>
            </div>

            {/* CONTENT */}
            <div className="p-6">

                {jobs.length === 0 ? (
                    <p>No jobs found</p>
                ) : (
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id} className="border-t">
                                    <td>{job.title}</td>
                                    <td>{job.location}</td>
                                    <td>{job.salary}</td>
                                    <td>{job.status}</td>

                                    <td>
                                        <Link to={`/jobs/${job.id}/edit`}>
                                            Edit
                                        </Link>

                                        <button onClick={() => setDeleteId(job.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>

        </div>
    );
}