import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useNavigate, useLocation, Link} from "react-router-dom";
import Search from "../composes/Search";
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import SearchOnGoogle from "../composes/SearchOnGoogle";
import SearchTinyButton from "../composes/SearchTinyButton";
import {Table} from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";


const AllMetadatas = () => {
    const [metadatas, setMetadatas] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState("");
    const searchQueryCurrent = search.toLowerCase();
    const { auth } = useAuth();


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

            setMetadatas(metadatas.filter((metadata) => metadata.id !== id));
            // handleRefresh();
            // navigate("/view-metadatas", { replace: true });
        } catch (error) {
            // Handle the error appropriately, e.g., log it or show a user-friendly message
            console.error('Error saving metadata:', error);
        }
    };


    const actionsSize = 5e2;


    const handleRefresh = () => {
        navigate('/view-metadatas', { replace: true });
    }

    useEffect(() => {
        handleRefresh();
    }, []);

    useEffect(() => {

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                searchQueryCurrent('');
            }
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'r') {
                // Call the handleRefresh function
                handleRefresh();
            }
        };

    }, [searchQueryCurrent])



    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getMetadatas = async () => {
            try {
                const response = await axiosPrivate.get('/metadatas', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setMetadatas(response.data);
            } catch (err) {
                console.log(err);
                if (err.name !== 'CanceledError') { // Ignore canceled requests, without this 'return' statement, called immediately
                    err.response?.status === 403
                        ? alert(err.name + ' -> Unauthorized or Access Token Expired')
                        : alert(err.name + ' -> ' + err.message);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
        }

        getMetadatas();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const filteredMetadatas = metadatas.filter((mt) =>
        mt.title.toLowerCase().includes(searchQueryCurrent) ||
        mt.director.toLowerCase().includes(searchQueryCurrent) ||
        mt.releaseYear.toString().toLowerCase().includes(searchQueryCurrent)
    );

    return (
        <sam>
            {/* Search component */}
            <Search
                search={search}
                setSearch={setSearch}
            />

            {/* Bootstrap Table */}
            <table className='table table-bordered table-hover shadow'>
                <thead>
                <tr className='text-center'>
                    <th colSpan={2}>ID</th>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Release Year</th>
                    <th>Duration</th>
                    <th colSpan={actionsSize}>Actions</th>
                </tr>
                </thead>

                <tbody className="text-center">
                {filteredMetadatas.map((metadata, index) => (
                    <tr key={metadata.id}>
                        {/* <Link to={`/metadata-profile/${metadata.id}`}> */}
                        <th scope="row" key={index}>{1 + index}</th>
                        <Link to={`/metadata-profile/${metadata.title}`} className="btn btn-info">
                            {/*<Link to={`/metadata-profile/${metadata.id}`} className="btn btn-info">*/}
                            <td>
                                <img width={270/2} height={370/2} src={metadata.posterUrl} alt={metadata.title}></img>
                            </td>
                        </Link>
                        {/* <td>{metadata.id}</td> */}
                        {/*<Link to={`/metadata-profile/${metadata.id}`} className="btn btn-info">*/}
                        <td>{metadata.title}</td>
                        {/*</Link>*/}
                        <td>{metadata.director}</td>
                        <td>{metadata.releaseYear}</td>
                        <td>{metadata.duration}</td>
                        {/*.{metadata.videoUrl}.*/}
                        <td className='mx-2'>
                            {/*<Link to={`/metadata-profile/${metadata.id}`} className="btn btn-info">*/}
                            <Link to={`/metadata-profile/${metadata.title}`} className="btn btn-info">
                                <FaEye />
                            </Link>
                        </td>
                        <td className='mx-2'>
                            <Link to={`/edit-metadata/${metadata.id}`} className="btn btn-warning">
                                <FaEdit />
                            </Link>
                        </td>
                        <td className='mx-2'>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(metadata.id)}
                            >
                                <FaTrashAlt />
                            </button>
                        </td>
                        <td className='mx-2'>

                            <SearchOnGoogle metadata={metadata.title} query={`${metadata.title} ${metadata.director} ${metadata.releaseYear}`} />
                        </td>
                        <td className='mx-2'>
                            <SearchTinyButton btnCls="btn-secondary" metadata={metadata} query={`https://en.wikipedia.org/wiki/Special:Search/${encodeURIComponent(`${metadata.title}_film`)}`} />
                        </td>
                        {/* <td>


                  <button className="btn btn-danger">Delete</button>
                </td> */}
                        {/* </Link> */}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Refresh button */}
            {/*<button onClick={() => navigate('/metadatas', {replace: true})}>Refresh</button>*/}
        </sam>
    );

};

export default AllMetadatas;
