import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8800/signup', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/');
                } else {
                    alert('Error');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            name='name'
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
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
                        Sign up
                    </button>
                    <p className='agree'>You agree to our terms and politics</p>
                    <Link to='/' className='next'>
                        Log in
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;

