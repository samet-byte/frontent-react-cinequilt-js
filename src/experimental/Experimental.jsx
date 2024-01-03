// Author: sametbayat
// Dec 05, 2023 7:58 PM

import React, {useEffect, useRef, useState} from "react";
import './x.css'
import axios from "../api/axios";
import videoBackground from "../assets/video/ghd_wu.mp4";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Spinner} from "react-bootstrap";
import LiveDateTime from "../components/composes/LiveDateTime";


const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const Experimental = () => {
    // return (
    //         <>
    //             <div className="bg-image-blur">
    //             <div className="blur"></div>
    //             </div>
    //         <div className="fg-content">
    //             <h1>hello</h1>
    //             <h1>hello</h1>
    //             <h1>hello</h1>
    //             <h1>hello</h1>
    //             <h1>hello</h1>
    //             <h1>hello</h1>
    //             <h1>hello</h1>
    //             <h1>hello</h1>
    //         </div>
    //         </>
    //
    //
    // );
    const userRef = useRef(null);
    const errRef = useRef(null);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(MAIL_REGEX.test(email));
    }, [email])

    const disabled = !validEmail;

    const buttonStyle = {
        backgroundColor: disabled ? '#999999' : '#FFD700', // Change color when activated
        cursor: disabled ? 'not-allowed' : 'pointer', // Change cursor when activated
    };


    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();



        // if button enabled with JS hack

        const v3 = MAIL_REGEX.test(email);
        if (!v3 ) {
            setErrMsg("Invalid Entry");
            return;
        }

        setLoading(true)

        try {
            const response = await axios.post('http://localhost:8080/api/auth/reset-password-request',
                JSON.stringify({ email: email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <video src={videoBackground} type="video/mp4" autoPlay loop muted className="fullscreen-video" />
            {success ? (
                <div className="overlay auth-content">
                    <section>
                        <h1 className="authHeader">
                            Let's get your quilt!
                        </h1>
                        <p>
                            <Link to={"/login"}>
                                Sign In
                            </Link>
                        </p>
                    </section>
                </div>
            ) : (
                <div className="overlay auth-content">
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 className="authHeader">
                            Why the <br/>
                            heckn' quilt?
                        </h1>
                        <form onSubmit={handleSubmit}>

                            <label htmlFor="email">
                                Email:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Invalid email.<br />
                            </p>

                            <br/>
                            <button
                                className="btn btn-info"
                                disabled={!validEmail}
                                style={buttonStyle}
                                // onMouseOver={}
                                // onMouseOut={}
                            >
                                ReKnit My Quilt
                                <br/>
                                (Reset Password)
                            </button>


                        </form>
                        {loading && <Spinner animation="border" variant="primary" size="sm" />}
                        <p>
                            Already registered?<br />
                            <span className="line">
                            {/*put router link here*/}
                                <Link to={"/login"}>
                                Sign In
                            </Link>
                        </span>
                        </p>
                    </section>
                </div>
            )}
        </>
    )
}
export default Experimental;


