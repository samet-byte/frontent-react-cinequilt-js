// Author: sametbayat
// Dec 20, 2023 8:41 PM

import { useState, useEffect } from 'react';
import {axiosPrivate} from "../api/axios";

const useServerInfo = () => {
    // const [serverInfo, setServerInfo] = useState(null);

    const [serverIP, setServerIP] = useState('');


    useEffect(() => {
            const controller = new AbortController();

            const getIpInfo = async () => {
                try {
                    const response = await axiosPrivate.get(`/ip`, {
                        signal: controller.signal
                    });
                    setServerIP(response.data);
                } catch (err) {
                    console.error(err);
                }
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


