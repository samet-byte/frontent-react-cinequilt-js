// Author: sametbayat
// Dec 17, 2023 9:43 PM


import { useState, useEffect } from 'react';

const useUserStuff = () => {
    const [userStuff, setUserStuff] = useState(null);

    const updateUserStuff = (newUserStuff) => {
        localStorage.setItem('userStuff', JSON.stringify(newUserStuff));
        setUserStuff(newUserStuff);
    };

    const clearUserStuff = () => {
        localStorage.removeItem('userStuff');
        setUserStuff(null);
    };

    useEffect(() => {
        const storedUserStuff = localStorage.getItem('userStuff');
        if (storedUserStuff) {
            setUserStuff(JSON.parse(storedUserStuff));
        }
    }, []);

    return { userStuff, updateUserStuff, clearUserStuff };
};

export default useUserStuff;
