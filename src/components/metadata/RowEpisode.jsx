// Author: sametbayat
// Dec 14, 2023 2:18 PM


import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaPlayCircle } from 'react-icons/fa';
import VideoEmbed from "../video/VideoEmbed";
import OtherPlayer from "../video/OtherPlayer"; // Assuming you have an icon library, adjust this import accordingly

const RowEpisode = ({ episode, metadata }) => {

    const tooltip = (
        <Tooltip id={`tooltip-${episode.episode}`} style={{ minWidth: '500px' }}>
            {episode.description}
        </Tooltip>
    );


    const [showVideo, setShowVideo] = useState(false);
    const handlePlayClick = () => {
        console.log("handlePlayClick");
        showVideo ? setShowVideo(false) : setShowVideo(true);
    }

    return (
        <div className="card mb-3 justify-content-center" style={styles.card}>
                    {/*<Link to={`/tv/${episode.id}`} style={{ textDecoration: 'none', justifyContent: 'center' }}>*/}
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
                    {/*</Link>*/}
                            {showVideo &&
                                <OtherPlayer metadata={episode} />
                                // <video
                                //     src={episode.videoUrl}
                                //     controls
                                //     autoPlay
                                //     style={{ width: '30%' }}
                                // />
                            }
        </div>
    );
};

const styles = {
    card: {
        // maxWidth: '400px',
    },
};

export default RowEpisode;
