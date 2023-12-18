// Author: sametbayat
// Dec 13, 2023 9:13 PM

import React from 'react';
import {Link} from "react-router-dom";

function LinkWithCase({caseType, endpoint, content}) {

    switch (caseType) {
        case 'TV_SHOW':
            return (
                <Link to={`/tv/${endpoint}`}>
                    {content}
                </Link>
            );
        default:
            return (
                <Link to={`/profile-metadata/${endpoint}`}>
                    {content}
                </Link>
            );
    }

}

export default LinkWithCase;