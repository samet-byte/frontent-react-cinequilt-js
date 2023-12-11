// Author: sametbayat
// Dec 11, 2023 1:36 PM


import React from 'react';
import useLogout from "../../hooks/useLogout";
import {useNavigate} from "react-router-dom";

function ServiceUnavailable(props) {

    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        // navigate('/linkpage');
        navigate('/login');
    }


    return (
        <div>

            <br/>
            <br/>

            <div className="home-user-info center-item">
                <h3>Sorry, this service is not available in your country</h3>
            </div>

            <div className="flexGrow">
                <br/>
                <button
                    className="btn btn-primary"
                    onClick={signOut}
                >
                    Sign Out
                </button>
            </div>

        </div>



    );
}

export default ServiceUnavailable;