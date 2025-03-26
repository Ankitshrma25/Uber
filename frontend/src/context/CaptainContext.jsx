import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Login captain
    const loginCaptain = async (credentials) => {
        try {
            setIsLoading(true);
            // Add your API call here
            const response = await fetch('/api/captain/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            setCaptain(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Logout captain
    const logoutCaptain = () => {
        setCaptain(null);
        // Add any additional cleanup logic here
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        error,
        loginCaptain,
        logoutCaptain,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};



export default CaptainContext;