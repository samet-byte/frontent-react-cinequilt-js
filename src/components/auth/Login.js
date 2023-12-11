import { useRef, useState, useEffect } from 'react';
import './auth.css'
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";

import videoBackground from '../../assets/video/plastic_bag.mp4';
const LOGIN_URL = '/auth/authenticate';

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const { setAuth, persist, setPersist } = useAuth(); // global auth

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState(localStorage.getItem('username') || '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ emailOrUsername: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const userId = response?.data?.userId;
            console.log("userId: " + userId);
            setAuth({ user, pwd, roles, accessToken, userId });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
        // if(!persist) {localStorage.removeItem('username')}
        // else {localStorage.setItem('username', user)}
    }, [persist])



    return (
        <div>
            <video
                src={
                videoBackground
                //     "http://localhost:1234/y2mate.com%20-%20American%20Beauty%20%20Thomas%20Newman%20from%20the%20plastic%20bag%20scene_480p.mp4"
            }
                type="video/mp4" autoPlay loop muted className="fullscreen-video" />
                <div className="overlay auth-content">
                    <h1 className="authHeader">
                        Quilted Joy,<br/>
                        Cinematic Bliss..
                    </h1>
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username or Email</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />

                        <br/>
                        <button className="btn btn-outline-warning">
                            Wrap Me into Cinematic Warmth
                        </button>

                        <div className="persistCheck">
                        <input
                                type="checkbox"
                                id="persist"
                                onChange={togglePersist}
                                checked={persist}
                            />
                            <label htmlFor="persist">Remember Me</label>
                        </div>

                    </form>
                    <p>
                        I need a quilt?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to={"/register"}>
                                Sign Up
                            </Link>
                        </span>
                    </p>
                </section>
                </div>
        </div>
    )
}

export default Login
