import axios from "../api/axios";
import useAuth from "./useAuth";
import Cookies from 'js-cookie';
import useUserStuff from "./useUserStuff";

const useLogout = () => {
    const { setAuth, auth } = useAuth();
    const { clearUserStuff } = useUserStuff();

    return async () => {
        const accessToken = auth?.accessToken;
        console.log(`accessToken: ${accessToken}`);
        setAuth({});
        clearUserStuff();
        Cookies.remove('refreshToken');
        localStorage.removeItem('refreshToken');

        try {
            // const response =
                await axios('/auth/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken} `

                },
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    };
}

export default useLogout