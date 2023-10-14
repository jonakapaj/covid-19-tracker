import React, { createContext, useContext, useState } from 'react';

export const SelectedCountryContext = createContext();

export const SelectedCountryProvider = ({ children }) => {
    const [selectedCountryGlobal, setSelectedCountryGlobal] = useState(null);
    return (
        <SelectedCountryContext.Provider value={{ selectedCountryGlobal, setSelectedCountryGlobal }}>
            {children}
        </SelectedCountryContext.Provider>
    );
};

export const useSelectedCountry = () => {
    const context = useContext(SelectedCountryContext);
    if (!context) {
        throw new Error('useSelectedCountry must be used within a SelectedCountryProvider');
    }
    return context;
};
