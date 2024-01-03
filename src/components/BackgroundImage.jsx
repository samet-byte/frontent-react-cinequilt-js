// Author: sametbayat
// Dec 27, 2023 9:00 PM
import React, {useEffect, useState} from 'react';
import { useBgImage } from "../hooks/useBgImage";
import '../experimental/x.css';


function BackgroundImage({ children }) {
    const [bgImageView, setBgImageView] = useState(localStorage.getItem('bgImage') || '');
    const { bgImage } = useBgImage();

    // useEffect(() => {
    //     console.log('BG new:' + bgImage)
    //     setBgImageView(bgImage);
    // }, [bgImage, bgImageView]);

    useEffect(() => {
        const storedValue = localStorage.getItem('bgImage') || '';
        setBgImageView(storedValue);
    }, []);


    // Update bgImageView when bgImage changes
    useEffect(() => {
        console.log('BG new:' + bgImage);
        setBgImageView(bgImage);
    }, [bgImage]);

    // Update bgImageView when bgImageView changes
    useEffect(() => {
        console.log('BG view new:' + bgImageView);
        // Perform any additional actions here if needed
    }, [bgImageView]);

    const blurStyle = {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        background: `url("${bgImageView}") center center / cover fixed`,
        filter: 'blur(3px)',
    };

    const backgroundImageStyle = {
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
    };

    const childStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxHeight: '99%',
        overflow: 'auto',
        zIndex: 14,
        paddingTop: '100px' // ensure it's not hidden behind the navbar
    };

    return (
        <div key={bgImageView} style={backgroundImageStyle}>
            <div style={blurStyle}></div>
            {children && (
                <div style={childStyle}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default BackgroundImage;
