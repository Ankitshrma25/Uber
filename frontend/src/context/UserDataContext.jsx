import { createContext, useState, useEffect } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateUser = (newUserData) => {
        setUser(newUserData);
        if (newUserData) {
            localStorage.setItem('user', JSON.stringify(newUserData));
        } else {
            localStorage.removeItem('user');
        }
    };

    if (isLoading) {
        return null; // or a loading spinner
    }

    return (
        <UserDataContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </UserDataContext.Provider>
    );
};