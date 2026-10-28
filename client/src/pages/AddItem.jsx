import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        type: "Sell",
        price: "",
        condition: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/items",
                {
                    method: "POST",
                    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
},
                    body: JSON.stringify({
                        ...form,
                        price: form.price ? Number(form.price) : 0
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Item listed successfully!");
                navigate("/items");
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            alert("Could not connect to server");
        }
    };

    return (
        <div className="add-item-page">

            <div className="add-item-box">

                <div className="add-item-heading">
                    <p className="section-label">
                        CAMPUS RESOURCE HUB
                    </p>

                    <h1>List Your Item</h1>

                    <p>
                        Give something useful a second life
                        within your campus community.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Item Name</label>

                        <input
                            name="name"
                            placeholder="Eg. Engineering Mathematics Book"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            placeholder="Describe your item..."
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Category</label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Category
                                </option>
                                <option value="Books">Books</option>
                                <option value="Electronics">
                                    Electronics
                                </option>
                                <option value="Stationery">
                                    Stationery
                                </option>
                                <option value="Accessories">
                                    Accessories
                                </option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>What do you want to do?</label>

                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >
                                <option value="Sell">Sell</option>
<option value="Donate">Donate</option>
                            </select>
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Price</label>

                            <input
                                name="price"
                                type="number"
                                placeholder="₹ Price"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Condition</label>

                            <select
                                name="condition"
                                value={form.condition}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Condition
                                </option>
                                <option value="New">New</option>
                                <option value="Like New">
                                    Like New
                                </option>
                                <option value="Good">Good</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>

                    </div>

                    <button type="submit">
                        List Item →
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddItem;