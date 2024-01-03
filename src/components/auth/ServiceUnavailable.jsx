// Author: sametbayat
// Dec 11, 2023 1:36 PM

import React from 'react';
import SignOutButton from "../composes/SignOutButton";
import useUserStuff from "../../hooks/useUserStuff";

import ir_busted from "../../assets/img/ir_busted.png"
import nk_busted from "../../assets/img/nk_busted.png"
import useDocumentTitle from "../../hooks/useDocumentTitle";

function ServiceUnavailable() {

    useDocumentTitle('Service Unavailable');

    const  { userStuff } = useUserStuff();

    return (
        <div>
            <br/>
            <br/>
            <div className="home-user-info center-item">
                <h4>
                    {/*Sorry, this service is not available in*/}
                    You're just busted by
                    {/*Busted!*/}
                    <br/>
                    {userStuff?.country?.label ? userStuff?.country.label : null }
                </h4>

                <img
                    src={userStuff?.country?.value === 'nk' ? nk_busted: ir_busted}
                    alt={'Better Sign Out'}
                />
            </div>
            <SignOutButton/>
        </div>


    );
}

export default ServiceUnavailable;