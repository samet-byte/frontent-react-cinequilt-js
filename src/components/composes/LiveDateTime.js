// Author: sametbayat
// Jan 02, 2024 10:57 PM

import React, { useState, useEffect } from 'react';

const LiveDateTime = () => {
    const [liveDateTime, setLiveDateTime] = useState('');

    const updateLiveDateTime = () => {
        const currentDate = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
        const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);

        setLiveDateTime(`${formattedDate} ${formattedTime}`);
    };

    useEffect(() => {
        // Update every second
        const intervalId = setInterval(updateLiveDateTime, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);

        // Initial call to set the content immediately
        updateLiveDateTime();
    }, []);

    return <p>{liveDateTime}</p>;
};

export default LiveDateTime;
