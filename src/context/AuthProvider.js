import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem("accessToken")) || null);

    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("userId")) || null);


    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist,
            accessToken, setAccessToken, userId, setUserId
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;