// Author: sametbayat
// Dec 02, 2023 3:21 PM


import React, {useState} from 'react';
import {
    // FaTrashAlt,
    FaSearch,
    // FaEdit, FaEye
} from "react-icons/fa";
import logo from '../../assets/img/google_G_logo.png';

const SearchOnGoogle = ({ metadata, query }) => {
    const searchWithQuery = () => {
        if (metadata) {
            const searchQuery = encodeURIComponent(query);
            window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
        } else { console.log('No search term provided.'); }
    };

                {/*<FaSearch />*/}
    return (
        <button
            className={`btn btn-outline-primary`}
            onClick={searchWithQuery}
        >
                <img
                    alt="Seach on Google"
                    src={logo}
                />
            </button>
    );
};

export default SearchOnGoogle;
