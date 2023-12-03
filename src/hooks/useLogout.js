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
        try {
            const response = await axios('/auth/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`

                },
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout