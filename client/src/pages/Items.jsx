import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Items() {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {

        fetch("http://localhost:5000/api/items")
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.log(error));

    }, []);

    const filteredItems = items.filter((item) => {

        const matchesSearch =
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" || item.type === filter;

        return matchesSearch && matchesFilter;
    });

    return (

        <div className="items-page">

            <section className="marketplace-hero">

                <div>

                    <p className="section-label">
                        CAMPUS MARKETPLACE
                    </p>

                    <h1>
                        Find something
                        <span>useful.</span>
                    </h1>

                    <p>
                        Discover items shared by students in your
                        campus community.
                    </p>

                </div>

            </section>


            <section className="marketplace-content">

                <div className="marketplace-top">

                    <div>

                        <h2>Explore Items</h2>

                        <p>
                            {filteredItems.length} items available
                        </p>

                    </div>

                    <input
                        type="text"
                        placeholder="🔍 Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>


                <div className="filter-buttons">

                    {["All", "Sell", "Donate"].map((type) => (

                        <button
                            key={type}
                            className={
                                filter === type
                                    ? "filter active"
                                    : "filter"
                            }
                            onClick={() => setFilter(type)}
                        >
                            {type}
                        </button>

                    ))}

                </div>


                <div className="items-grid">

                    {filteredItems.map((item) => (

                        <div
                            className="item-card"
                            key={item._id}
                        >

                            <div className="item-image">
                                <span>📦</span>
                            </div>


                            <div className="item-content">

                                <div className="item-top">

                                    <span className="item-type">
                                        {item.type}
                                    </span>

                                    {item.type === "Sell" && item.price > 0 && (
                                        <strong>
                                            ₹{item.price}
                                        </strong>
                                    )}

                                    {item.type === "Donate" && (
                                        <strong>
                                            Free
                                        </strong>
                                    )}

                                </div>


                                <h3>{item.name}</h3>

                                <p>
                                    {item.description}
                                </p>


                                <div className="item-footer">

                                    <span>
                                        📍 Campus
                                    </span>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/items/${item._id}`
                                            )
                                        }
                                    >
                                        View Item →
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {filteredItems.length === 0 && (

                    <div className="empty-items">

                        <div>📦</div>

                        <h3>No items found</h3>

                        <p>
                            Try another search or category.
                        </p>

                    </div>

                )}

            </section>

        </div>
    );
}

export default Items;