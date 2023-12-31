import React, { useEffect, useState } from 'react'
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Constants from "../../common/Constants";
import {MetadataForm} from "./MetadataForm";
import Paths from "../../common/Paths";



const EditMetadata = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('bgImage') !== Constants.COMMON_BACKGROUND_URL) {
            localStorage.setItem('bgImage', Constants.COMMON_BACKGROUND_URL);
            navigate(0)
        }
    }, []);
    
    const { id } = useParams();

    const[metadata, setMetadata] = useState({
        title : '',
        director : '',
        releaseYear : 2023,
        duration : 0,
        description : null,
        genre : null,
        posterUrl: Constants.POSTER_PLACEHOLDER_URL,
        videoUrl: null,
        trailerUrl: null,
        soundtrackUrl: null,
        type: 'MOVIE',
        seasonNumber: 0,
        episodeNumber: 0,
        backgroundImageUrl: null,
    })

    const {
        title,
        director,
        releaseYear,
        duration,
        description,
        genre,
        posterUrl,
        videoUrl,
        trailerUrl,
        soundtrackUrl,
        type,
        seasonNumber,
        episodeNumber,
        backgroundImageUrl,
    } = metadata;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();



        const loadMetadata = async () => {
            try {
                const response = await axiosPrivate.get(`/metadatas/${id}`, {
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setMetadata(response.data);
            } catch (err) {
                console.log(err);
                if (err.name !== 'CanceledError') {
                    err.response?.status === 403
                        ? alert(err.name + ' -> Unauthorized or Access Token Expired')
                        : alert(err.name + ' -> ' + err.message);

                }
            }
        }

        loadMetadata();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    //lazy
    const handleInputChange = (e) => {
        setMetadata({...metadata, [e.target.name]: e.target.value})
    }

    const { auth } = useAuth();
    const editMetadata = async(e) => {
        e.preventDefault();
        try {
            await axiosPrivate.put(`/metadatas/${id}`,
                JSON.stringify({
                    title: title,
                    director: director === "" ? null : director,
                    releaseYear: releaseYear === "" ? 0 : releaseYear,
                    duration: duration === "" ? 0 : duration,
                    description: description === "" ? null : description,
                    genre: genre === "" ? null : genre,
                    posterUrl: posterUrl === "" ? Constants.POSTER_PLACEHOLDER_URL : posterUrl,
                    videoUrl: videoUrl === "" ? null : videoUrl,
                    trailerUrl: trailerUrl === "" ? null : trailerUrl,
                    soundtrackUrl: soundtrackUrl === "" ? null : soundtrackUrl,
                    type: type === "" ? 'MOVIE' : type,
                    seasonNumber: seasonNumber,
                    episodeNumber: episodeNumber, // < 1 ? null : episode,
                    backgroundImageUrl: backgroundImageUrl,
                }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.accessToken} `
                },
                withCredentials: true
            });

        } catch (error) {
            console.error('Error saving metadata:', error);
        } finally {
            navigate(`${Paths.METADATA_PROFILE}/${id}`, { replace: true });
        }
    }

    return (
        <div className='col-sm-8 py-2 px-5 offset-2 shadow'>
            <h2 className='mt-5'>Edit Content</h2>
            {MetadataForm(editMetadata, type, handleInputChange, title, director, releaseYear, seasonNumber, episodeNumber, duration, description, genre, posterUrl, videoUrl, trailerUrl, soundtrackUrl, backgroundImageUrl)}
        </div>
  )
}

export default EditMetadata