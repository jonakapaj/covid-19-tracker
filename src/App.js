import Login from './client/auth/Login';
import Register from './client/auth/Register';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./client/dashboard/HomePage";
import {UserProvider} from "./client/user/UserContext";
import GuardedRoute from "./GuardedRoute";

function App() {
    return (
        <div style={{backgroundColor: "#f8f9fa", minHeight: "100vh"}} className="App">
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/homepage" element={<GuardedRoute>
                            <HomePage/>
                        </GuardedRoute>}/>
                    </Routes>
                </BrowserRouter>
            </UserProvider>

        </div>
    );
}

export default App;
