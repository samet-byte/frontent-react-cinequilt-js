import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Link, useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const EditMetadata = () => {

    let navigate = useNavigate();
    
    const { id } = useParams();

    const[metadata, setMetadata] = useState({
        title : '',
        director : '',
        releaseYear : 2023,
        duration : 0,
        posterUrl: 'https://sdk.bitmoji.com/me/sticker/j78cRDYobOkbHKwnQQDlnCATyVeig0bGqzyNqTVZDdcLtj9hn4hRcg/10227185.png?p=dD1zO2w9ZW4.v1&size=thumbnail',
        videoUrl: '',
        soundtrackUrl: ''

    })

    const {title, director, releaseYear, duration, posterUrl, videoUrl, soundtrackUrl} = metadata;


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
                    director: director,
                    releaseYear: releaseYear,
                    duration: duration,
                    posterUrl: posterUrl,
                    videoUrl: videoUrl,
                    soundtrackUrl: soundtrackUrl
                }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.accessToken} `
                },
                withCredentials: true
            });


            // handleRefresh();
            navigate("/view-metadatas");
        } catch (error) {
            // Handle the error appropriately, e.g., log it or show a user-friendly message
            console.error('Error saving metadata:', error);
        }
    }



    return (
        <div className='col-sm-8 py-2 px-5 offset-2 shadow'> 
            <h2 className='mt-5'>Edit Content</h2>
            <form onSubmit={(e) => editMetadata(e)}>
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
{/* //offset-2 */}
{/* htmlFor gives focus*/}