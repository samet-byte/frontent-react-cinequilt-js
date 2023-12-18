// VideoEmbed.js

import React from 'react';

const VideoEmbed = ({ embedUrl }) => {
    // const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    if(embedUrl == null || embedUrl.trim().length < 5){return;}
    return (
        <div className="video-embed-container">
            <iframe
                title="Embedded Video"
                width="560"
                height="315"
                src={embedUrl}
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default VideoEmbed;
