// Author: sametbayat
// Dec 20, 2023 8:43 PM


import React from 'react';
import useServerInfo from '../hooks/useServerInfo';
import QRCode from "react-qr-code";

const ServerInfoComponent = () => {
    const ip = useServerInfo();

    const finalIP = "http://" + ip + ":3000";

    return (
        (ip !== '' && ip !== undefined && ip !== null) ?
        <>
            <br/>
            <p>Scan this QR code to access the server from your phone</p>
            <p>IP Address: {finalIP}</p>
            <QRCode
                // value is ip address of the server
                size={200}
                bgColor="transparent"
                fgColor="black"
                value={finalIP}
            />
        </>
            : <p>Loading server info...</p>

    );
};

export default ServerInfoComponent;
