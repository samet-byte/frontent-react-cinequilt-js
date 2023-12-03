// Author: sametbayat
// Dec 02, 2023 3:21 PM


import React from 'react';
import {
    // FaTrashAlt,
    FaSearch,
    // FaEdit, FaEye
} from "react-icons/fa";

const SearchOnGoogle = ({ metadata, query }) => {

    const searchWithQuery = () => {
        if (metadata) {
            const searchQuery = encodeURIComponent(query);
            window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
        } else { console.log('No search term provided.'); }
    };

    return (
        <div>
            {/* <button onClick={searchWithQuery}>Search metadata.x on Google</button> */}
            <button
                className="btn btn-primary"
                onClick={searchWithQuery}
            >
                <FaSearch />
            </button>

        </div>

    );
};

export default SearchOnGoogle;
