import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Constants from "../../common/Constants";
import {ALL_GENRES} from "../../common/genres";
import {Form} from "react-bootstrap";

const AddMetadata = () => {

    let navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    // const location = useLocation();
    const { auth } = useAuth();

    const[metadata, setMetadatas] = useState({
        title : null,
        director : null,
        releaseYear : 2023,
        duration : 0,
        description : null,
        genre : null,
        posterUrl: 'https://sdk.bitmoji.com/me/sticker/j78cRDYobOkbHKwnQQDlnCATyVeig0bGqzyNqTVZDdcLtj9hn4hRcg/10227185.png?p=dD1zO2w9ZW4.v1&size=thumbnail',
        videoUrl: null,
        trailerUrl: null,
        soundtrackUrl: null,
        type: 'MOVIE',
        season: 0,
        episode: 0,

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
            // console.error('Error saving metadata:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8 my-5'>
                    <h2 className='text-center mb-4'>Add Content</h2>
            <Form onSubmit={(e) => saveMetadata(e)}>


                <Form.Group controlId="type">
                    <Form.Label column sm="3">
                        Type
                    </Form.Label>
                    
                        <Form.Control
                            as="select"
                            name="type"
                            value={type || 'MOVIE'}
                            onChange={handleInputChange}
                            className="form-control col-span-small-6 mb-3"
                        >
                            {Object.entries(Constants.CONTENT_TYPES_MAP).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </Form.Control>
                    
                </Form.Group>


                <Form.Group controlId="title">
                    <Form.Label column sm="3">
                        Title
                    </Form.Label>
                    
                        <Form.Control
                            type="text"
                            name="title"
                            value={title || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>


                <Form.Group controlId="director">
                    <Form.Label column sm="3">
                        Director
                    </Form.Label>
                    
                        <Form.Control
                            type="text"
                            name="director"
                            value={director || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>




                <Form.Group controlId="releaseYear">
                    <Form.Label column sm="3">
                        Release Year
                    </Form.Label>
                    
                        <Form.Control
                            type="number"
                            name="releaseYear"
                            value={releaseYear || 0}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>


                {
                    type === 'TV_SHOW' &&
                <Form.Group controlId="season">
                    <Form.Label column sm="3">
                        Season
                    </Form.Label>
                    
                        <Form.Control
                            type="number"
                            name="season"
                            value={season || null}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>
                }

                {


                    type === 'TV_SHOW' &&
                <Form.Group controlId="episode">
                    <Form.Label column sm="3">
                        Episode
                    </Form.Label>
                    
                        <Form.Control
                            type="number"
                            name="episode"
                            value={episode || null}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>



                }

                <Form.Group controlId="duration">
                    <Form.Label column sm="3">
                        Duration
                    </Form.Label>
                    
                        <Form.Control
                            type="number"
                            name="duration"
                            value={duration || 0}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>


                <Form.Group controlId="description">
                    <Form.Label column sm="3">
                        Description
                    </Form.Label>
                    
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={description || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>





                <Form.Group controlId="genre">
                    <Form.Label column sm="3">
                        Genre
                    </Form.Label>
                    
                        <Form.Control
                            as="select"
                            name="genre"
                            value={genre || ''}
                            onChange={handleInputChange}
                            className="form-control col-span-small-6 mb-3"
                        >
                            <option value=''>Select Genre</option>
                            {ALL_GENRES.map((genre) => (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                        </Form.Control>
                    
                </Form.Group>


                <Form.Group  controlId="posterUrl">
                    <Form.Label column sm="3">
                        Poster URL
                    </Form.Label>
                        <Form.Control
                            type="text"
                            name="posterUrl"
                            value={posterUrl || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                </Form.Group>

                <Form.Group controlId="videoUrl">
                    <Form.Label column sm="3">
                        Video URL
                    </Form.Label>
                    
                        <Form.Control
                            type="text"
                            name="videoUrl"
                            value={videoUrl || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>

                <Form.Group controlId="trailerUrl">
                    <Form.Label column sm="3">
                        Trailer URL
                    </Form.Label>
                    
                        <Form.Control
                            type="text"
                            name="trailerUrl"
                            value={trailerUrl}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>

                <Form.Group controlId="soundtrackUrl">
                    <Form.Label column sm="3">
                        Soundtrack URL
                    </Form.Label>
                    
                        <Form.Control
                            type="text"
                            name="soundtrackUrl"
                            value={soundtrackUrl || ''}
                            onChange={(e) => handleInputChange(e)}
                            className="form-control col-span-small-6 mb-3"
                        />
                    
                </Form.Group>



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

                        >
                            <button
                                type='submit'
                                className='btn btn-outline-warning btn-lg'
                            >
                            Cancel
                            </button>
                        </Link>
                    </div>

                </div>

            </Form>
        </div>
            </div>
        </div>
  )
}

export default AddMetadata
