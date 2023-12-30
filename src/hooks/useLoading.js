// Author: sametbayat
// Dec 21, 2023 8:18 PM

import { useState } from 'react';

const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => {
        setIsLoading(true);
    };

    const stopLoading = () => {
        setIsLoading(false);
    };

    return {
        isLoading,
        startLoading,
        stopLoading,
    };
};

export default useLoading;
