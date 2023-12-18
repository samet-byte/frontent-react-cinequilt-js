// Author: sametbayat
// Dec 17, 2023 3:20 AM

import useAuth from "../hooks/useAuth";

export const ShouldShow = ({allowedRoles, content}) => {

    const {auth} = useAuth();

    return(
        <>
            {auth?.roles?.find(role => allowedRoles?.includes(role)) && (
                <>
                    {content}
                </>
            )}
        </>
    );

}