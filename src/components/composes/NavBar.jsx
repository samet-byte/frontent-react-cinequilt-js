import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Badge, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import Constants from '../../common/Constants';
import PopSearch from "./search/PopSearch";
import HandleKeyDown from "../HandleKeyDown";
import SignOutButton from "./SignOutButton";
import useUserStuff from "../../hooks/useUserStuff";
import Paths from "../../common/Paths";


const NavBar = () => {
    const w_h = 50;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    
    const { userStuff } = useUserStuff();
    

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    let dynamicRoutes = [];

    if (userStuff?.roles.all.includes(Constants.ROLES.Admin)) {
        dynamicRoutes = [
            { to: Paths.ADD_METADATA, label: 'Add new Content' },
            { to: Paths.EXPERIMENTAL, label: 'Experimental' },
        ];
    } else if (userStuff?.roles.all === Constants.ROLES.Manager) {
        dynamicRoutes = [
            { to: Paths.MANAGER, label: 'M' },
        ];
    }

    const navItems = [
        { to: Paths.HOME, label: Constants.APP_NAME },
        { to: Paths.VIEW_METADATAS, label: "View All of 'em" },
        { to: Paths.LOCAL, label: 'Local Files' },
        { to: Paths.FILM_BUFF, label: 'Film Buff' },
        { to: Paths.SEARCH, label: 'Instant Search' },
        { to: Paths.SETTINGS, label: 'Settings' },
    ];

    const dynamicNavItems = [
        ...dynamicRoutes.map(route => ({ to: route.to, label: route.label })),
    ];


//mb-5
    return (
        <>
            <HandleKeyDown handler={toggleOffcanvas} />
            <Navbar className={`navbar navbar-dark bg-dark ${windowWidth < 976 ? 'navbar-expand-sm' : 'navbar-expand-md custom-navbar'}
            `} bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>
                    <img
                        alt=""
                        src={Constants.APP_ICON_URL}
                        width={w_h}
                        height={w_h}
                        className="d-inline-block align-top"
                        loading="lazy"
                        onClick={toggleOffcanvas}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"
                               onClick={toggleOffcanvas}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navItems.map((item, index) => (
                            <Link key={index} to={item.to} className="nav-link" style={{ color: 'white' }}>{item.label}</Link>
                        ))}
                        <PopSearch />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} className={'custom-offcanvas'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Welcome {userStuff?.username}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <Badge bg={'secondary'}>{`ID:  ${userStuff?.userId}`}</Badge>
                    </div>
                    <div>
                        <Badge bg="primary">{userStuff?.roles?.main?.split('_')[1]}</Badge>
                    </div>

                    <div>
                        <Badge bg="black">{userStuff?.country.label}</Badge>
                    </div>
                    <div>
                        <Badge bg={'warning'} text={'black'}>{userStuff?.email}</Badge>
                    </div>

                    <div className="mt-2"   >
                        <PopSearch />
                    </div>


                    <Nav className="flex-column mt-2">
                        {navItems.map((item, index) => (
                            <Link key={index} to={item.to} className="nav-link custom-nav-link mb-1" style={{ color: 'black' }}>{item.label} </Link>
                        ))}
                        {dynamicNavItems.map((item, index) => (
                            <Link key={index} to={item.to} className="nav-link custom-nav-link mb-1" style={{ color: 'black' }}>{item.label}</Link>
                        ))}
                        <SignOutButton/>

                        {(() => {
                            switch (window.location.pathname) {
                                case Paths.VIEW_METADATAS:
                                    return <p>View Metadatas</p>;
                                default:
                                    return null;
                            }
                        })()}

                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default NavBar;