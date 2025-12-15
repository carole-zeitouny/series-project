
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8800/login', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/home');
                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            name='password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button type='submit' className='buttonlo'>
                        Log in
                    </button>
                    <p className='agree'>You agree to our terms and politics</p>
                    <Link to='/signup' className='next'> Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
