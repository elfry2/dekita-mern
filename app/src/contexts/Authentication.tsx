import { createContext, useState, type Dispatch } from "react";
import { useNavigate } from "react-router";
interface Props {
    children: React.ReactNode,
}

interface AuthenticationContextInterface {
    token: string,
    setToken: Dispatch<React.SetStateAction<string>> | null,
}

export const AuthenticationContext
    = createContext<AuthenticationContextInterface>({
        token: '',
        setToken: null,
    });

export const AuthenticationContextProvider = function ({ children }: Props) {

    const localStorageToken = localStorage.getItem('token');

    const [token, setToken] = useState(localStorageToken ?? '');

    return <AuthenticationContext.Provider value={{ token, setToken }}>
        {children}
    </AuthenticationContext.Provider>
}