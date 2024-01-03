import { useRef, useState, useEffect } from 'react';
import './auth.css'
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import {Link, useNavigate, useLocation} from "react-router-dom";
import animData from "../../assets/anim/loading_dot.json";
import videoBackground from '../../assets/video/plastic_bag.mp4';
import useUserStuff from "../../hooks/useUserStuff";
import Constants from "../../common/Constants";
import Lottie from "lottie-react";
import Paths from "../../common/Paths";
import useDocumentTitle from "../../hooks/useDocumentTitle";
const LOGIN_URL = '/auth/authenticate';

const Login = () => {

    useDocumentTitle('Login')

    const { setAuth, persist, setPersist } = useAuth(); // global auth

    const { updateUserStuff } = useUserStuff(); // global user info

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState(localStorage.getItem('username') || '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const findCountryLabel = (value) => {
        const country = Constants.COUNTRIES.find((country) => country.value === value);
        return country ? country.label : 'Unknown Country';
    };

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

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
            const username = response?.data?.username;
            const email = response?.data?.email;
            const country = response?.data?.country;

            setAuth({ user, pwd, roles, accessToken, userId, username, email, country }); // todo: remove userId, username, email, country
            updateUserStuff({
                userId: userId,
                username: username,
                email: email,
                country: {value: country, label: findCountryLabel(country)},
                roles: {all: roles, main: roles[roles.length - 1]}
            })

            // setUser('');
            setPwd('');

            // if (Constants.SERVICE_UNAVAILABLE.contains(country))
            if (country === 'ir' || country === 'nk')
                navigate(Paths.SERVICE_UNAVAILABLE , {replace: true})
            else
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
        } finally {
            setIsLoading(false)
        }
    }


    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem('username', user);
        localStorage.setItem("persist", persist);
        if(!persist) {localStorage.removeItem('username')}
    }, [user, persist]);

    return (
        <div>
            <video
                src={videoBackground}
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
                        <button className="btn btn-outline-warning center-item">
                            {isLoading ?
                                <Lottie className={'center-item '} animationData={animData} style={{width: 50, height: 50}}/> : <>Wrap Me into
                                    Cinematic Warmth</>}
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
                            <Link to={Paths.REGISTER}>
                                Sign Up
                            </Link>
                        </span>
                    </p>

                    <p>
                        I forgot my password :(<br />
                        <span className="line">
                            <Link to={'/reset'}>
                                Reset Password
                            </Link>
                        </span>
                    </p>
                </section>
                </div>
        </div>
    )
}

export default Login
