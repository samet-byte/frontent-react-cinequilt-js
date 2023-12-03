import { useNavigate, Link } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthProvider";

import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

import QRCode from "react-qr-code";
import {axiosPrivate} from "../api/axios";


const Home = () => {
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = useLogout();

    const signOut = async () => {
        await logout();
        // navigate('/linkpage');
        navigate('/login');
    }

    const { auth } = useAuth();
    console.log(JSON.stringify(auth?.roles))
    const isAdmin = auth?.roles?.includes('ROLE_ADMIN');
    const isManager = auth?.roles?.includes('ROLE_MANAGER');
    const isUser = auth?.roles?.includes('ROLE_USER');

    const [ip, setIp] = useState('');

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getIpInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/ip`, {
                    signal: controller.signal
                });
                console.log(response.data);
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

    const fIP = "http://" + ip + ":3000";



    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    withCredentials: true
                });
                // console.log(response.data);
                setUserInfo(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUserInfo()



    }, [])

    console.log(userInfo)

    // if (userInfo)
    // substring(0,10)
    return (
        <article>
            <h1>Home</h1>
            <br />
            <p>Welcome {userInfo.username}! ({userInfo.role})</p>
            <br />
            <p>Email: {userInfo.email}</p>
            <br />
            <p>Account Creation: {userInfo && userInfo.createTime}</p>
            <br />
            <p>Country: {userInfo.country}</p>
            <br />
            {/*{*/}
            {/*    <ul>*/}
            {/*        {userInfo.authorities?.map((role, i) => <p key={i}>{role}</p>)}*/}
            {/*    </ul>*/}
            {/*}*/}
            {/*<br />*/}

            <Link hidden={!isManager} to="/editor">Go to the Editor page</Link>
            <br />
            <Link hidden={!isAdmin} to="/admin">Go to the Admin page</Link>
            <br />
            <Link hidden={(!isAdmin && !isManager)} to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <br />
            <Link to="/view-metadatas">See All Metadatas</Link>
            <br />
            <Link to="/local">See Local Stuff</Link>
            <br />
            <Link to="/filmbuff">Film Buff</Link>


            <div className="flexGrow">
            <br />
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

        </article>
    )
}

export default Home
