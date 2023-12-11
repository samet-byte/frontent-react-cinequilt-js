// Author: sametbayat
// Dec 03, 2023 12:34 AM

import React, { useState, useEffect } from 'react';
import {axiosPrivate} from "../../../api/axios";
import {Link} from "react-router-dom";
import MovieCard from "../common/MovieCard";
import Constants from "../../../common/Constants";

const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${Constants.INSTANT_SEARCH_GRID_COL}, 1fr)`, // Two columns with equal width
    gap: '16px', // Optional: Adjust the gap between grid items
};


const InstantSearch = () => {
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem(Constants.LS_INSTANT_SEARCH_QUERY) || '');
    const [metadataList, setMetadataList] = useState([]);
    const [showContentCard, setShowContentCard] = useState(false);

    useEffect(() => {
        // Fetch metadata based on the search query
        const fetchMetadata = async () => {
            try {
                const response = await axiosPrivate.get(`/metadatas/search/${searchQuery}`);
                setMetadataList(response.data);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        // Fetch metadata only if the search query is not empty
        if (searchQuery.trim() !== '') {
            fetchMetadata();
        } else {
            setMetadataList([]); // Clear the list if the search query is empty
        }
    }, [searchQuery]);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setShowContentCard(query.length > 0); // Show popup only if there is a search query
        localStorage.setItem(Constants.LS_INSTANT_SEARCH_QUERY, query)
    };

    return (
        <div className="center-item">
            <div>
                <input
                    className="in-search"
                    type="text"
                    placeholder="🔍 Search Metadata.."
                    value={searchQuery}
                    onChange={handleInputChange}
                />

                {showContentCard && (
                    <div className="grid-container" style={gridContainerStyle}>
                        {metadataList.map((metadata) => (
                            <Link to={`/metadata-profile/${metadata.title}`}
                                  style={{textDecoration: 'none', justifyContent: 'center'}}>
                                <MovieCard
                                    title={metadata.title}
                                    posterUrl={metadata.posterUrl}
                                    year={metadata.releaseYear}
                                />
                            </Link>
                        ))}
                    </div>

                )}
            </div>
        </div>
    );
}
export default InstantSearch;
