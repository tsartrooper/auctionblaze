

import React, { useState } from "react";

export default function AuctionFilters({ setFilters }) {
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);

    return (
        <div className="p-4 bg-white shadow-md rounded-md mb-4">
            <h2 className="text-lg font-semibold mb-2">Filter Auctions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Title Search */}
                <input
                type="text"
                className="border rounded px-3 py-2"
                placeholder="Search by title"
                value=""
                onChange={(e) =>
                    setFilters((prev) => ({ ...prev, title: e.target.value }))
                }
                />

                {/* Category Filter */}
                <select
                className="border rounded px-3 py-2"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    setFilters((prev) => ({ ...prev, category: e.target.value }));
                }}
                >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="art">Art</option>
                <option value="vehicles">Vehicles</option>
                </select>

                {/* Category Filter */}
                <select
                    className="border rounded px-3 py-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="art">Art</option>
                    <option value="vehicles">Vehicles</option>
                </select>

                {/* Price Range Filter */}
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        placeholder="Min Price"
                        className="border rounded px-3 py-2 w-full"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max Price"
                        className="border rounded px-3 py-2 w-full"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}