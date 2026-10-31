import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const college = localStorage.getItem("selectedCollege");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        department: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "http://https://campus-resource-hub-api.onrender.com/api/users/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    college
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("Account created successfully!");
            navigate("/login");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <p className="section-label">CREATE ACCOUNT</p>

                <h1>Join Your Campus</h1>

                <p>
                    {college}
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="College Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="department"
                        placeholder="Department"
                        value={form.department}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Create Account →
                    </button>
                </form>

                <button
                    className="back-link"
                    onClick={() => navigate("/auth")}
                >
                    ← Back
                </button>
            </div>
        </div>
    );
}

export default Signup;