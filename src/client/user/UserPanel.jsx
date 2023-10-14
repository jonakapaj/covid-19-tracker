
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import {useNavigate} from "react-router-dom";


function UserPanel() {
    const { email, setEmail, username, setUsername } = useUser();
    const token = localStorage.getItem('token');
    const [fetched, setFetched] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (token && !fetched) {
            axios.get('http://localhost:4000/userDetails', {
                headers: { 'Authorization': token }
            }).then(response => {
                setEmail(response.data.email);
                setUsername(response.data.username);
                setFetched(true);
            }).catch(error => {
                console.error("Error fetching user details:", error);
            });
        }
    }, [token, setEmail, setUsername, fetched]);

    const logOutUser = async () => {

        localStorage.removeItem("token")
        navigate("/")

    }

    return (
        <div className="dropdown">
            <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: '40px', height: '40px' }}>
                <i className="fas fa-user" style={{ fontSize: '18px' }}></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end " aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item fw-bold" href="#">You : {username}</a>
                <a className="dropdown-item text-muted" href="#">Email: {email}</a>
                <div className="dropdown-divider"></div>
                <div className="d-flex justify-content-end">
                    <button onClick={logOutUser} className="btn btn-danger me-2">Sign Out</button>
                </div>
            </div>
        </div>
    );
}

export default UserPanel;
