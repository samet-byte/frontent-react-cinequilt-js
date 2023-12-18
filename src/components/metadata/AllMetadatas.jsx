import {useState, useEffect, useCallback} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useNavigate, useLocation, Link} from "react-router-dom";
import Search from "../composes/Search";
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import SearchOnGoogle from "../composes/SearchOnGoogle";
import SearchTinyButton from "../composes/SearchTinyButton";
import useAuth from "../../hooks/useAuth";
import OffCanvasFilter from "../OffCanvasFilter";
import {ShouldShow} from "../../common/ShouldShow";
import {DeleteMetadataButton} from "../composes/DeleteMetadataButton";
import Constants from "../../common/Constants";

function SortView(sortBy, handleSortChange, sortOrder, contentType) {
    return <OffCanvasFilter
        title={'Filter & Sort Content'}
        content={
            <div className="container mt-4">
                <div>
                    <label className="form-label">
                        Sort By:
                        <select className="form-select" name="sortBy" value={sortBy} onChange={handleSortChange}>
                            <option value="title">Title</option>
                            <option value="director">Director</option>
                            <option value="release_year">Release Year</option>
                            <option value="duration">Duration</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Sort Order:
                        <select className="form-select" name="sortOrder" value={sortOrder} onChange={handleSortChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Content Type:
                        <select className="form-select" name="contentType" value={contentType} onChange={handleSortChange}>
                            <option value="MOVIE">Movie</option>
                            <option value="TV_SHOW">TV Show</option>
                            <option value="ANY">Any</option>
                        </select>
                    </label>
                </div>
            </div>
        }
        />
}

const AllMetadatas = () => {
    const [metadatas, setMetadatas] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState("");
    const searchQueryCurrent = search.toLowerCase();
    const { auth } = useAuth();


    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'title');
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
    const [contentType, setContentType] = useState(localStorage.getItem('contentType') || 'ANY')

    const handleSortChange = (event) => {
        const { name, value } = event.target;

        if (name === 'sortBy') {
            setSortBy(value);
            localStorage.setItem('sortBy', value);
        } else if (name === 'sortOrder') {
            setSortOrder(value);
            localStorage.setItem('sortOrder', value);
        } else if (name === 'contentType'){
            setContentType(value)
            localStorage.setItem('contentType', value)
            console.log(value)
        }
    };


    // const actionsSize = 5e2;


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
                const response = await axiosPrivate.get(`/metadatas?by=${sortBy}&order=${sortOrder}&val=${contentType}&col=type`, {
                    signal: controller.signal
                });
                console.log('Data fetched successfully');
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
    }, [sortOrder, sortBy, contentType])

    //responseText

    const filteredMetadatas = metadatas.filter((mt) =>
        mt.title.toLowerCase().includes(searchQueryCurrent) ||
        mt.director.toLowerCase().includes(searchQueryCurrent) ||
        mt.releaseYear.toString().toLowerCase().includes(searchQueryCurrent)
    );

    return (
        <div className="centered-container">
            <Search
                search={search}
                setSearch={setSearch}
            />



            <table  className='table table-responsive table-bordered table-hover shadow'>
                <thead>
                <tr className='text-center'>
                    <th colSpan={2}>{SortView(sortBy, handleSortChange, sortOrder, contentType)}</th>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Release Year</th>
                    <th>Duration</th>
                    <th>Genre</th>
                    <th>Type</th>
                    {/*<th colSpan={actionsSize}>Actions</th>*/}
                </tr>
                </thead>

                <tbody className="text-center">
                {filteredMetadatas.map((metadata, index) => (

                // <Link to={`/metadata-profile/${metadata.title}`} className="btn btn-info">
                    <tr key={metadata.id}>
                        <th scope="row" key={index}>{metadata.id}</th>
                        <Link to={`/metadata-profile/${metadata.title}`} className="btn btn-info">
                            <td>
                                <img
                                    width={270 / 2}
                                    height={370 / 2}
                                    src={metadata.posterUrl}
                                    alt={metadata.title}
                                    loading={'lazy'}
                                />
                            </td>
                        </Link>

                        <td>{metadata.title}</td>
                        <td>{metadata.director}</td>
                        <td>{metadata.releaseYear}</td>
                        <td>{metadata.duration}</td>
                        <td>{metadata.genre}</td>
                        <td>{metadata.type}</td>


                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

};

export default AllMetadatas;
