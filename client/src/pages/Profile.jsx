import { useEffect, useState } from "react";

function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [myItems, setMyItems] = useState([]);
    const [buyerRequests, setBuyerRequests] = useState([]);
    const [sellerRequests, setSellerRequests] = useState([]);

    const loadData = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const itemsResponse = await fetch(
                "http://localhost:5000/api/items/mine",
                { headers }
            );

            const itemsData = await itemsResponse.json();

            const buyerResponse = await fetch(
                "http://localhost:5000/api/requests/buyer",
                { headers }
            );

            const buyerData = await buyerResponse.json();

            const sellerResponse = await fetch(
                "http://localhost:5000/api/requests/seller",
                { headers }
            );

            const sellerData = await sellerResponse.json();

            setMyItems(itemsData);
            setBuyerRequests(buyerData);
            setSellerRequests(sellerData);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAccept = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/requests/${id}/accept`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Request accepted!");
                loadData();
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/requests/${id}/reject`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Request rejected!");
                loadData();
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const boughtItems = buyerRequests.filter(
        (request) => request.status === "Accepted"
    );

    const pendingRequests = sellerRequests.filter(
        (request) => request.status === "Pending"
    );

    return (
        <div className="profile-page">

            <div className="profile-header">
                <div className="profile-avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="section-label">
                        STUDENT PROFILE
                    </p>

                    <h1>{user?.name}</h1>

                    <p>{user?.email}</p>

                    <span>
                        {user?.department || "Student"}
                    </span>
                </div>
            </div>


            <div className="profile-stats">

                <div>
                    <strong>{myItems.length}</strong>
                    <span>My Listings</span>
                </div>

                <div>
                    <strong>{boughtItems.length}</strong>
                    <span>Items Bought</span>
                </div>

                <div>
                    <strong>{pendingRequests.length}</strong>
                    <span>Pending Requests</span>
                </div>

            </div>


            <section className="profile-section">

                <div className="profile-section-heading">
                    <div>
                        <p className="section-label">
                            YOUR ITEMS
                        </p>

                        <h2>My Listings</h2>
                    </div>
                </div>

                {myItems.length === 0 ? (
                    <div className="profile-empty">
                        <span>📦</span>
                        <h3>No listings yet</h3>
                        <p>
                            Items you list will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="profile-items">

                        {myItems.map((item) => (

                            <div
                                className="profile-item"
                                key={item._id}
                            >

                                <div className="profile-item-icon">
                                    📦
                                </div>

                                <div className="profile-item-info">

                                    <span className="item-type">
                                        {item.type}
                                    </span>

                                    <h3>{item.name}</h3>

                                    <p>
                                        {item.description}
                                    </p>

                                </div>

                                <div className="profile-item-status">

    <strong>
        {item.price > 0
            ? `₹${item.price}`
            : "Free"}
    </strong>

    <span
        className={
            `status ${item.status?.toLowerCase()}`
        }
    >
        {item.status}
    </span>

    {item.status === "Available" && (
        <button
            className="update-button"
            onClick={() =>
                window.location.href =
                `/items/${item._id}/edit`
            }
        >
            Update
        </button>
    )}

</div>

                            </div>

                        ))}

                    </div>
                )}

            </section>


            <section className="profile-section">

                <div className="profile-section-heading">

                    <div>
                        <p className="section-label">
                            INCOMING
                        </p>

                        <h2>Requests for Your Items</h2>
                    </div>

                    <span>
                        {pendingRequests.length} pending
                    </span>

                </div>

                {pendingRequests.length === 0 ? (
                    <div className="profile-empty">
                        <span>📨</span>
                        <h3>No pending requests</h3>
                        <p>
                            Requests from other students will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="request-list">

                        {pendingRequests.map((request) => (

                            <div
                                className="request-card"
                                key={request._id}
                            >

                                <div className="request-icon">
                                    📦
                                </div>

                                <div className="request-info">

                                    <h3>
                                        {request.item?.name}
                                    </h3>

                                    <p>
                                        Requested by{" "}
                                        <strong>
                                            {request.buyer?.name}
                                        </strong>
                                    </p>

                                    <span>
                                        {request.buyer?.email}
                                    </span>

                                </div>

                                <div className="request-actions">

                                    <button
                                        className="accept-button"
                                        onClick={() =>
                                            handleAccept(request._id)
                                        }
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="reject-button"
                                        onClick={() =>
                                            handleReject(request._id)
                                        }
                                    >
                                        Reject
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </section>


            <section className="profile-section">

                <div className="profile-section-heading">

                    <div>
                        <p className="section-label">
                            PURCHASE HISTORY
                        </p>

                        <h2>Items Bought</h2>
                    </div>

                </div>

                {boughtItems.length === 0 ? (
                    <div className="profile-empty">
                        <span>🛍️</span>
                        <h3>No purchases yet</h3>
                        <p>
                            Items you successfully request will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="profile-items">

                        {boughtItems.map((request) => (

                            <div
                                className="profile-item"
                                key={request._id}
                            >

                                <div className="profile-item-icon">
                                    🛍️
                                </div>

                                <div className="profile-item-info">

                                    <span className="item-type">
                                        Purchased
                                    </span>

                                    <h3>
                                        {request.item?.name}
                                    </h3>

                                    <p>
                                        Seller:{" "}
                                        {request.seller?.name}
                                    </p>

                                </div>

                                <div className="profile-item-status">

                                    <strong>
                                        {request.item?.price > 0
                                            ? `₹${request.item.price}`
                                            : "Free"}
                                    </strong>

                                    <span className="status sold">
                                        Purchased ✓
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </section>

        </div>
    );
}

export default Profile;