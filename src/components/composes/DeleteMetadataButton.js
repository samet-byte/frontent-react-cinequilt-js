// Author: sametbayat
// Dec 17, 2023 5:02 PM


import React from 'react';
import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {FaTrashAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export function DeleteMetadataButton({handleRefresh, id}) {


    const {auth} = useAuth();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        // e.preventDefault();
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
            <FaTrashAlt/>
        </button>
    );
}
