// Author: sametbayat
// Dec 14, 2023 2:18 PM

import React, {useEffect, useState} from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {FaPlayCircle, FaTrash} from 'react-icons/fa';
import CustomPlayer from "../video/CustomPlayer";
import VideoEmbed from "../video/VideoEmbed";
import {FaDeleteLeft} from "react-icons/fa6";
import {axiosPrivate} from "../../api/axios";
import Paths from "../../common/Paths";
import useUserStuff from "../../hooks/useUserStuff";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import Constants from "../../common/Constants";

const RowEpisode = ({ episode }) => {

    const { userStuff } = useUserStuff();
    const { auth } = useAuth();
    const navigate = useNavigate();


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
            <div className="row no-gutters" style={{ width: '100%' }}>
                <div className="d-flex">
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
                    {
                    userStuff?.roles?.main === Constants.ROLES.Admin ?
                    <OverlayTrigger overlay={<Tooltip>Are you sure?</Tooltip>} placement={'auto'}>
                        <p style={{ marginLeft: 'auto' }}>
                            <span>
                                <FaTrash
                                    size={20}
                                    style={{ marginRight: '5px' }}
                                    onClick={async () => {
                                        try {
                                            await axiosPrivate.delete(`/series/episode/${episode.id}`, {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${auth?.accessToken} `
                                                },
                                                withCredentials: true
                                            });
                                        } catch (error) {
                                            console.error('Error deleting episode:', error);
                                        } finally {
                                            navigate(0);
                                        }
                                    }}
                                />
                            </span>
                        </p>
                    </OverlayTrigger>
                    : null
                    }
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
