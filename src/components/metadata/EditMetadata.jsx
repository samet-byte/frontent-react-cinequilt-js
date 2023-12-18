import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Link, useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Constants from "../../common/Constants";
import {ALL_GENRES} from "../../common/genres";

const EditMetadata = () => {

    let navigate = useNavigate();
    
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
        soundtrackUrl: null,
        type: 'MOVIE',
        season: 0,
        episode: 0,
    })

    // const {title, director, releaseYear, duration, description, genre, posterUrl, videoUrl, soundtrackUrl} = metadata;

    const {
        title,
        director,
        releaseYear,
        duration,
        description,
        genre,
        posterUrl,
        videoUrl,
        soundtrackUrl,
        type,
        season,
        episode,
    } = metadata;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();



        const loadMetadata = async () => {
            try {
                const response = await axiosPrivate.get(`/metadatas/${id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setMetadata(response.data);
            } catch (err) {
                console.log(err);
                if (err.name !== 'CanceledError') { // Ignore canceled requests, without this 'return' statement, called immediately
                    err.response?.status === 403
                        ? alert(err.name + ' -> Unauthorized or Access Token Expired')
                        : alert(err.name + ' -> ' + err.message);
                    //navigate('/login', { state: { from: location }, replace: true });

                }
            }
        }

        loadMetadata();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    //
    // useEffect(() => { loadMetadata(); }, []);
    //
    // const loadMetadata = async () => {
    //     const result = await axios.get(`http://localhost:9192/metadatas/metadata/${id}`);
    //     setMetadata(result.data); // .reverse()
    //   }

    const handleInputChange = (e) => {
        setMetadata({...metadata, [e.target.name]: e.target.value})
    }
    //

    const { auth } = useAuth();
    const editMetadata = async(e) => {
        e.preventDefault();
        // console.log(auth.accessToken + " -> auth..")
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
                    soundtrackUrl: soundtrackUrl === "" ? null : soundtrackUrl,
                    type: type === "" ? 'MOVIE' : type,
                    season: season,
                    episode: episode // < 1 ? null : episode,
                }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.accessToken} `
                },
                withCredentials: true
            });


            // handleRefresh();
        } catch (error) {
            // Handle the error appropriately, e.g., log it or show a user-friendly message
            console.error('Error saving metadata:', error);
        } finally {
            navigate(`/metadata-profile/${title}`, { replace: true });
        }
    }



    return (
        <div className='col-sm-8 py-2 px-5 offset-2 shadow'> 
            <h2 className='mt-5'>Edit Content</h2>
            <form onSubmit={(e) => editMetadata(e)}>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='type'>
                        Type
                    </label>
                    <select
                        className='form-control col-span-small-6'
                        name='type'
                        id='type'
                        required
                        value={type}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Type</option>
                        {Object.entries(Constants.CONTENT_TYPES_MAP).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>


                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='title'>
                        Title
                    </label>
                    <input 
                    className='form-control col-span-small-6' 
                    type='text' 
                    name='title' 
                    id='title'
                    required
                    value={title}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>
                
                
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='director' >
                        Director
                    </label>
                    <input 
                    className='form-control col-span-small-6' 
                    type='text' 
                    name='director' 
                    id='director'
                    // required
                    value={director}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='releaseYear' >
                        Release Year
                    </label>
                    <input 
                    className='form-control col-span-small-6' 
                    type="number" 
                    name='releaseYear' 
                    id='releaseYear'
                    // required
                    value={releaseYear}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='season' >
                        Season
                    </label>
                    <input
                    className='form-control col-span-small-6'
                    type="number"
                    name='season'
                    id='season'
                    // required
                    value={season}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='episode' >
                        Episode
                    </label>
                    <input
                    className='form-control col-span-small-6'
                    type="number"
                    name='episode'
                    id='episode'
                    // required
                    value={episode}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='duration'>
                        Duration
                    </label>
                    <input 
                    className='form-control col-span-small-6' 
                    type='number'
                    name='duration' 
                    id='duraiton'
                    // required
                    value={duration}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='description'>
                        Description
                    </label>
                    <input
                    className='form-control col-span-small-6'
                    type='text'
                    name='description'
                    id='description'
                    // required
                    value={description}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='genre'>
                        Genre
                    </label>
                    <select
                        className='form-control col-span-small-6'
                        name='genre'
                        id='genre'
                        // required
                        value={genre}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select Genre</option>
                        {ALL_GENRES.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='posterUrl'>
                        Poster URL
                    </label>
                    <input 
                    className='form-control col-span-small-6' 
                    type='text' 
                    name='posterUrl' 
                    id='posterUrl'
                    // required
                    value={posterUrl}
                    onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='videoUrl'>
                        Video URL
                    </label>
                    <input
                        className='form-control col-span-small-6'
                        type='text'
                        name='videoUrl'
                        id='videoUrl'
                        // required
                        value={videoUrl}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>


                    <div className='input-group mb-5'>
                        <label className='input-group-text' htmlFor='soundtrackUrl'>
                            Soundtrack URL
                        </label>
                        <input
                            className='form-control col-span-small-6'
                            type='text'
                            name='soundtrackUrl'
                            id='soundtrackUrl'
                            // required
                            value={soundtrackUrl}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                <div className='row mb-5'>
                    
                    <div className='col-sm-2'>
                        <button
                            type='submit'
                            className='btn btn-outline-success btn-lg'
                        >
                            Update
                        </button>
                    </div>

                    <div className='col-sm-2'>
                        <Link
                            to={"/view-metadatas"}
                            type='submit'
                            className='btn btn-outline-warning btn-lg'
                        >
                            Cancel
                        </Link>
                    </div>

                </div>

            </form>
        </div>
  )
}

export default EditMetadata