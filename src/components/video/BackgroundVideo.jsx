import React from 'react';

const video_url = "https://assets.mubicdn.net/splash-videos/18/1694788691_video_h264_tablet.mp4"

const BackgroundVideo = () => {
  return (
    <div className="background-video">
      {/* Include your video source */}
      <video autoPlay loop muted>
        <source src={video_url} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
