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
                'Authorization': `Bearer ${Cookies.get('refreshToken')} `
            },
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                userId: response.data.userId
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
