// Author: sametbayat
// Dec 14, 2023 1:46 PM

import React, {useEffect, useState} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import {axiosPrivate} from "../../api/axios";
import RowEpisode from "./RowEpisode";

const DynamicTabsSeasons = ({ metadata, tabCount }) => {
    // Generate an array with the specified tabCount
    const tabsArray = Array.from({ length: tabCount }, (_, index) => index + 1);

    const [episodes, setEpisodes] = useState([]);

    const [selectedSeason, setSelectedSeason] = useState(1);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/tvshow/season/${metadata.id}/${selectedSeason}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setEpisodes(response.data);
            } catch (err) {
                console.error(err);
                alert(err.name + ' -> ' + err.message);
            }
        };

        getInfo();


        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [selectedSeason]);

    function handleSeasonChange(tabIndex) {
        console.log("handleSeasonChange: " + tabIndex);
        setSelectedSeason(tabIndex);
    }

    return (
        episodes &&
        <Tabs
            defaultActiveKey={selectedSeason.toString()}
            id="dynamic-tabs-example"
            className="mb-3"
            justify
            onSelect={(k) => {
                // alert("Tab " + k + " clicked")
                handleSeasonChange(k)
            }}
        >
            {tabsArray.map((tabIndex) => (
                <Tab
                    key={tabIndex}
                    eventKey={tabIndex.toString()}
                    title={`Season ${tabIndex}`}
                >
                    <br/>
                    {episodes.map((episode) => (
                        <div key={episode.id} className="center-div">
                            <RowEpisode episode={episode} metadata={metadata} />
                            {/*<h1>_____________________</h1>*/}
                            {/*<h4>{episode.title}</h4>*/}
                            {/*<p>{episode.description}</p>*/}
                            {/*<p>Video URL: {episode.videoUrl}</p>*/}
                            {/*<h1>_____________________</h1>*/}
                        </div>
                    ))}

                </Tab>
            ))}
        </Tabs>

    );
};

export default DynamicTabsSeasons;
