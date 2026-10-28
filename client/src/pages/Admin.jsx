import { useEffect, useState } from "react";

function Admin() {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        users: 0,
        items: 0,
        sold: 0
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`
        };

        fetch("http://localhost:5000/api/admin/stats", {
            headers
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && typeof data === "object") {
                    setStats(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        fetch("http://localhost:5000/api/admin/user-activity", {
            headers
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.log("Admin activity error:", data);
                    setUsers([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setUsers([]);
            });
    }, [token]);

    return (
        <div className="admin-page">

            <div className="admin-header">

                <p className="section-label">
                    ADMINISTRATION
                </p>

                <h1>Admin Dashboard</h1>

                <p>
                    Monitor users, listings and marketplace activity.
                </p>

            </div>


            <div className="admin-stats">

                <div className="admin-stat">

                    <span>👥</span>

                    <div>
                        <strong>{stats.users}</strong>
                        <p>Total Users</p>
                    </div>

                </div>


                <div className="admin-stat">

                    <span>📦</span>

                    <div>
                        <strong>{stats.items}</strong>
                        <p>Total Items</p>
                    </div>

                </div>


                <div className="admin-stat">

                    <span>✓</span>

                    <div>
                        <strong>{stats.sold}</strong>
                        <p>Items Sold</p>
                    </div>

                </div>

            </div>


            <div className="admin-activity">

                <div className="admin-section-heading">

                    <div>

                        <p className="section-label">
                            MARKETPLACE ACTIVITY
                        </p>

                        <h2>User Activity</h2>

                    </div>

                    <span>
                        {users.length} students
                    </span>

                </div>


                <div className="admin-user-activity">

                    {users.length === 0 ? (

                        <div className="admin-empty">
                            <span>👥</span>
                            <h3>No user activity yet</h3>
                            <p>
                                User listings and purchases will appear here.
                            </p>
                        </div>

                    ) : (

                        users.map((entry) => (

                            <div
                                className="admin-user-card"
                                key={entry.user._id}
                            >

                                <div className="admin-user-info">

                                    <div className="admin-user-avatar">

                                        {entry.user.name
                                            ?.charAt(0)
                                            .toUpperCase()}

                                    </div>


                                    <div>

                                        <h3>
                                            {entry.user.name}
                                        </h3>

                                        <p>
                                            {entry.user.email}
                                        </p>

                                        <span>
                                            {entry.user.department ||
                                                "Student"}
                                        </span>

                                    </div>

                                </div>


                                <div className="admin-activity-grid">


                                    {/* LISTED ITEMS */}

                                    <div className="admin-activity-section">

                                        <div className="activity-title">

                                            <h4>
                                                📦 Listed Items
                                            </h4>

                                            <span>
                                                {entry.listedItems.length}
                                            </span>

                                        </div>


                                        {entry.listedItems.length === 0 ? (

                                            <p className="no-activity">
                                                No items listed
                                            </p>

                                        ) : (

                                            <div className="activity-items">

                                                {entry.listedItems.map(
                                                    (item) => (

                                                        <div
                                                            className="activity-item"
                                                            key={item._id}
                                                        >

                                                            <div>

                                                                <strong>
                                                                    {item.name}
                                                                </strong>

                                                                <p>
                                                                    {item.type}
                                                                </p>

                                                            </div>


                                                            <div className="activity-item-right">

                                                                <strong>
                                                                    {item.price > 0
                                                                        ? `₹${item.price}`
                                                                        : "Free"}
                                                                </strong>


                                                                <span
                                                                    className={
                                                                        `activity-status ${item.status?.toLowerCase()}`
                                                                    }
                                                                >
                                                                    {item.status}
                                                                </span>

                                                            </div>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        )}

                                    </div>


                                    {/* BOUGHT ITEMS */}

                                    <div className="admin-activity-section">

                                        <div className="activity-title">

                                            <h4>
                                                🛍️ Items Bought
                                            </h4>

                                            <span>
                                                {entry.boughtItems.length}
                                            </span>

                                        </div>


                                        {entry.boughtItems.length === 0 ? (

                                            <p className="no-activity">
                                                No purchases
                                            </p>

                                        ) : (

                                            <div className="activity-items">

                                                {entry.boughtItems.map(
                                                    (purchase) => (

                                                        <div
                                                            className="activity-item"
                                                            key={purchase._id}
                                                        >

                                                            <div>

                                                                <strong>
                                                                    {purchase.item?.name}
                                                                </strong>

                                                                <p>
                                                                    Seller:{" "}
                                                                    {purchase.seller?.name}
                                                                </p>

                                                            </div>


                                                            <div className="activity-item-right">

                                                                <strong>
                                                                    {purchase.item?.price > 0
                                                                        ? `₹${purchase.item.price}`
                                                                        : "Free"}
                                                                </strong>


                                                                <span className="activity-status purchased">
                                                                    Purchased ✓
                                                                </span>

                                                            </div>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default Admin;