// Author: sametbayat
// Dec 21, 2023 12:43 PM


import React, {useEffect, useState} from 'react';
import CountrySelector from "./auth/CountrySelector";
import useUserStuff from "../hooks/useUserStuff";
import {Form} from "react-bootstrap";
import {axiosPrivate} from "../api/axios";
import useAuth from "../hooks/useAuth";

function Settings() {

    const {userStuff} = useUserStuff();
    console.log(userStuff)
    const [selectedCountry, setSelectedCountry] = useState(userStuff?.country.value || 'tr');

    const { auth } = useAuth();

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };


    // useEffect(async (selectedCountry) => {
    //
    //     try {
    //         const response = await axiosPrivate.patch(`users/${selectedCountry}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${auth?.accessToken}`
    //             },
    //             withCredentials: true
    //         })
    //
    //         console.log(response)
    //
    //     }catch (e) {
    //         console.log(e)
    //     }
    //
    //
    // }, [userStuff])

    const changeCountryApi = async () => {
        try {
            const response = await axiosPrivate.patch(
                `users/change/${selectedCountry.value}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
            );

            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        changeCountryApi();
    }, [selectedCountry]);

    console.log(selectedCountry)
    return (
        <Form>
            <Form.Group className="ml-10 mr-10">
                <Form.Label>
                    Change Region
                </Form.Label>
                <CountrySelector
                    selectedCountry={selectedCountry}
                    onChange={handleCountryChange}
                />
            </Form.Group>
            Chnange My Region
            Reset Password
        </Form>
    );
}

export default Settings;