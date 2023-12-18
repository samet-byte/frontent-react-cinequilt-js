import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || true);
    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem("accessToken")) || null);
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("userId")) || null);
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem("username") || null));
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem("email") || null));
    const [country, setCountry] = useState(JSON.parse(localStorage.getItem("country") || null));


    return (
        <AuthContext.Provider value={{
            auth, setAuth,
            persist, setPersist,
            accessToken, setAccessToken,
            userId, setUserId,
            username, setUsername,
            email, setEmail,
            country, setCountry
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;