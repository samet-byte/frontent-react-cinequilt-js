// Author: sametbayat
// Jan 02, 2024 9:48 PM


import React from 'react';
import './footer.css';

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <span className="text-muted">©{currentYear}, Some of the rights reserved.</span>
                </div>
            </footer>
        </div>
    );
}

export default Footer;