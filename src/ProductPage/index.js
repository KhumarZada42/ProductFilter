import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss"

function ProductPage() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await axios.get(
                "https://northwind.vercel.app/api/products"
            );
            setPosts(response.data);
            setLoading(false);
        };

        loadPosts();
    }, []);
    return (
        <div className="main">
            <h1>Search Filter</h1>
            <div className="inpBtn">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <div className="container">
                    <div class="button-container">
                     
                        <button type="button" name="Hover" onClick={() => { setPosts([...posts].sort((a, b) => (a.unitPrice > b.unitPrice) ? 1 : ((b.unitPrice > a.unitPrice) ? -1 : 0))) }} >Sort by price</button>
                    </div>
                </div>
            </div>

            {loading ? (
                <h4 style={{ color: "white" }}>Loading ...</h4>
            ) : (
                posts
                    .filter((value) => {
                        if (searchTitle === "") {
                            return value;
                        } else if (
                            value.name.toLowerCase().includes(searchTitle.toLowerCase())
                        ) {
                            return value;
                        }
                    })
                    .map((item) => {
                        return (
                            <div className="main">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">Name:  {item.name}</h3>
                                        <h4 className="card-text">Quantity:  {item.quantityPerUnit}</h4>
                                        <h4 className="card-text">Price:  {item.unitPrice}</h4>
                                    </div>
                                </div>
                            </div>
                        );
                    })
            )}
        </div>
    )
}

export default ProductPage