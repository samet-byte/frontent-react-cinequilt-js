import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Loading from "../composes/Loading";
import {MetadataForm} from "./MetadataForm";
import Paths from "../../common/Paths";
import backgroundImage from "../BackgroundImage";

const AddMetadata = () => {

    let navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    // const location = useLocation();
    const { auth } = useAuth();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const[metadata, setMetadatas] = useState({
        title : null,
        director : null,
        releaseYear : 2023,
        duration : 0,
        description : null,
        genre : null,
        posterUrl: '',
        videoUrl: null,
        trailerUrl: null,
        soundtrackUrl: null,
        type: 'MOVIE',
        season: 0,
        episode: 0,
        backgroundImageUrl: null

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
        season,
        episode,
        backgroundImageUrl,
    } = metadata;

    const handleInputChange = (e) => {
        setMetadatas({...metadata, [e.target.name]: e.target.value})
    }

    const saveMetadata = async (e) => {
        e.preventDefault();

        setIsSubmitted(true)

        try {
            await axiosPrivate.post("/metadatas", metadata, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.accessToken} `
                },
                withCredentials: true
            });
            navigate(`${Paths.VIEW_METADATAS}`, { replace: true });
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
                    <h2 className='text-center mb-4'>Add Content</h2>
                    {
                        isSubmitted ?
                            <Loading/> :
                            MetadataForm(saveMetadata, type, handleInputChange, title, director, releaseYear, season, episode, duration, description, genre, posterUrl, videoUrl, trailerUrl, soundtrackUrl, backgroundImageUrl)}
                </div>
            </div>
        </div>
  )
}

export default AddMetadata
