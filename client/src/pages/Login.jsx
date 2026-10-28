import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "http://localhost:5000/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

       if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful!");

    if (data.user.role === "admin") {
        navigate("/admin");
    } else {
        navigate("/");
    }
} else {
            alert(data.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">

                <h1>Welcome Back</h1>

                <p>Login to your campus exchange account.</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="College Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;