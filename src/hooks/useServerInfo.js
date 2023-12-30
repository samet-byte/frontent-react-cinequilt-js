// Author: sametbayat
// Dec 20, 2023 8:41 PM

import { useState, useEffect } from 'react';
import {axiosPrivate} from "../api/axios";

const useServerInfo = () => {

    const [serverIP, setServerIP] = useState('');

    useEffect(() => {
            const controller = new AbortController();

            const getIpInfo = async () => {
                try {
                    const response = await axiosPrivate.get(`/ip`, {
                        signal: controller.signal
                    });
                    setServerIP(response.data);
                } catch (err) {}
            }

            getIpInfo();

            return () => {
                controller.abort();
            }
        },
    );

    return serverIP;
};

export default useServerInfo;


