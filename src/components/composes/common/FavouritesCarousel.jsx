// Author: sametbayat
// Dec 19, 2023 6:10 PM

import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import './MovieCard.css';

const FavouritesCarousel = ({ favourites }) => {
    return (
        <div className={'centered-container custom-rounded'}>
        <h3>Favourites</h3>
        <div className="home-user-info movie-card custom-rounded">
            <Carousel
                controls={true}
                interval={null}
                pause={false}
                indicators={false}
                nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
                prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
                className="mx-auto custom-rounded"
                style={{ width: '100%', borderRadius: '10px' }}
            >
                {favourites.map((favourite) => (
                    <Carousel.Item key={favourite.id} className="custom-carousel custom-rounded"
                    >
                        <Link to={`metadata-profile/${favourite.title}`} key={favourite.id}>
                            <MovieCard
                                title={favourite.title?.trim()}
                                posterUrl={favourite.posterUrl}
                                releaseYear={favourite.releaseYear}
                                mediaType={favourite.type}
                                linkTo={`metadata-profile/${favourite.title}`}
                            />
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
        </div>
    );
};

export default FavouritesCarousel;
