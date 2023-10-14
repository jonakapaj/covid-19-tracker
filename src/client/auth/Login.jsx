import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../user/UserContext';

function Login() {
    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { email, setEmail,  } = useUser();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email: emailInput,
                password,
            });
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);

                const userDetails = await axios.get('http://localhost:4000/userDetails', {
                    headers: {
                        'Authorization': token,
                    },
                });

                setEmail(userDetails.data.email);
                console.log(userDetails.data);

                navigate('/homepage');
            } else {
                setError('Login failed. Please check your credentials or register.');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials or register.');
        }
    };


    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 col-sm-12'>
                    <div className='card shadow'>
                        <div className='card-body'>
                            <h2 className='card-title text-center mb-4 fw-bold'>Login</h2>
                            {error && <p className='alert alert-danger'>{error}</p>}
                            <form onSubmit={handleLogin}>

                                <div className='mb-3'>
                                    <input
                                        type="email"
                                        className='form-control'
                                        placeholder="Email"
                                        value={emailInput}
                                        onChange={(e) => setEmailInput(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type="password"
                                        className='form-control'
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Login
                                </button>
                                <p className='mt-3 text-center'>
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
