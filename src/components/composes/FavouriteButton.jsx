// Author: sametbayat
// Dec 09, 2023 5:33 PM

import React, { useState, useEffect } from 'react';
import axios from "../../api/axios";
import {FaHeart} from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from '../../assets/anim/loading_heart.json';

const FavoriteButton = ({ metadataId, userId, customStyle }) => {
    const [isFaved, setIsFaved] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axiosPrivate.get(`/favs/isFaved`, {metadataId, userId});
                const response = await axios.post('/favs/isFaved', {
                    metadataId: metadataId,
                    userId: userId,
                });

                const data = response.data;
                setIsFaved(data.faved);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, );

    const handleFavoriteToggle = async () => {
        setIsProcessing(true);
        try {
            const response = await axios.post('/favs/isFaved?changeState=true', {
                metadataId: metadataId,
                userId: userId,
                changeState: true,
            });

            if (response.status === 200) {
                setIsFaved(!isFaved);
            } else {
                console.error('Failed to update favorite status');
            }
        } catch (error) {
            console.error('Error updating favorite status:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <button
            style={customStyle}
            type={'button'}
            className="btn btn-outline ms-1"
            onClick={handleFavoriteToggle}
        >
            {!isProcessing ?
                <FaHeart
                    size={50}
                    style={{
                        transition: 'color 0.6s ease',
                        cursor: 'pointer',
                        color: isFaved ? 'red' : 'black',
                    }}

                /> :
                <Lottie className="center-item" animationData={animationData} style={{width: '50px', height: '50px'}}/>}
        </button>
    );
};

export default FavoriteButton;
