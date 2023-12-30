// Author: sametbayat
// Dec 21, 2023 12:43 PM


import React, {useEffect, useState} from 'react';
import CountrySelector from "./auth/CountrySelector";
import useUserStuff from "../hooks/useUserStuff";
import {Form} from "react-bootstrap";
import axios, {axiosPrivate} from "../api/axios";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loading from "./composes/Loading";

// ayarlar, ülke, şifre değiştirme
function Settings() {

    const [currentPwd, setCurrentPwd] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [matchPwd, setMatchPwd] = useState(null);
    const [showChangePwd, setShowChangePwd] = useState(false);
    const { isLoading, startLoading, stopLoading } = useLoading();


    const handleSubmit = async (e) => {
        e.preventDefault();


        startLoading()

        try {

            console.log(
                JSON.stringify({
                    currentPassword: currentPwd,
                    newPassword: pwd,
                    confirmationPassword: matchPwd
                })
            )

            const response = await axios.patch('/users/change/password',
                JSON.stringify({
                    currentPassword: currentPwd,
                    newPassword: pwd,
                    confirmationPassword: matchPwd
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
            );

            alert("Password Changed Successfully!");
            // await logout();

        } catch (err) {
            console.log(err);
            alert("Password Change Failed!");
        } finally {
            stopLoading()
        }
    }


    const {userStuff, updateUserStuff} = useUserStuff();
    const [selectedCountry, setSelectedCountry] = useState(userStuff?.country.value || '');

    const { auth } = useAuth();

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };

    const changeCountryApi = async () => {
        try {
            startLoading()
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

                if (response.status === 200) {
                    updateUserStuff({
                        userId: userStuff?.userId,
                        username: userStuff?.username,
                        email: userStuff?.email,
                        country: {value: selectedCountry.value, label: selectedCountry.label},
                        roles: userStuff?.roles
                    })
                    alert(`Country Changed Successfully to ${selectedCountry.label}`)
                    window.location.reload();

                } else {
                    alert('What tha\' heck just happened? :(')
                }

            console.log(response);
        } catch (e) {
            console.log(e);
        } finally {
            stopLoading()
        }
    };

    useEffect(() => {
        if (selectedCountry === null || selectedCountry === undefined || selectedCountry === '') return;
        changeCountryApi();
    }, [selectedCountry]);

    const pHorizontal = 150;

    return (
        <div
            className="container"
            style={{paddingLeft: pHorizontal, paddingRight: pHorizontal }}
        >
            <Form onSubmit={handleSubmit}>
            <Form.Group className="">
                <Form.Label>
                    Change Region
                </Form.Label>
                <CountrySelector
                    selectedCountry={selectedCountry}
                    onChange={handleCountryChange}
                />
            </Form.Group>


            { showChangePwd ?
                <Form>
                    <Form.Group controlId="cpassword">
                        <Form.Label column sm="3">
                            Current Password
                        </Form.Label>

                        <Form.Control
                            type="password"
                            name="cpassword"
                            value={currentPwd}
                            onChange={(e) => setCurrentPwd(e.target.value)}
                            className="form-control col-span-small-6 mb-3 input-black-border"
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label column sm="3">
                            New Password
                        </Form.Label>

                        <Form.Control

                            type="password"
                            name="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            className="form-control col-span-small-6 mb-3 input-black-border"
                        />
                    </Form.Group>
                    <Form.Group controlId="checkpassword">
                        <Form.Label column sm="3">
                            Re-enter New Password
                        </Form.Label>

                        <Form.Control
                            type="password"
                            name="checkpassword"
                            value={matchPwd}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            className="form-control col-span-small-6 mb-3 input-black-border"
                        />
                    </Form.Group>

                    {isLoading ?
                        <Loading tiny={true} anim={'fly'} />
                        :
                        <button
                            className="btn btn-info center-item"
                            onClick={
                                handleSubmit
                            }
                        >
                            Change Password
                        </button>
                    }

                </Form>
                :
                <button
                    className="btn btn-info"
                    onClick={() => setShowChangePwd(true)}
                >
                    ReKnit My Quilt ( Change Password )
                </button>
            }
        </Form>
    </div>

    );
}

export default Settings;