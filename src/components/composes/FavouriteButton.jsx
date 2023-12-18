// Author: sametbayat
// Dec 09, 2023 5:33 PM


import React, { useState, useEffect } from 'react';
// import {axiosPrivate, axios} from "../../api/axios";
import axios from "../../api/axios";
import {FaHeart} from "react-icons/fa";
const FavoriteButton = ({ metadataId, userId }) => {
    // console.log("metadataId: " + metadataId)
    const [isFaved, setIsFaved] = useState(false);
    const [isHovered, setIsHovered] = useState(false);



    useEffect(() => {
        // Fetch initial favorite status from the API
        const fetchData = async () => {
            try {
                // const response = await axiosPrivate.get(`/favs/isFaved`, {metadataId, userId});
                const response = await axios.post('/favs/isFaved', {
                    metadataId: metadataId,
                    userId: userId,
                });


                // const data = await response.json();
                const data = response.data;
                // console.log("metadataId: " + metadataId)
                // console.log("userId: " + userId)
                // console.log("data: " +  data.faved)
                setIsFaved(data.faved);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFavoriteToggle = async () => {
        try {
            // Make API call to update favorite status
            const response = await axios.post('/favs/isFaved?changeState=true', {
                metadataId: metadataId,
                userId: userId,
                changeState: true,
            });


            // console.log("response: " + response.data.faved)



            if (response.status === 200) {
                // Update local state on success
                setIsFaved(!isFaved);
            } else {
                console.error('Failed to update favorite status');
            }
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };


    const handleMouseEnter = (e) => {
        setIsHovered(true);

        // e.target.style.color = isFaved ? (isHovered ? 'red' : 'black') : (isHovered ? 'black' : 'red');
    };

    const handleMouseLeave = (e) => {
        setIsHovered(false);

        // e.target.style.color = isFaved ? (isHovered ? 'black' : 'red') : (isHovered ? 'red' : 'black');
    };


    return (
        <button

            style={{border: 'blue'}}
            type={'button'}
            className="btn btn-outline ms-1"
            onClick={handleFavoriteToggle}
        >
            <FaHeart

                size={50}

                // color={isFaved ? 'red' : 'black'}

                style={{
                    // border: `2px ${isHovered ? 'red' : 'none'}`,
                    transition: 'color 0.6s ease', // Smooth transition effect
                    cursor: 'pointer', // Show pointer cursor on hover
                    // backgroundColor: isHovered ? 'rgba(255, 0, 0, 0.1)' : 'transparent', // Light red background on hover
                    color: isFaved ? 'red' : 'black',
                }}
                onMouseEnter={(e) => {handleMouseEnter(e)}}
                onMouseLeave={(e) => {handleMouseLeave(e)}}
            />
        </button>
    );
};

export default FavoriteButton;

