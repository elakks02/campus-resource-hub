import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [requesting, setRequesting] = useState(false);
    const [requested, setRequested] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`http://localhost:5000/api/items/${id}`)
            .then((response) => response.json())
            .then((data) => setItem(data))
            .catch((error) => console.log(error));
    }, [id]);

    const handleRequest = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        setRequesting(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/requests",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        itemId: id
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Request sent successfully!");
                setRequested(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Could not connect to server");
        }

        setRequesting(false);
    };

    const handleRemove = async () => {
        const confirmRemove = window.confirm(
            "Are you sure you want to remove this item?"
        );

        if (!confirmRemove) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/items/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Item removed successfully!");
                navigate("/items");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Could not connect to server");
        }
    };

    if (!item) {
        return <div className="loading">Loading item...</div>;
    }

    const isSeller =
        user &&
        item.seller &&
        String(item.seller) === String(user.id);

    return (
        <div className="item-details-page">

            <button
                className="back-button"
                onClick={() => navigate("/items")}
            >
                ← Back to Items
            </button>

            <div className="item-details-card">

                <div className="item-details-image">
                    📦
                </div>

                <div className="item-details-content">

                    <span className="item-type">
                        {item.type}
                    </span>

                    <h1>{item.name}</h1>

                    <p className="item-details-description">
                        {item.description}
                    </p>

                    <div className="details-grid">

                        <div>
                            <span>Category</span>
                            <strong>{item.category}</strong>
                        </div>

                        <div>
                            <span>Condition</span>
                            <strong>{item.condition}</strong>
                        </div>

                        <div>
                            <span>Price</span>
                            <strong>
                                {item.price > 0
                                    ? `₹${item.price}`
                                    : "Free"}
                            </strong>
                        </div>

                        <div>
                            <span>Location</span>
                            <strong>📍 Campus</strong>
                        </div>

                    </div>

                    {isSeller ? (
    item.status === "Available" ? (
        <>
            <button
                className="request-button"
                onClick={() =>
                    navigate(`/items/${id}/edit`)
                }
            >
                Update Item
            </button>

            <button
                className="remove-button"
                onClick={handleRemove}
            >
                Remove Item
            </button>
        </>
    ) : (
        <button
            className="request-button"
            disabled
        >
            {item.status}
        </button>
    )
) : (
    <button
        className="request-button"
        onClick={handleRequest}
        disabled={requesting || requested || item.status !== "Available"}
    >
        {requesting
            ? "Sending..."
            : requested
            ? "Request Sent ✓"
            : item.type === "Donate"
            ? "Request to Receive"
            : "Request to Buy"}
    </button>
)}

                </div>
            </div>
        </div>
    );
}

export default ItemDetails;