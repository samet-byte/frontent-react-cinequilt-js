// Author: sametbayat
// Dec 14, 2023 2:18 PM

import React, {useEffect, useState} from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaPlayCircle } from 'react-icons/fa';
import CustomPlayer from "../video/CustomPlayer";
import VideoEmbed from "../video/VideoEmbed";

const RowEpisode = ({ episode }) => {



    const tooltip = (
        <Tooltip key={episode.episode} id={`tooltip-${episode.episode}`}>
            {episode.description}
        </Tooltip>
    );

    const [showVideo, setShowVideo] = useState(false);
    const handlePlayClick = () => {
        console.log("handlePlayClick");
        showVideo ? setShowVideo(false) : setShowVideo(true);
    }

    return (
        <div className="card mb-3 justify-content-center">
            <div className="row no-gutters">
                <div className="col-md-8 d-flex align-items-center">
                        <OverlayTrigger overlay={tooltip} placement={'auto'}>
                            <p>
                                Episode: {episode.episode} | {episode.title}
                                {'  '}
                                {episode.videoUrl && (
                                    <span>
                                        <FaPlayCircle size={20} style={{ marginRight: '5px' }} onClick={handlePlayClick}/>
                                    </span>
                                )}
                            </p>
                        </OverlayTrigger>
                </div>
            </div>

            {episode.videoUrl && (
                showVideo && (
                    episode.videoUrl.includes('embed') ?
                <VideoEmbed embedUrl={episode.videoUrl} /> :
                <CustomPlayer metadata={episode} />
                )
            )
            }

        </div>
    );
};

/*const styles = {
    card: {
        // maxWidth: '400px',
    },
};*/

export default RowEpisode;
