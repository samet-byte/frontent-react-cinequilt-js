// Author: sametbayat
// Dec 02, 2023 3:21 PM

import React from 'react';
import {
    FaSearch,
} from "react-icons/fa";

const SearchTinyButton = ({ metadata, img, query, btnCls }) => {

    const searchWithQuery = () => {
        if (metadata) {

            window.open(`${query}`, '_blank');
        } else { console.log('No search term provided.'); }
    };

            {/* <button onClick={searchWithQuery}>Search metadata.x on Google</button> */}
    return (
            <button
                className={`btn ${btnCls}`}
                onClick={searchWithQuery}
            >
                <img
                    width={25}
                    height={25}
                    alt="Search"
                    src={img ? img : <FaSearch/>}
                />
            </button>
    );
};

export default SearchTinyButton;
