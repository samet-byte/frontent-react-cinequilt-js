import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Constants from '../../common/Constants';
import PopSearch from "./search/PopSearch";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";
import RequireAuth from "../RequireAuth";

const NavBar = () => {
    const w_h = 50;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navbarClass = `navbar navbar-dark bg-dark mb-5 ${windowWidth < 576 ? 'navbar-expand-sm' : 'navbar-expand-md'}`;

    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        // navigate('/login');
    }


    const auth = useAuth()
    const [isUser, setIsUser] = useState(false);

    //
    // useEffect(() => {
    //     console.log('NavBar:useEffect:auth:', auth)
    //     setIsUser(auth?.auth?.roles  === 'ROLE_USER');
    //
    // }, [auth])
    //
    //
    // console.log('NavBar:isUser:', isUser)
    //     // auth?.auth?.roles[0] === 'ROLE_USER';



    return (
        <Navbar collapseOnSelect className={navbarClass} bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={Constants.APP_ICON_URL}
                    width={w_h}
                    height={w_h}
                    className="d-inline-block align-top"
                    loading="lazy"
                />
                {' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{ color: 'white' }} href="/">
                        {Constants.APP_NAME}
                    </Nav.Link>
                    <Link to={'/'} className="nav-link">Home</Link>
                    <Nav.Link href="/view-metadatas">View All of 'em</Nav.Link>
                    {' '}
                    <Nav.Link href="/add-metadata">Add new Content</Nav.Link>
                    {' '}
                    <Nav.Link href="/local">Local Files</Nav.Link>
                    {' '}
                    <Nav.Link href="/filmbuff">Film Buff</Nav.Link>
                    {' '}
                    <Nav.Link href="/search">Instant Search</Nav.Link>
                    {' '}
                    <PopSearch />
                    {' '}
                    <Nav.Link onClick={signOut} className="ms-2">Sign Out</Nav.Link>
                    {' '}
                    <Nav.Link href="/x">Experimental</Nav.Link>
                </Nav>
                {/*<div className="flexGrow">*/}
                {/*    <br />*/}
                {/*    <button*/}
                {/*        className="btn btn-primary"*/}
                {/*        onClick={signOut}*/}
                {/*    >*/}
                {/*        Sign Out*/}
                {/*    </button>*/}
                {/*</div>*/}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
