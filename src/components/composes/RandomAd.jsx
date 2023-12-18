// Author: sametbayat
// Dec 13, 2023 9:22 PM

import React, {useState} from 'react';

import image1 from '../../assets/advertisement/add_1.jpg';
import image2 from '../../assets/advertisement/add_2.jpg';
import image3 from '../../assets/advertisement/add_3.jpg';
import image4 from '../../assets/advertisement/add_4.jpg';
import image5 from '../../assets/advertisement/add_5.webp';
import image6 from '../../assets/advertisement/add_6.jpeg';
import image7 from '../../assets/advertisement/add_7.webp';
import image8 from '../../assets/advertisement/add_8.webp';
import image9 from '../../assets/advertisement/add_9.webp';
import image10 from '../../assets/advertisement/add_10.webp';
import image11 from '../../assets/advertisement/add_11.webp';
import image12 from '../../assets/advertisement/add_12.jpeg';
import image13 from '../../assets/advertisement/add_13.webp';
import image14 from '../../assets/advertisement/add_14.webp';
import image15 from '../../assets/advertisement/add_15.webp';
import image16 from '../../assets/advertisement/add_16.webp';


function RandomAd(props) {

    const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16];

    const getRandomIndex = () => Math.floor(Math.random() * images.length);

    const [randomImage] = useState(images[getRandomIndex()]);

    const handleImageClick = () => {

        window.location.href = 'https://sametb.com';
    };

    return (

        <div>
            <img
                src={randomImage}
                alt="Random Advertisement"
                width="100%"
                style={{borderRadius: '10px', cursor: 'pointer'}}
                onClick={handleImageClick}
            />

        </div>
    );
}

export default RandomAd;