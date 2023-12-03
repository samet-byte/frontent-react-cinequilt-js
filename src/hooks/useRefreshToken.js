import axios from '../api/axios';
import useAuth from './useAuth';
import Cookies from 'js-cookie';

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();
    // console.log(`auth: ${JSON.stringify(auth)}`);
    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('refreshToken')}`
            },
            withCredentials: true
        });
        console.log(response)
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
