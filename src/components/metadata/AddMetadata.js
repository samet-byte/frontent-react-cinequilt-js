import React, { useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const AddMetadata = () => {

    let navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const { auth, setAuth } = useAuth();


    // console.log(auth.accessToken + "auth..")

    const[metadata, setMetadatas] = useState({
        title : '',
        director : '',
        releaseYear : 2023,
        duration : 0,
        posterUrl: 'https://sdk.bitmoji.com/me/sticker/j78cRDYobOkbHKwnQQDlnCATyVeig0bGqzyNqTVZDdcLtj9hn4hRcg/10227185.png?p=dD1zO2w9ZW4.v1&size=thumbnail',
        videoUrl: '',
        trailerUrl: '',
        soundtrackUrl: ''

    })

    const {
        title,
        director,
        releaseYear,
        duration,
        posterUrl,
        videoUrl,
        soundtrackUrl
    } = metadata;

    const handleInputChange = (e) => {
        setMetadatas({...metadata, [e.target.name]: e.target.value})
    }

    const saveMetadata = async (e) => {
        e.preventDefault();

        try {
            await axiosPrivate.post("/metadatas", metadata, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.accessToken} `
                },
                withCredentials: true
            });


            navigate("/view-metadatas");
        } catch (error) {
            // Handle the error appropriately, e.g., log it or show a user-friendly message
            console.error('Error saving metadata:', error);
        }
    };




    return (
        <div className='col-sm-8 py-2 px-5 offset-2 shadow'> 
            <h2 className='mt-5'>Add Content</h2>
            <form onSubmit={(e) => saveMetadata(e)}>
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
                            Save
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

export default AddMetadata

{/* //offset-2 */}
{/* htmlFor gives focus*/}