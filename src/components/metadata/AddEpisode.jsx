// Author: sametbayat
// Dec 30, 2023 3:27 AM

import {useLocation, useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import React, {useEffect, useState} from "react";
import Paths from "../../common/Paths";
import Loading from "../composes/Loading";
import {MetadataForm} from "./MetadataForm";
import Constants from "../../common/Constants";

const AddEpisode = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const[metadataEpisode, setMetadataEpisodes] = useState({
        metadataId: id,
        season: 0,
        episode: 0,
        title : null,
        videoUrl: null,
        description : null,
    })

    const {
        metadataId,
        title,
        description,
        videoUrl,
        season,
        episode,
    } = metadataEpisode;

    const handleInputChange = (e) => {
        setMetadataEpisodes({...metadataEpisode, [e.target.name]: e.target.value})
    }

    const saveMetadata = async (e) => {
        e.preventDefault();

        setIsSubmitted(true)

        try {
            console.log(JSON.stringify(metadataEpisode));
            await axiosPrivate.post("/series/episode", metadataEpisode, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.accessToken} `
                },
                withCredentials: true
            });
            navigate(`${Paths.METADATA_PROFILE}/${id}`, { replace: true });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitted(false);
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8 my-5'>
                    <h2 className='text-center mb-4'>Add Episode <br/>({id})</h2>
                    {isSubmitted ? (
                        <Loading />
                    ) : (
                        <form onSubmit={saveMetadata}>
                            <div className='mb-3'>
                                <label htmlFor='season' className='form-label'>
                                    Season
                                </label>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='season'
                                    name='season'
                                    value={season}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='episode' className='form-label'>
                                    Episode
                                </label>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='episode'
                                    name='episode'
                                    value={episode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='title' className='form-label'>
                                    Title
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='title'
                                    name='title'
                                    value={title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='videoUrl' className='form-label'>
                                    Video URL
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='videoUrl'
                                    name='videoUrl'
                                    value={videoUrl}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='description' className='form-label'>
                                    Description
                                </label>
                                <textarea
                                    className='form-control'
                                    id='description'
                                    name='description'
                                    value={description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <button type='submit' className='btn btn-outline-success'>
                                Save Episode
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddEpisode;