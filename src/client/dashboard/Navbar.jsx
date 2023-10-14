import React, {useContext} from "react";
import UserPanel from '../user/UserPanel';
import {SelectedCountryContext} from "./SelectedCountryContext";
import {useUser} from "../user/UserContext";

const Navbar = () => {
    const { favoriteCountries } = useUser();
    const { setSelectedCountryGlobal } = useContext(SelectedCountryContext);

    const handleFavoriteCountryClick = (country) => {
        setSelectedCountryGlobal(country);
    };

    return (
        <nav className="navbar navbar-expand-lg mb-4" style={{
            backgroundColor: "#4A90E2",
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s'
        }}>
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="#"
                   style={{color: "#fff", fontSize: '1.5rem', letterSpacing: '1px'}}>Covid</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"
                        style={{borderColor: '#fff'}}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#" style={{
                                color: "#fff",
                                marginRight: '15px',
                                transition: 'all 0.2s'
                            }}
                               onMouseEnter={(e) => e.target.style.color = "#FFC107"}
                               onMouseLeave={(e) => e.target.style.color = "#fff"}
                            >Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarFavorites" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false" style={{color: "#fff"}}>
                                Favourites
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarFavorites">
                                {favoriteCountries && favoriteCountries.length > 0 ? (
                                    favoriteCountries.map(country => (
                                        <li key={country}>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() => handleFavoriteCountryClick(country)}>
                                                {country}
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li><a className="dropdown-item" href="#">No Favourites</a></li>
                                )}
                            </ul>
                        </li>
                    </ul>
                    <UserPanel/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
