import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (Cookies.get('token')) {
            setLoggedIn(() => true);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
