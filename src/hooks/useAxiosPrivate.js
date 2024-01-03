import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        // Request interceptor
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error?.response?.status === 403) {
                    const prevRequest = error?.config;
                    if (prevRequest && !prevRequest?.sent) {
                        prevRequest.sent = true;
                        try {
                            const newAccessToken = await refresh();
                            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            return axiosPrivate(prevRequest);
                        } catch (refreshError) {
                            return Promise.reject(refreshError);
                        }
                    }
                }
                return Promise.reject(error);
            }
        );

        // Clean up interceptors
        return () => {
            if (requestInterceptor) {
                axiosPrivate.interceptors.request.eject(requestInterceptor);
            }
            if (responseInterceptor) {
                axiosPrivate.interceptors.response.eject(responseInterceptor);
            }
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
