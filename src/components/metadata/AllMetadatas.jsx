import {useState, useEffect} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";
import Search from "../composes/Search";

import OffCanvasFilter from "../OffCanvasFilter";

import { Col, Row} from "react-bootstrap";
import MovieCard from "../composes/common/MovieCard";
import Loading from "../composes/Loading";

function SortView(sortBy, handleSortChange, sortOrder, contentType, pageSize, pageNumber) {

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
                            <option value="releaseYear">Release Year</option>
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
                <div>
                    <label className="form-label">
                        Page Size:
                        <input
                            className="form-control"
                            type="number"
                            name="pageSize"
                            min="1"
                            max="100" //change
                            value={pageSize}
                            onChange={handleSortChange}
                        ></input>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Page Number:
                        <input
                            className="form-control"
                            type="number"
                            name="pageNumber"
                            min="1"
                            max="100" //change
                            value={pageNumber}
                            onChange={handleSortChange}
                        ></input>
                    </label>
                </div>
            </div>
        }
        />
}

function ReturnAllMetadatas(search, setSearch, sortBy, handleSortChange, sortOrder, contentType, pageSize, pageNumber, filteredMetadatas) {
    return (
        <div className="centered-container">
            <Search
                search={search}
                setSearch={setSearch}
            />


            {SortView(sortBy, handleSortChange, sortOrder, contentType, pageSize, pageNumber)}

            <Row className="mt-4">
                {filteredMetadatas.map((metadata, index) => (
                    <Col key={metadata.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <MovieCard
                            title={metadata.title?.trim()}
                            posterUrl={metadata.posterUrl}
                            releaseYear={metadata.releaseYear}
                            mediaType={metadata.type}
                            // linkTo={`/metadata-profile/${metadata.title}`}
                        />
                    </Col>
                ))}
            </Row>

        </div>
    );
}

const AllMetadatas = () => {
    const [metadatas, setMetadatas] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const searchQueryCurrent = search.toLowerCase();


    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'title');
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
    const [contentType, setContentType] = useState(localStorage.getItem('contentType') || 'ANY')

    const [pageSize, setPageSize] = useState(localStorage.getItem('pageSize') || 10);

    const [pageNumber, setPageNumber] = useState(localStorage.getItem('pageNumber') || 1);

    const [isProcessing, setIsProcessing] = useState(false);

    const handleSortChange = (event) => {
        const { name, value } = event.target;

        if (name === 'sortBy') {
            setSortBy(value)
            localStorage.setItem('sortBy', value);
        } else if (name === 'sortOrder') {
            setSortOrder(value)
            localStorage.setItem('sortOrder', value);
        } else if (name === 'contentType'){
            setContentType(value)
            localStorage.setItem('contentType', value)
        } else if (name === 'pageSize'){
            setPageSize(value)
            localStorage.setItem('pageSize', value)
        } else if (name === 'pageNumber'){
            setPageNumber(value)
            localStorage.setItem('pageNumber', value)
        }
            console.log(value)
    };

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
                // ?by=${sortBy}&order=${sortOrder}&val=${contentType}&col=type`

    }, [searchQueryCurrent])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        setIsProcessing(true);

        const getMetadatas = async () => {
            try {
                const response = await axiosPrivate.get(`/metadatas/search/list?sortBy=${sortBy}&sortDirection=${sortOrder}&type=${contentType}&pageSize=${pageSize}&pageNumber=${pageNumber}`
                    , {
                    signal: controller.signal
                });
                console.log('Data fetched successfully');
                console.log(response.data);
                isMounted && setMetadatas(response.data.content);
            } catch (err) {
                console.log(err);
                /*if (err.name !== 'CanceledError') { // Ignore canceled requests, without this 'return' statement, called immediately
                    err.response?.status === 403
                        ? alert(err.name + ' -> Unauthorized or Access Token Expired')
                        : alert(err.name + ' -> ' + err.message);
                    navigate('/login', { state: { from: location }, replace: true });
                }*/
            } finally {
                setIsProcessing(false);
            }
        }

        getMetadatas();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [sortOrder, sortBy, contentType, pageSize, pageNumber])

    //responseText

    const filteredMetadatas = metadatas.filter((mt) =>
        mt.title.toLowerCase().includes(searchQueryCurrent) ||
        mt.director.toLowerCase().includes(searchQueryCurrent) ||
        mt.releaseYear.toString().toLowerCase().includes(searchQueryCurrent)
    );

    return (
        !isProcessing ?
        ReturnAllMetadatas(search, setSearch, sortBy, handleSortChange, sortOrder, contentType, pageSize, pageNumber, filteredMetadatas)
            : <Loading anim={'m1'} size={'100px'}/>
    )

};

export default AllMetadatas;
