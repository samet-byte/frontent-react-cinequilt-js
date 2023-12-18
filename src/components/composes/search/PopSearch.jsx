// Author: sametbayat
// Dec 04, 2023 4:43 PM

import {axiosPrivate} from "../../../api/axios";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import MovieCard from "../common/MovieCard";
import Experimental from "../../../experimental/Experimental";

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [metadataList, setMetadataList] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch metadata based on the search query
        const fetchMetadata = async () => {
            try {
                const response = await axiosPrivate.get(`/metadatas/search/${searchQuery}`);
                setMetadataList(response.data);
                //setShowModal(true); // Show modal when data is fetched
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        // Fetch metadata only if the search query is not empty
        if (searchQuery.trim() !== '') {
            fetchMetadata();
        } else {
            setMetadataList([]); // Clear the list if the search query is empty
            setShowModal(false); // Hide modal when input is empty
        }
    }, [searchQuery]); //searchQuery

    const handleInputChange = (event) => {
        const newSearchQuery = event.target.value;
        setSearchQuery(newSearchQuery);
        // setSearchQuery(newSearchQuery);
    };

    const handleShowModal = () => {
        // You can add additional logic here if needed
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setSearchQuery('');
            showModal(false);
        }
        else if (event.key === 'Enter' && searchQuery.trim() !== '') {
            handleShowModal();
        }
    }

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="🔍 Pop Search.."
                onKeyDown={handleKeyDown}
            />
            {/*<Button variant="primary" onClick={handleShowModal}>*/}
            {/*    Show Modal*/}
            {/*</Button>*/}
            {showModal && (
                <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-dialog-top">
                            {/*<Experimental/>*/}
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {/*Search Results for*/}
                            🔍: {searchQuery}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{alignContent: "center"}}>
                        {/*<ul>*/}
                            {metadataList.map((metadata) => (
                                <Link to={`/metadata-profile/${metadata.title}`}
                                      onClick={() => showModal(false)}
                                      style={{textDecoration: 'none'}}
                                >
                                    <MovieCard
                                       title={metadata.title}
                                        posterUrl={metadata.posterUrl}
                                        year={metadata.releaseYear}
                                        />
                                {/*}*/}
                                {/*<div>*/}
                                {/*    <img src={metadata.posterUrl} height={160} alt={metadata.title} />*/}
                                {/*    {metadata.id}. {metadata.title}*/}
                                {/*</div>*/}
                                </Link>
                            ))}
                        {/*</ul>*/}
                    </Modal.Body>
                    {/*<Modal.Footer>*/}
                    {/*    <Button variant="secondary" onClick={handleCloseModal}>*/}
                    {/*        Close*/}
                    {/*    </Button>*/}
                    {/*</Modal.Footer>*/}
                </Modal>
            )}
        </div>
    );
};

export default SearchComponent;
