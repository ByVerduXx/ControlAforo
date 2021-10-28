import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import './Login.css'

import useUser from '../../hooks/useUser';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPasword] = useState('');
    let history = useHistory()

    const {login, isLogged} = useUser();

    useEffect(() => {
        if (isLogged) {
            history.push('/')
        }
    },[isLogged, history])

    function handleSubmit (e) {
        e.preventDefault()
        login()
    }
    return (
        <div className="login">
            <div className="formulario">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    <input type="password" placeholder="password" value={password} onChange={(e) => {setPasword(e.target.value)}}/>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
