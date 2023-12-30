// Author: sametbayat
// Dec 23, 2023 1:53 PM

// MakeAdminBox.js
import React from "react";
import { Form } from "react-bootstrap";

const MakeAdminBox = ({ user, onChange }) => {
    return (
        <Form>
            <Form.Check
                type="checkbox"
                checked={user?.role === 'ADMIN'}
                onChange={() => onChange(user)}
            />
        </Form>
    );
};

export default MakeAdminBox;
