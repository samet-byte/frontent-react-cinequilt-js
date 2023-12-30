// Author: sametbayat
// Dec 17, 2023 5:02 PM

import React, {useState} from 'react';
import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {FaTrashAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/anim/delete.json";
import Paths from "../../common/Paths";

export function DeleteMetadataButton({handleRefresh, id}) {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [isProcessStarted, setIsProcessStarted] = useState(false);

    const handleDelete = async (id) => {
        // e.preventDefault();

        setIsProcessStarted(true)

        try {
            await axiosPrivate.delete(`/metadatas/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.accessToken} `
                },
                withCredentials: true
            });

        } catch (error) {
            console.error('Error saving metadata:', error);
        } finally {
            setIsProcessStarted(false)
            handleRefresh && handleRefresh();
            navigate(`${Paths.VIEW_METADATAS}`, {replace: true});
        }
    };

    return (
        <button
            className="btn btn-outline-danger"
            onClick={() => {
                handleDelete(id)
            }}
        >
            {!isProcessStarted ?
                <FaTrashAlt/>
                : <Lottie animationData={animationData} />}
        </button>
    );
}
