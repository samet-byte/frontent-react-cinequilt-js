// Author: sametbayat
// Dec 02, 2023 3:21 PM

import React from 'react';
import {
    FaSearch,
    // FaTrashAlt,
    // FaEdit, FaEye
} from "react-icons/fa";

const SearchTinyButton = ({ metadata, query, btnCls }) => {

    const searchWithQuery = () => {
        if (metadata) {

            window.open(`${query}`, '_blank');
        } else { console.log('No search term provided.'); }
    };

    return (
        <div>
            {/* <button onClick={searchWithQuery}>Search metadata.x on Google</button> */}
            <button
                className={`btn ${btnCls}`}
                onClick={searchWithQuery}
            >
                <FaSearch />
            </button>

        </div>

    );
};

export default SearchTinyButton;
