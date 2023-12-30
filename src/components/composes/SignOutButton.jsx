// Author: sametbayat
// Dec 11, 2023 10:07 PM

import React from 'react';
import useLogout from "../../hooks/useLogout";
import {useNavigate} from "react-router-dom";

function SignOutButton() {
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <div className="flexGrow">
            <button
                className="
                btn
                btn-secondary
                "
                onClick={signOut}
            >
                Sign Out
            </button>
        </div>
    );
}

export default SignOutButton;