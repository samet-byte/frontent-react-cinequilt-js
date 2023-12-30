// Author: sametbayat
// Dec 13, 2023 9:03 PM

import React from 'react';
import DynamicTabsSeasons from "./DynammicTabs";

function TvShowOverview({ metadata }) {
    return (
        (metadata.id !== undefined) &&
        <div>
            {
                metadata.seasonNumber &&
                <DynamicTabsSeasons metadata={metadata} tabCount={metadata.seasonNumber}/>
            }
        </div>
    );
}

export default TvShowOverview;