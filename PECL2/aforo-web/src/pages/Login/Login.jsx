import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import './Login.css'

import useUser from '../../hooks/useUser';

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

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
        login({username, password})
    }
    return (
        <div className="login">
            <h1 className="login-title">Login</h1>
            <div className="formulario">
                <form onSubmit={handleSubmit}>
                    <Input type='text' placeholder='Username' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => {setPasword(e.target.value)}}/>
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login
