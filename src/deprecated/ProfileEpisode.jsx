// Author: sametbayat
// Dec 14, 2023 11:11 PM


import React from 'react';
import {useParams} from "react-router-dom";

function ProfileEpisode(props) {

    // get the season number from the url
    const { title, season, episode } = useParams();
    console.log("title: " + title);
    console.log("season: " + season);
    console.log("episode: " + episode);

    return (
        <div></div>
    );
}

export default ProfileEpisode;