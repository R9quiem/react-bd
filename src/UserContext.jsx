import React, {createContext, useContext, useEffect, useState} from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const logout = () => {
        localStorage.removeItem('client_id');
        setUser(null);
        console.log('Выход из системы');
    }
    useEffect(() => {
        const storedUser = localStorage.getItem('client_id');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser,logout }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);