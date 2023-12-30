// Author: sametbayat
// Dec 26, 2023 12:37 AM

import {useState} from 'react';

export const useBgImage = () => {
    const [bgImage, setBgImage] = useState(localStorage.getItem('bgImage') || null);

    // const setBgImageHandler = (image) => {
    //     setBgImage(image);
    //     localStorage.setItem('bgImage', image)
    // };

    const setBgImageHandler = (image, callback) => {
        setBgImage(image);
        localStorage.setItem('bgImage', image);
        callback && callback();
    };


    return {
        bgImage,
        setBgImageHandler,
    };
}