// Author: sametbayat
// Dec 17, 2023 9:43 PM


import { useState, useEffect } from 'react';

const useUserStuff = () => {
    // State to store user information
    const [userStuff, setUserStuff] = useState(null);

    // Function to handle updating user data
    const updateUserStuff = (newUserStuff) => {
        // Save updated user information to local storage
        localStorage.setItem('userStuff', JSON.stringify(newUserStuff));
        // Update state with updated user information
        setUserStuff(newUserStuff);
    };

    // Function to clear user information (logout)
    const clearUserStuff = () => {
        // Remove user information from local storage
        localStorage.removeItem('userStuff');
        // Update state with null
        setUserStuff(null);
    };

    // Effect to check for user information in local storage on component mount
    useEffect(() => {
        const storedUserStuff = localStorage.getItem('userStuff');
        if (storedUserStuff) {
            // Parse and set user information if available
            setUserStuff(JSON.parse(storedUserStuff));
        }
    }, []);

    return { userStuff, updateUserStuff, clearUserStuff };
};

export default useUserStuff;
