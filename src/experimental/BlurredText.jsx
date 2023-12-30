// BlurredText.js
import React from 'react';
import styled from 'styled-components';

const BlurredTextContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const BlurredBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.5); /* Red color with transparency */
  z-index: -1;
`;

const Text = styled.p`
  z-index: 1;
  position: relative;
  color: white; /* Change text color as needed */
  /* Add any other text styling here */
`;

const BlurredText = ({ children }) => {
    return (
        <BlurredTextContainer>
            <BlurredBackground />
            <Text>{children}</Text>
        </BlurredTextContainer>
    );
};

export default BlurredText;
