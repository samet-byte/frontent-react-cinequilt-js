import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || true);
    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem("accessToken")) || null);

    return (
        <AuthContext.Provider value={{
            auth, setAuth,
            persist, setPersist,
            accessToken, setAccessToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;