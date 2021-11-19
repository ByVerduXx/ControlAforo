import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import './Register.css'


function Register() {
    return (
        <div className="register">
            <h1 className="register-title">Register</h1>
            <RegisterForm className="register-form"/>
        </div>
    )
}

export default Register
