import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import './Login.css'

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPasword] = useState('');
    let history = useHistory()

    function handleSubmit (e) {
        e.preventDefault()
        history.push('/')
    }
    return (
        <div className="login">
            <div className="formulario">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    <input type="password" placeholder="password" />
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
