// Author: sametbayat
// Dec 04, 2023 4:43 PM

import {axiosPrivate} from "../../../api/axios";
import React, { useState, useEffect } from 'react';
import {Card, Modal} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from "react-router-dom";
import Paths from "../../../common/Paths";

const MetadataCard = ({ metadata }) => {
    const getMediaTypeEmoji = () => {
        return metadata.type === 'TV_SHOW' ? '📺' : '🎬';
    };

    return (
        <Link to={`${Paths.METADATA_PROFILE}/${encodeURIComponent(metadata.title)}`} style={{ textDecoration: 'none' }}>
        <Card className="mb-1 custom-hover-card custom-card">
            <Card.Body>
                <Card.Text>
                        <span className="text-muted">{getMediaTypeEmoji()}</span> {metadata.mediaType}
                        {metadata.title}
                </Card.Text>
            </Card.Body>
        </Card>
        </Link>
    );
};



const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [metadataList, setMetadataList] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch metadata based on the search query
        const fetchMetadata = async () => {
            try {
                const response = await axiosPrivate.get(`/metadatas/search/${encodeURIComponent(searchQuery)}`);
                setMetadataList(response.data);
                //setShowModal(true); // Show modal when data is fetched
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        if (searchQuery.trim() !== '') {
            fetchMetadata().then(_ => {});
        } else {
            setMetadataList([]);
            setShowModal(false);
        }
    }, [searchQuery]); //searchQuery

    const handleInputChange = (event) => {
        const newSearchQuery = event.target.value;
        setSearchQuery(newSearchQuery);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setSearchQuery('');
            setShowModal(false);
        }
        else if (event.key === 'Enter' && searchQuery.trim() !== '') {
            handleShowModal();
        }
    }

    const navigate = useNavigate();

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="🔍 Pop Search.."
                onKeyDown={handleKeyDown}
            />
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
                            {metadataList.map((metadata) => (
                                // <Link to={`${Paths.METADATA_PROFILE}/${encodeURIComponent(metadata.title)}`}
                                <div
                                      onClick={() => {
                                          setShowModal(false)
                                          navigate(`${Paths.METADATA_PROFILE}/${(metadata.id)}`, { replace: true })
                                          navigate(0)
                                      }}
                                      style={{textDecoration: 'none'}}
                                >

                                    {/*<Link to={`${Paths.METADATA_PROFILE}/${encodeURIComponent(metadata.title)}`}>{metadata.title}</Link>*/}
                                    <MetadataCard metadata={metadata} />


                                    </div>
                            ))}
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default SearchComponent;
