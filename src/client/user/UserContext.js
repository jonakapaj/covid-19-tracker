import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [favoriteCountries, setFavoriteCountries] = useState([]);

    return (
        <UserContext.Provider value={{ email, setEmail, username, setUsername, favoriteCountries, setFavoriteCountries }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
