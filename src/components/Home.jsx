import {useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import "../custom.css"
import useAuth from "../hooks/useAuth";
import QRCode from "react-qr-code";
import {axiosPrivate} from "../api/axios";
import MovieCard from "./composes/common/MovieCard";
import SignOutButton from "./composes/SignOutButton";
import useUserStuff from "../hooks/useUserStuff";


function getHome(userStuff, favourites, isManager, isAdmin, ip, fIP) {
    return (
        <div>

            <h2>Sub' {userStuff && userStuff?.username}</h2>

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
            <Link to="/linkpage">Go to the link page</Link>
            <br/>
            <Link to="/view-metadatas">See All Metadatas</Link>
            <br/>
            <Link to="/local">See Local Stuff</Link>
            <br/>
            <Link to="/filmbuff">Film Buff</Link>

            <SignOutButton/>

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

        </div>
    );
}

const Home = () => {
    const navigate = useNavigate();

    const {auth} = useAuth();
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
    },
        // []
    )


    // const fIP = "http://" + ip + ":3000";

    const { userStuff } = useUserStuff();

    const [favourites, setFavourites] = useState([]);
    // const [fIP, setfIP]  = useState("http://" + ip + ":3000" + (localStorage.getItem('username') ? `/login/${localStorage.getItem('username')}` : ''))

    // useEffect(() => {
    //     setfIP("http://" + ip + ":3000" + (localStorage.getItem('username') ? `/login/${localStorage.getItem('username')}` : ''))
    // }, [ip]);

    const fIP = "http://" + ip + ":3000";

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();
    //     const getUserInfo = async () => {
    //         try {
    //             const response = await axiosPrivate.get('/users' + "/id/" + auth?.userId, { //todo: auth and auth reponse
    //                 signal: controller.signal,
    //                 withCredentials: true
    //             });
    //             // console.log(response.status)
    //             if (response.status === 403) {
    //                 navigate('/');
    //             }
    //             setUserInfo(response.data);
    //
    //         } catch (err) {
    //             navigate('/', {replace: true});
    //             console.error(err);
    //         }
    //     }
    //
    //     getUserInfo()
    //
    //
    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }
    //
    //
    // }, [])


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getFavs = async () => {
            try {
                const response = await axiosPrivate.get('/favs' + "/" + auth?.userId, {
                    signal: controller.signal,
                    // withCredentials: true
                });

                // console.log(response.data);

                setFavourites(response.data);

            } catch (err) {
                navigate('/', {replace: true});
                console.error(err);
            }
        }

        getFavs()


        return () => {
            isMounted = false;
            controller.abort();
        }


    }, [])




    return (getHome(userStuff, favourites, isManager, isAdmin, ip, fIP))

}

export default Home
