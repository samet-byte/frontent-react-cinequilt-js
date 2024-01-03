// Author: sametbayat
// Dec 16, 2023 11:21 PM


import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaSort} from "react-icons/fa";

function OffCanvasFilter({title, content}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                <FaSort/>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {content}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasFilter;