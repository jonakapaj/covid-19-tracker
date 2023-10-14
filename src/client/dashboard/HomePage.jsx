import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import React from "react";
import {SelectedCountryProvider} from "./SelectedCountryContext";

const HomePage = () => {
    return (
        <div>
            <SelectedCountryProvider>
                <Navbar/>
                <Dashboard/>
            </SelectedCountryProvider>
        </div>
    )
}

export default HomePage;
