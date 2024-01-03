// Author: sametbayat
// Dec 17, 2023 2:08 AM


import React, {useCallback, useEffect} from 'react';

function HandleKeyDown({handler}) {


    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            console.log('Enter key pressed!');
            // Add your logic here
        }
        if (event.keyCode === 9) {
            console.log('TAB key pressed!');
        }
        if (event.key === ',') {
            console.log(', key pressed!');
            handler && handler();
        }
        if (event.key === '.') {
            console.log('" key p{ressed!');
            // handler && handler();
        }
        if (event.key === 'S' || event.key === 's') {
            console.log('The S key was pressed!');
            // Add your logic here
        }
        if (event.metaKey && event.keyCode === 190) {
            console.log('Control + Dot pressed on Mac!');
            // Add your logic for Control + Dot here
        }


    }, []);

    useEffect(() => {
        // Attach the event listener when the component mounts
        window.addEventListener('keydown', handleKeyDown);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <></>
    );
}

export default HandleKeyDown;