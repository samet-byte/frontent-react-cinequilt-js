// VideoPlayer.js

import React from 'react';
import { Player, BigPlayButton, ControlBar, ReplayControl, ForwardControl } from 'video-react';
import 'video-react/dist/video-react.css'; // Import the styles


const VideoPlayer = ({ src, subtitles }) => {
    return (
        <Player>
            <source src={src} />
            {subtitles && <track kind="subtitles" src={subtitles} />}
            <ControlBar autoHide={false}>
                <ReplayControl seconds={10} order={1.1} />
                <ForwardControl seconds={30} order={1.2} />
            </ControlBar>
            <BigPlayButton position="center" />
        </Player>
    );
};

export default VideoPlayer;
