// Author: sametbayat
// Dec 14, 2023 1:46 PM

import React, {useEffect, useState} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import {axiosPrivate} from "../../api/axios";
import RowEpisode from "./RowEpisode";
import Loading from "../composes/Loading";

// get only 1 season content
// sezona göre bölümleri getirir
const DynamicTabsSeasons = ({ metadata, tabCount }) => {
    const tabsArray = Array.from({ length: tabCount }, (_, index) => index + 1);
    const [episodes, setEpisodes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(1);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setIsLoaded(false)

        const getInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/series/episode/season/${metadata.id}/${selectedSeason}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setEpisodes(response.data);
            } catch (err) {
                console.error(err);
                alert(err.name + ' -> ' + err.message);
            }finally {
                setIsLoaded(true)
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
        episodes && tabsArray ? ( // Check if episodes and tabsArray exist
            <Tabs
                defaultActiveKey={selectedSeason.toString()}
                id="dynamic-tabs-example"
                className="mb-3"
                justify
                onSelect={(k) => {
                    handleSeasonChange(k);
                }}
            >
                {tabsArray.map((tabIndex) => (
                    <Tab
                        key={tabIndex}
                        eventKey={tabIndex.toString()}
                        title={`Season ${tabIndex}`}
                    >
                        <br />
                        {isLoaded ? (
                            episodes.map((episode) => (
                                <div key={episode.id} className="center-div">
                                    <RowEpisode episode={episode} metadata={metadata} />
                                </div>
                            ))
                        ) : (
                            <Loading anim="m1" />
                        )}
                    </Tab>
                ))}
            </Tabs>
        ) : (
            <div>Loading or Error Handling...</div>
        )
    );
};

export default DynamicTabsSeasons;
