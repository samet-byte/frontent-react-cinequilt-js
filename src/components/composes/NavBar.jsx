import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Badge, Nav, Navbar, Offcanvas} from 'react-bootstrap';
import Constants from '../../common/Constants';
import PopSearch from "./search/PopSearch";
import HandleKeyDown from "../HandleKeyDown";
import SignOutButton from "./SignOutButton";
import useUserStuff from "../../hooks/useUserStuff";


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
            { to: '/add-metadata', label: 'Add new Content' },
            { to: '/x', label: 'Experimental' },
        ];
    } else if (userStuff?.roles.all === Constants.ROLES.Manager) {
        dynamicRoutes = [
            { to: '/m', label: 'M' },
        ];
    }

    const navItems = [
        { to: '/', label: Constants.APP_NAME },
        { to: '/view-metadatas', label: "View All of 'em" },
        { to: '/local', label: 'Local Files' },
        { to: '/filmbuff', label: 'Film Buff' },
        { to: '/search', label: 'Instant Search' },
    ];

    const dynamicNavItems = [
        ...dynamicRoutes.map(route => ({ to: route.to, label: route.label })),
    ];



    return (
        <>
            <HandleKeyDown handler={toggleOffcanvas} />
            <Navbar className={`navbar navbar-dark bg-dark mb-5 ${windowWidth < 976 ? 'navbar-expand-sm' : 'navbar-expand-md'}`} bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>
                    {/*<Link to={'/'}>*/}
                    <img
                        alt=""
                        src={Constants.APP_ICON_URL}
                        width={w_h}
                        height={w_h}
                        className="d-inline-block align-top"
                        loading="lazy"
                        onClick={toggleOffcanvas}
                    />
                    {/*</Link>*/}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"
                               // onClick={toggleOffcanvas}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navItems.map((item, index) => (
                            <Link key={index} to={item.to} className="nav-link" style={{ color: 'white' }}>{item.label}</Link>
                        ))}
                        <PopSearch />
                    </Nav>
                </Navbar.Collapse>
                    {/*<SignOutButton/>*/}
            </Navbar>

            <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Welcome {userStuff?.username} <Badge bg={'secondary'}>{`ID:  ${userStuff?.userId}`}</Badge>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        {/*<h5>Main Role:</h5>*/}
                        <Badge bg="primary">{userStuff?.roles?.main?.split('_')[1]}</Badge>
                    </div>

                    <div>
                        {/*<h5>Country:</h5>*/}
                        <Badge bg="black">{userStuff?.country.label}</Badge>
                    </div>
                    <div>
                        {/*<h5>Email:</h5>*/}
                        <Badge bg={'warning'} text={'black'}>{userStuff?.email}</Badge>
                    </div>
                    <Nav className="flex-column">
                        {navItems.map((item, index) => (
                            <Link key={index} to={item.to} className="nav-link" style={{ color: 'black' }}>{item.label}</Link>
                        ))}
                        {dynamicNavItems.map((item, index) => (
                            <Link key={index} to={item.to} className="nav-link" style={{ color: 'black' }}>{item.label}</Link>
                        ))}
                        <PopSearch />
                        <SignOutButton/>

                        {window.location.pathname === '/' && (
                            <p>This content is only visible on the Home page.</p>
                        )}


                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default NavBar;


// import React, { useEffect, useState } from 'react';
// import {Link} from 'react-router-dom';
// import { Nav, Navbar } from 'react-bootstrap';
// import Constants from '../../common/Constants';
// import PopSearch from "./search/PopSearch";
// import useLogout from "../../hooks/useLogout";
//
// const NavBar = () => {
//     const w_h = 50;
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//
//     useEffect(() => {
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//         };
//
//         window.addEventListener('resize', handleResize);
//
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const navbarClass = `navbar navbar-dark bg-dark mb-5 ${windowWidth < 576 ? 'navbar-expand-sm' : 'navbar-expand-md'}`;
//
//     const logout = useLogout();
//
//     const signOut = async () => {
//         await logout();
//     }
//
//     return (
//         <Navbar collapseOnSelect className={navbarClass} bg="dark" variant="dark" expand="lg">
//             <Navbar.Brand href="/">
//                 <img
//                     alt=""
//                     src={Constants.APP_ICON_URL}
//                     width={w_h}
//                     height={w_h}
//                     className="d-inline-block align-top"
//                     loading="lazy"
//                 />
//                 {' '}
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="mr-auto">
//                     <Nav.Link style={{ color: 'white' }} href="/">
//                         {Constants.APP_NAME}
//                     </Nav.Link>
//                     <Link to={'/'} className="nav-link">Home</Link>
//                     <Nav.Link href="/view-metadatas">View All of 'em</Nav.Link>
//                     {' '}
//                     <Nav.Link href="/add-metadata">Add new Content</Nav.Link>
//                     {' '}
//                     <Nav.Link href="/local">Local Files</Nav.Link>
//                     {' '}
//                     <Nav.Link href="/filmbuff">Film Buff</Nav.Link>
//                     {' '}
//                     <Nav.Link href="/search">Instant Search</Nav.Link>
//                     {' '}
//                     <PopSearch />
//                     {' '}
//                     <Nav.Link onClick={signOut} className="ms-2">Sign Out</Nav.Link>
//                     {' '}
//                     <Nav.Link href="/x">Experimental</Nav.Link>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     );
// };
//
// export default NavBar;
