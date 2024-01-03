
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../custom.css";
import { axiosPrivate } from "../api/axios";
import SignOutButton from "./composes/SignOutButton";
import useUserStuff from "../hooks/useUserStuff";
import Loading from "./composes/Loading";
import FavouritesCarousel from "./composes/common/FavouritesCarousel";
import ServerInfoComponent from "./ServerInfoComponent";
import Paths from "../common/Paths";
import Constants from "../common/Constants";
import { Badge, Col, Row } from "react-bootstrap";
import "./local/Local.css";
import "../experimental/x.css"
import useLoading from "../hooks/useLoading";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {

    const { userStuff } = useUserStuff();
    useDocumentTitle(`Welcome ${userStuff?.username}!`)

    useEffect(() => {
        if (localStorage.getItem('bgImage') !== Constants.COMMON_BACKGROUND_URL) {
            localStorage.setItem('bgImage', Constants.COMMON_BACKGROUND_URL);
            navigate(0)
        }
    }, []);

    const navigate = useNavigate();
    const [favourites, setFavourites] = useState([]);
    const {startLoading, stopLoading} = useLoading();

    useEffect(() => {
        startLoading();
        let isMounted = true;
        const controller = new AbortController();
        const getFavs = async () => {
            try {
                const response = await axiosPrivate.get("/favs/" + userStuff?.userId, {
                    signal: controller.signal,
                    withCredentials: true,
                });
                if (response.status === 404){
                    setFavourites([])
                } else {
                    isMounted && setFavourites(response.data);
                }
            } catch (err) {
                if (err.name !== 'CanceledError') {
                    navigate('/', {replace: true});
                }
            } finally {
                stopLoading();
            }
        };

        getFavs();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [userStuff]);



    return (
        <div style={{padding: 50}}>
            <Row style={{padding: 50}}>
                <Col md={6} className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        {favourites.length > 0 ? (
                            <FavouritesCarousel favourites={favourites} />
                        ) : (
                            <>
                                <Loading anim={'empty'} header={
                                    <p>You <br/> have <br/>no <br/>favourites<br/> yet.</p>

                                }
                                />
                            </>
                        )}
                    </div>
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <Link
                            hidden={!(userStuff?.roles?.main === Constants.ROLES.Manager)}
                            to="/editor"
                        >
                            <Badge bg={"red"}> Go to the Editor page </Badge>
                        </Link>
                        <br />
                        <Link
                            hidden={!(userStuff?.roles?.main === Constants.ROLES.Admin)}
                            to={Paths.ADMIN}
                        >
                            <Badge bg={"danger"} className={"hover-zoom"}>
                                {" "}
                                Go to the Admin page{" "}
                            </Badge>
                        </Link>
                        <div className="flexGrow hover-zoom">
                            <SignOutButton />
                        </div>
                        <ServerInfoComponent />
                    </div>
                </Col>
            </Row>
        </div>


    );
};

export default Home;

