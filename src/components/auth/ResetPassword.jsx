// Author: sametbayat
// Dec 29, 2023 10:26 PM


import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import videoBackground from '../../assets/video/ghd_wu.mp4';
import './auth.css';
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import Paths from "../../common/Paths";

const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ResetPassword = () => {
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
            console.log('Resetting password for: ' + email)
            const response = await axios.post('/auth/reset-password-request',
                JSON.stringify({email: email}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.status);
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
                            U Better Check Your Mail Box ✉️📬!
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
                            Did your password
                            <br/>
                            go on strike,
                            <br/>
                            demanding better working conditions
                            <br/>
                            in the digital realm?
                            <br/>
                            #PasswordProtest
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
                            >
                                ReKnit My Quilt
                                <br/>
                                (Reset Password)
                            </button>


                        </form>
                        {loading && <Spinner animation="border" variant="primary" size="sm" />}
                        <p>
                            <br/>
                            Just kiddin' <br/>
                            Of course I know <br/>
                            what my password
                            <br />
                            <span className="line">
                            {/*put router link here*/}
                                <Link to={Paths.LOGIN}>
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

export default ResetPassword
