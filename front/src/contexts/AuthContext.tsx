import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface IAuthUserData {
    nome: string;
    email: string;
    guid: string;
    avatarUrl: string;
    hasTokenJira: boolean;
    jiraToken: string;
}

interface IAuthTokenData {
    accessToken: string;
    expiration: string | undefined;
}

interface AuthContextProps {
    user: IAuthUserData;
    signInUser: (
        userData: IAuthUserData,
        tokenData: IAuthTokenData | undefined
    ) => void;
    signOutUser: () => void;
    userLogged: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IAuthUserData>({} as IAuthUserData);
    const [bearer, setBearer] = useState<string | undefined>(undefined);

    function signInUser(userData: IAuthUserData, tokenData: IAuthTokenData | undefined) {
        if (tokenData !== undefined) {
            const expirationDate = (tokenData.expiration ? new Date(tokenData.expiration) : undefined);
            Cookies.set('Bearer', tokenData.accessToken, {expires: expirationDate});
        }

        localStorage.setItem('user', JSON.stringify((userData)));
    }

    function signOutUser() {
        Cookies.remove('Bearer');
        localStorage.removeItem('user');

        window.location.href = '/';
    }

    useEffect(() => {
        const localUserData = localStorage.getItem('user');
        const localBearer = Cookies.get('Bearer');
        setBearer(localBearer);

        if (localUserData) {
            setUser(JSON.parse(localUserData));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signInUser,
                signOutUser,
                userLogged: !!bearer
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuthContext(): AuthContextProps {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within a AuthContextProvider');
    }

    return context;
}
