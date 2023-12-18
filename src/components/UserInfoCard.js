// Author: sametbayat
// Dec 17, 2023 9:22 PM

import React from 'react';
import { Card } from 'react-bootstrap';
import Constants from "../common/Constants";

const findCountryLabel = (value) => {
    const country = Constants.COUNTRIES.find((country) => country.value === value);
    return country ? country.label : 'Unknown Country';
};

const UserInfoCard = ({ userId, email, username, country }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>User Information</Card.Title>
                <Card.Text>
                    <strong>User ID:</strong> {userId}
                </Card.Text>
                <Card.Text>
                    <strong>Email:</strong> {email}
                </Card.Text>
                <Card.Text>
                    <strong>Username:</strong> {username}
                </Card.Text>
                <Card.Text>
                    <strong>Country:</strong> {findCountryLabel(country)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default UserInfoCard;
