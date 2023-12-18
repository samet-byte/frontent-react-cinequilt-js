// Author: sametbayat
// Dec 13, 2023 9:03 PM

import React, {useEffect, useState} from 'react';
import {axiosPrivate} from "../../api/axios";
import {forEach} from "react-bootstrap/ElementChildren";
import TabComponent from "./TabComponent";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DynamicTabsSeasons from "./DynammicTabs";
// ... (import statements)

function TvShowOverview({ metadata }) {

    return (
        (metadata.id !== undefined) && <div>
            {/*<h3>TV Show Overview</h3>*/}
            {/*<br />*/}
            {/*{metadata.id && <h4>{metadata.id}</h4>}*/}
            {/*{metadata.title && <h4>{metadata.title}</h4>}*/}
            {/*<h5>Season Num: {seasonCount}</h5>*/}

            {metadata.seasonNumber && <DynamicTabsSeasons metadata={metadata} tabCount={metadata.seasonNumber}/>}

        </div>
    );
}

export default TvShowOverview;