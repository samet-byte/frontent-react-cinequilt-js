// Author: sametbayat
// Dec 11, 2023 1:36 PM

import React from 'react';
import SignOutButton from "../composes/SignOutButton";

function ServiceUnavailable() {

    return (
        <div>
            <br/>
            <br/>
            <div className="home-user-info center-item">
                <h3>Sorry, this service is not available in your country</h3>
            </div>
            <SignOutButton/>
        </div>


    );
}

export default ServiceUnavailable;