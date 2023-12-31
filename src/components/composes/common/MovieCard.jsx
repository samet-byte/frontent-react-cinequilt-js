// Author: sametbayat
// Dec 04, 2023 9:04 PM



import React from 'react';
import { Card } from 'react-bootstrap';
import './MovieCard.css';
import {Link} from "react-router-dom";
import useUserStuff from "../../../hooks/useUserStuff";
import {DeleteMetadataButton} from "../DeleteMetadataButton";
import Constants from "../../../common/Constants";
import {useBgImage} from "../../../hooks/useBgImage"; // Import the external stylesheet


const MovieCard = ({ title, releaseYear, mediaType, posterUrl, linkTo, bgImage }) => {

    const { setBgImageHandler } = useBgImage();

    return (
        <Card className={'movie-card center-div'} key={title} style={{backgroundColor: 'transparent'}}
              onClick={() => {
                  if (localStorage.getItem('bgImage') !== bgImage && bgImage !== null)
                  setBgImageHandler(bgImage)
                  bgImage &&  localStorage.setItem('bgImage', bgImage)
                  console.log("set:: " + bgImage)

              }
              }
        >
        {/* Dimmed poster image */}
            <Card.Img
                variant="top"
                src={posterUrl}
                alt={`${title} Poster`}
                style={{ filter: 'brightness(50%)', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                loading={'lazy'}

            />

            {/* Icon for movie or TV show in upper right corner */}
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: '#fff',
                    fontSize: '24px',
                }}
            >
                {mediaType === 'TV_SHOW' ? '📺' : '🎬'}
            </div>

            {/* Title and release year in bottom left corner */}
            <Card.Body
                style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    right: 10,
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Card.Title>{title}</Card.Title>
                <Card.Text>{`${releaseYear}`}</Card.Text>
            </Card.Body>

             {/*Link to "/info"*/}
            <Link
                to={linkTo}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />
        </Card>
    );
};

export default MovieCard;

