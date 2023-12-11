import axios from "../api/axios";
import useAuth from "./useAuth";
import Cookies from 'js-cookie';

const useLogout = () => {
    const { setAuth, auth } = useAuth();

    const logout = async () => {
        const accessToken = auth?.accessToken;
        console.log(`accessToken: ${accessToken}`);
        setAuth({});
            Cookies.remove('refreshToken');
            localStorage.removeItem('refreshToken');
            if (localStorage.getItem('persist') === 'false') {
                localStorage.removeItem('username');
            }
        try {
            const response = await axios('/auth/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken} `

                },
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }

        // logout();

    }

    return logout;
}

export default useLogout