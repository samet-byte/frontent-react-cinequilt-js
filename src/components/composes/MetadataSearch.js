// Author: sametbayat
// Dec 03, 2023 12:34 AM

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {axiosPrivate} from "../../api/axios";
import {Link, useNavigate} from "react-router-dom";

const MetadataSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [metadataList, setMetadataList] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

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
        setShowPopup(query.length > 0); // Show popup only if there is a search query
    };

    const handlePopupItemClick = (metadata) => {
        // Handle when a metadata item in the popup is clicked
        console.log('Selected Metadata:', metadata);
        setSearchQuery('');
        // You can navigate or perform other actions based on the selected metadata
        // For example: history.push(`/metadata/${metadata.id}`);
    };

    const navigate = useNavigate();

    return (
        <div className="metadata-search">
            <input
                type="text"
                placeholder="Search Metadata..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            {showPopup && (
                <div className="popup">
                    <ul>
                        {metadataList.map((metadata) => (
                            <li key={metadata.id} onClick={() => handlePopupItemClick(metadata)}>
                                <Link to={`/metadata-profile/${metadata.title}`}>
                                    <img src={metadata.posterUrl} alt={metadata.title} />
                                    {metadata.title}
                                </Link>

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MetadataSearch;
