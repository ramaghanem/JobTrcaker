import { useState } from "react";

export default function EditJobTest() {
    const [form, setForm] = useState({
        title: "Frontend Developer",
        description: "Test job description",
        location: "Nablus",
        salary: "1000",
        employment_type: "full-time",
        status: "open",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("UPDATED JOB:", form);
        setMessage(" Job updated successfully (TEST MODE)");
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2> Edit Job - TEST MODE</h2>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>

                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                />

                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                />

                <input
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                />

                <select
                    name="employment_type"
                    value={form.employment_type}
                    onChange={handleChange}
                >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="remote">Remote</option>
                </select>

                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>

                <button type="submit">Update (Test)</button>
            </form>

            {message && (
                <p style={{ color: "green", marginTop: "10px" }}>
                    {message}
                </p>
            )}
        </div>
    );
}