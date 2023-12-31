import {useState, useEffect} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";
import Search from "../composes/Search";
import { Col, Row} from "react-bootstrap";
import MovieCard from "../composes/common/MovieCard";
import {SortView} from "../composes/SortView";
import '../../experimental/x.css'
import Paths from "../../common/Paths";
import Constants from "../../common/Constants";

function ReturnAllMetadatas(search, setSearch, sortBy, handleSortChange, sortOrder, contentType, pageSize, pageNumber, filteredMetadatas, handlePrevPage, handleNextPage, totalPages, navigate) {
    return (
        <div className="centered-container">
            <Search
                search={search}
                setSearch={setSearch}
            />


            {SortView(sortBy, handleSortChange, sortOrder, contentType, pageSize, pageNumber)}

            <Row className="mt-4">
                {filteredMetadatas.map((metadata) => (
                    <Col key={metadata.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center align-items-center"
                        onClick={() => {
                            if (localStorage.getItem('bgImage') !== metadata.backgroundImageUrl && metadata.backgroundImageUrl !== null)
                            localStorage.setItem('bgImage', metadata.backgroundImageUrl)
                            console.log(metadata.backgroundImageUrl)
                        }}
                    >
                        <div
                            onClick={() => {
                                navigate(`${Paths.METADATA_PROFILE}/${(metadata.id)}`, { replace: true })
                                navigate(0)
                            }}
                            style={{textDecoration: 'none'}}
                        >
                        <MovieCard
                            title={metadata.title?.trim()}
                            posterUrl={metadata.posterUrl}
                            releaseYear={metadata.releaseYear}
                            mediaType={metadata.type}
                            linkTo={`${Paths.METADATA_PROFILE}/${(metadata.id)}`}
                            bgImage={metadata.backgroundImageUrl}
                        />
                        </div>
                    </Col>
                ))}
            </Row>

            {/*<div className="d-flex justify-content-center align-items-center mt-3">*/}
            <div className="d-flex justify-content-center align-items-center mt-3">
                <Row>
                    <Col className="text-start">
                        <button
                            className="btn btn-primary"
                            onClick={handlePrevPage}
                            disabled={pageNumber === 1}
                        >
                            {'<'}
                        </button>
                    </Col>
                    <Col className="text-center">
                        <button className="btn btn-primary">
                            {pageNumber}/{totalPages}
                        </button>
                    </Col>
                    <Col className="text-end">
                        <button
                            className="btn btn-primary"
                            onClick={handleNextPage}
                            disabled={pageNumber === totalPages}
                        >
                            {'>'}
                        </button>
                    </Col>
                </Row>
            </div>



        </div>
    );
}

// View all of them
const AllMetadatas = () => {
    const [metadatas, setMetadatas] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [search, setSearch] = useState("");
    const searchQueryCurrent = search.toLowerCase();
    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'title');
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
    const [contentType, setContentType] = useState(localStorage.getItem('contentType') || 'ANY')
    const [pageSize, setPageSize] = useState(localStorage.getItem('pageSize') || 10);
    const [pageNumber, setPageNumber] = useState(localStorage.getItem('pageNumber') || 1);
    const [totalPages, setTotalPages] = useState(999);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('bgImage') !== Constants.COMMON_BACKGROUND_URL) {
            localStorage.setItem('bgImage', Constants.COMMON_BACKGROUND_URL);
            navigate(0)
        }
    }, []);

    const handlePrevPage = () => { setPageNumber(Number(pageNumber) - 1); }

    const handleNextPage = () => { setPageNumber(Number(pageNumber) + 1); }

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
        navigate(`${Paths.VIEW_METADATAS}`, { replace: true });
    }

    useEffect(() => {
        handleRefresh();
    }, []);


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        // setIsProcessing(true);

        const getMetadatas = async () => {
            try {
                const response = await axiosPrivate.get(`/metadatas/search/list?sortBy=${sortBy}&sortDirection=${sortOrder}&type=${contentType}&pageSize=${pageSize}&pageNumber=${pageNumber}`
                    , {
                    signal: controller.signal
                });
                // console.log('Data fetched successfully');
                // console.log(response.data);
                setTotalPages(response.data.totalPages)
                isMounted && setMetadatas(response.data.content);
            } catch (err) {
                console.log(err);
                //todo: uncomment
                /*if (err.name !== 'CanceledError') { // Ignore canceled requests, without this 'return' statement, called immediately
                    err.response?.status === 403
                        ? alert(err.name + ' -> Unauthorized or Access Token Expired')
                        : alert(err.name + ' -> ' + err.message);
                    navigate('/login', { state: { from: location }, replace: true });
                }*/
            } finally {
                // setIsProcessing(false);
            }
        }

        getMetadatas();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [sortOrder, sortBy, contentType, pageSize, pageNumber, axiosPrivate])

    //responseText

    const filteredMetadatas = metadatas.filter((mt) =>
        mt.title.toLowerCase().includes(searchQueryCurrent) ||
        mt.director.toLowerCase().includes(searchQueryCurrent) ||
        mt.releaseYear.toString().toLowerCase().includes(searchQueryCurrent)
    );


    return (
        // !isProcessing ?
        <div >
            {ReturnAllMetadatas(search, setSearch, sortBy, handleSortChange, sortOrder, contentType, pageSize, pageNumber, filteredMetadatas, handlePrevPage, handleNextPage, totalPages, navigate)}
        </div>
            // : <Loading anim={'m1'} size={'100px'}/>
    )

};

export default AllMetadatas;
