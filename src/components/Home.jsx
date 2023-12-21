import {useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import "../custom.css"
import useAuth from "../hooks/useAuth";
import QRCode from "react-qr-code";
import {axiosPrivate} from "../api/axios";
import SignOutButton from "./composes/SignOutButton";
import useUserStuff from "../hooks/useUserStuff";
import Loading from "./composes/Loading";
import FavouritesCarousel from "./composes/common/FavouritesCarousel";
import ServerInfoComponent from "./ServerInfoComponent";
import Paths from "../common/Paths";


function getHome(userStuff, favourites, isManager, isAdmin, ip, fIP) {
    return (
        <div
        //     style={{
        //     backgroundImage: `url("https://www.creativeboom.com/upload/articles/97/970e2b6cc4f8aa95f5b86d13dba063e4b0f65885_2560.jpg")`,
        //     backgroundRepeat: 'no-repeat',
        //     // width:'250px',
        // }}
        >

            <h2>Sub' {userStuff && userStuff?.username}</h2>

            {
                favourites.length > 0 ? (

                    <FavouritesCarousel favourites={favourites} />
                ) : (
                    <Loading />
                    // <p>No Fav :( ...</p>
                )
            }


            <Link hidden={!isManager} to="/editor">Go to the Editor page</Link>
            <br/>
            <Link hidden={!isAdmin} to={Paths.ADMIN}>Go to the Admin page</Link>
            {/*<Link to="/linkpage">Go to the link page</Link>*/}
            {/*<br/>*/}
            {/*<Link to="/view-metadatas">See All Metadatas</Link>*/}
            {/*<br/>*/}
            {/*<Link to="/local">See Local Stuff</Link>*/}
            {/*<br/>*/}
            {/*<Link to="/filmbuff">Film Buff</Link>*/}

            <SignOutButton/>

            <ServerInfoComponent/>



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

    const { userStuff } = useUserStuff();

    const [favourites, setFavourites] = useState([]);




    useEffect(() => {
        const controller = new AbortController();
        const getFavs = async () => {
            try {
                const response = await axiosPrivate.get('/favs/' + auth?.userId, {
                    signal: controller.signal,
                    // withCredentials: true
                });

                console.log(response.data);

                setFavourites(response.data);

            } catch (err) {
                navigate('/', {replace: true});
                console.error(err);
            }
        }

        getFavs()


        return () => {
            controller.abort();
        }


    }, [])




    return (getHome(userStuff, favourites, isManager, isAdmin))

}

export default Home
