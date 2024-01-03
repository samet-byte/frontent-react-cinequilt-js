// Author: sametbayat
// Dec 19, 2023 6:10 PM

import React from 'react';
import { Carousel } from 'react-bootstrap';
import MovieCard from './MovieCard';
import './MovieCard.css';
import Paths from "../../../common/Paths";

const FavouritesCarousel = ({ favourites }) => {
    return (
        <div className={'centered-container movie-card custom-rounded'} style={{backgroundColor: 'transparent'}}>
        <h3>Favourites</h3>
            {/*// custom-rounded">*/}
        <div className="home-user-info movie-card custom-rounded" style={{backgroundColor: 'transparent'}}>
            <Carousel
                key={'carousel'}
                controls={true}
                interval={null}
                pause={false}
                indicators={false}
                nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
                prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
                className="mx-auto"
                style={{ width: '100%', borderRadius: '10px', backgroundColor: 'transparent'}}
            >
                {favourites.map((favourite) => (
                    <Carousel.Item key={favourite.metadataId} className="custom-carousel custom-rounded"
                    >
                            <MovieCard
                                title={favourite.title?.trim()}
                                posterUrl={favourite.posterUrl}
                                releaseYear={favourite.releaseYear}
                                mediaType={favourite.type}
                                linkTo={`${Paths.METADATA_PROFILE}/${favourite.metadataId}`}
                            />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
        </div>
    );
};

export default FavouritesCarousel;
