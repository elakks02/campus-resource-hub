import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditItem() {

    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        type: "Sell",
        price: 0,
        condition: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/items/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    category: data.category || "",
                    type: data.type || "Sell",
                    price: data.price || 0,
                    condition: data.condition || ""
                });
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleTypeChange = (e) => {
        const type = e.target.value;

        setForm({
            ...form,
            type,
            price: type === "Donate" ? 0 : form.price
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/api/items/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Item updated successfully!");
                navigate(`/items/${id}`);
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Could not connect to server");
        }
    };

    return (
        <div className="add-item-page">

            <div className="add-item-box">

                <p className="section-label">
                    EDIT LISTING
                </p>

                <h1>Update Item</h1>

                <p>
                    Change the details of your listing.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Item Name</label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Category</label>

                            <input
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
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
                                    Select condition
                                </option>
                                <option value="New">
                                    New
                                </option>
                                <option value="Like New">
                                    Like New
                                </option>
                                <option value="Good">
                                    Good
                                </option>
                                <option value="Used">
                                    Used
                                </option>
                            </select>
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Type</label>

                            <select
                                value={form.type}
                                onChange={handleTypeChange}
                            >
                                <option value="Sell">
                                    Sell
                                </option>

                                <option value="Donate">
                                    Donate
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                value={
                                    form.type === "Donate"
                                        ? 0
                                        : form.price
                                }
                                disabled={
                                    form.type === "Donate"
                                }
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <button
                        className="request-button"
                        type="submit"
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() =>
                            navigate(`/items/${id}`)
                        }
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditItem;