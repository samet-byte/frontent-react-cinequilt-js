// Author: sametbayat
// Dec 04, 2023 9:04 PM

import React from 'react';


const MovieCard = ({ title, year, posterUrl }) => {
    return (
        <div className="card mb-3 justify-content-center" style={styles.card}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={posterUrl} alt="Movie Poster" className="img-fluid" style={styles.image} loading="lazy"/>
                </div>
                <div className="col-md-8 d-flex align-items-center">
                    <div className="p-3">
                        <h6>{title}</h6>
                        <p>{year}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        maxWidth: '400px',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
};

export default MovieCard;
