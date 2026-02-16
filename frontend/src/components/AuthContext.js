import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize isAuthenticated from localStorage if available, or default to false
    // But user specifically wanted reset on reload?
    // Step 234: "Implemented an AuthContext... to manage the isAuthenticated state in memory. This ensures that the authentication state resets on page reload."
    // So default to false.
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
