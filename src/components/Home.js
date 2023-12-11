import { useNavigate, Link } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import "../custom.css"

import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

import QRCode from "react-qr-code";
import {axiosPrivate} from "../api/axios";
import MovieCard from "./composes/common/MovieCard";

function getHome(userInfo, favourites, isManager, isAdmin, signOut, ip, fIP) {
    return (
        <home>
            {/*<h1>Home</h1>*/}
            {/*<br />*/}
            {userInfo ? (
                <div className="home-user-info">
                    {/*todo: fetch via auth response*/}
                    <h3>User Info</h3>
                    {<p>Id: {userInfo.id}</p>}
                    {userInfo.username && <p>Username: {userInfo.username}</p>}
                    {userInfo.email && <p>Email: {userInfo.email}</p>}
                    {userInfo.country && <p>Country: {userInfo.country}</p>}
                    {userInfo.role && <p>Roles: {userInfo.role}</p>}

                </div>

            ) : (
                <p>Loading...</p>
            )}

            <br/>
            <br/>

            {
                favourites.length > 0 ? (
                    <div className="home-user-info center-item">
                        <h3>Favourites</h3>
                        {favourites.map((favourite) => (
                            <p key={favourite.id}>
                                <Link to={`metadata-profile/${favourite.title}`}>
                                    <MovieCard
                                        title={favourite.title}
                                        posterUrl={favourite.posterUrl}
                                    />
                                </Link>
                            </p>
                        ))}
                    </div>
                ) : (
                    <p>No Fav :( ...</p>
                )
            }


            <Link hidden={!isManager} to="/editor">Go to the Editor page</Link>
            <br/>
            <Link hidden={!isAdmin} to="/admin">Go to the Admin page</Link>
            <br/>
            <Link hidden={(!isAdmin && !isManager)} to="/lounge">Go to the Lounge</Link>
            <br/>
            <Link to="/linkpage">Go to the link page</Link>
            <br/>
            <Link to="/view-metadatas">See All Metadatas</Link>
            <br/>
            <Link to="/local">See Local Stuff</Link>
            <br/>
            <Link to="/filmbuff">Film Buff</Link>


            <div className="flexGrow">
                <br/>
                <button
                    className="btn btn-primary"
                    onClick={signOut}
                >
                    Sign Out
                </button>
            </div>


            {ip !== '' && ip !== undefined && ip !== null &&
                <>

                    <br/>
                    <p>Scan this QR code to access the server from your phone</p>
                    <p>IP Address: {fIP}</p>
                    <QRCode
                        // value is ip address of the server
                        size={200}
                        bgColor="white"
                        fgColor="black"
                        value={fIP}
                    />
                </>
            }

        </home>
    );
}

const Home = () => {
    const navigate = useNavigate();


    const logout = useLogout();

    const signOut = async () => {
        await logout();
        // navigate('/linkpage');
        navigate('/login');
    }

    const { auth } = useAuth();
    // console.log(JSON.stringify(auth?.roles))
    const isAdmin = auth?.roles?.includes('ROLE_ADMIN');
    const isManager = auth?.roles?.includes('ROLE_MANAGER');
    // const isUser = auth?.roles?.includes('ROLE_USER');

    const [ip, setIp] = useState('');


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getIpInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/ip`, {
                    signal: controller.signal
                });
                // console.log(response.data);
                setIp(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getIpInfo();
        console.log(ip)

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    // const fIP = "http://" + ip + ":3000";



    const [userInfo, setUserInfo] = useState(null);
    const [favourites, setFavourites] = useState([]);
    // const [fIP, setfIP]  = useState("http://" + ip + ":3000" + (localStorage.getItem('username') ? `/login/${localStorage.getItem('username')}` : ''))

    // useEffect(() => {
    //     setfIP("http://" + ip + ":3000" + (localStorage.getItem('username') ? `/login/${localStorage.getItem('username')}` : ''))
    // }, [ip]);

    const fIP = "http://" + ip + ":3000";

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUserInfo = async () => {
            try {
                const response = await axiosPrivate.get('/users' + "/id/" + auth?.userId, { //todo: auth and auth reponse
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log(response.status)
                if(response.status === 403) {
                    navigate('/');
                }
                setUserInfo(response.data);

            } catch (err) {
                    navigate('/', { replace: true });
                console.error(err);
            }
        }

        getUserInfo()


        return () => {
            isMounted = false;
            controller.abort();
        }


    }, [])


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getFavs = async () => {
            try {
                const response = await axiosPrivate.get('/favs' + "/" + auth?.userId, {
                    signal: controller.signal,
                    withCredentials: true
                });

                console.log(response.data);

                setFavourites(response.data);

            } catch (err) {
                    navigate('/', { replace: true });
                console.error(err);
            }
        }

        getFavs()


        return () => {
            isMounted = false;
            controller.abort();
        }


    }, [])


    // if (userInfo)
    // substring(0,10)
    if (userInfo && userInfo.country !== 'tr')
    return getHome(userInfo, favourites, isManager, isAdmin, signOut, ip, fIP)
     else {
        return navigate('/service-unavailable', { replace: true });
    }
}

export default Home
