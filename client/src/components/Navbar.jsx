import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    if (token && user?.role === "admin") {
        return (
            <nav>
                <h2>Campus Resource Hub</h2>

                <div>
                    <Link to="/admin">Dashboard</Link>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        );
    }

    return (
        <nav>
            <h2>Campus Resource Hub</h2>

            <div>
                <Link to="/">Home</Link>

                {token ? (
                    <>
                        <Link to="/items">Explore</Link>
                        <Link to="/add-item">List Item</Link>
                        <Link to="/profile">Profile</Link>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;