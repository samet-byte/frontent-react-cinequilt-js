// Author: sametbayat
// Dec 07, 2023 4:11 PM

import React from 'react';
    import { Link } from 'react-router-dom';
    import { Nav, Navbar} from 'react-bootstrap';

function Enav() {
    return (

    <Navbar collapseOnSelect  expand="lg">
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="mr-auto d-block">
                <Nav.Item>
                    <Nav.Link eventKey="1" as={Link} to="/Home">
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2" as={Link} to="/Contant">
                        Page Contant
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
}

export default Enav;
