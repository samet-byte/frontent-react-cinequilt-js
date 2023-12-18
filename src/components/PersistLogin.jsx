import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Cookies from 'js-cookie';
const PersistLogin = () => {

    const saveRefreshTokenToLocalStorage = (refreshToken) => {
        localStorage.setItem('refreshToken', refreshToken);
    };

    const [isLoading, setIsLoading] = useState(true);
    // const refresh = useRefreshToken();
    const refresh = useAxiosPrivate();

    const { auth, persist } = useAuth();


    // console.log('All Cookies:', document.cookie);
    const refreshToken = Cookies.get('refreshToken');
    const refreshTokenLocal = localStorage.getItem('refreshToken');
    saveRefreshTokenToLocalStorage(refreshToken);

    // console.log('refreshTokenLocal: ' + refreshTokenLocal)

    // Now you can use the refreshToken as needed
    // console.log('Refresh Token:', refreshToken);

    // console.log(`auth: ${JSON.stringify(auth)}`)

    // console.log("ref js-cook: " + Cookies.get('refreshToken'))

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken
        //&& persist                                           //todo : uncomment this line to enable persist
            ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin