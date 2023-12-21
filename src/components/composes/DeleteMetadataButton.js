// Author: sametbayat
// Dec 17, 2023 5:02 PM


import React, {useState} from 'react';
import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {FaTrashAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/anim/delete.json";

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

            // setMetadatas(metadatas.filter((metadata) => metadata.id !== id));
            // navigate("/view-metadatas", { replace: true });
        } catch (error) {
            // Handle the error appropriately, e.g., log it or show a user-friendly message
            console.error('Error saving metadata:', error);
        } finally {
            // handleRefresh();
            setIsProcessStarted(false)
            handleRefresh && handleRefresh();
            navigate("/view-metadatas");
        }
    };

    return (
        <button
            className="btn btn-outline-danger"
            onClick={() => {
                handleDelete(id)
                // navigate("/view-metadatas", { replace: true })
            }}
        >
            {!isProcessStarted ?
                <FaTrashAlt/>
                : <Lottie animationData={animationData} />}
        </button>
    );
}
