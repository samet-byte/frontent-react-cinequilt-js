import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Cookies from 'js-cookie';
import Loading from "./composes/Loading";
const PersistLogin = () => {

    const saveRefreshTokenToLocalStorage = (refreshToken) => {
        localStorage.setItem('refreshToken', refreshToken);
    };

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useAxiosPrivate();
    const { auth, persist } = useAuth();
    const refreshToken = Cookies.get('refreshToken');
    saveRefreshTokenToLocalStorage(refreshToken);


    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                // console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }


        !auth?.accessToken
        && persist
            ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    // useEffect(() => {
    //     // console.log(`isLoading: ${isLoading}`)
    // }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                ? <Loading anim="w" />
                    // ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin