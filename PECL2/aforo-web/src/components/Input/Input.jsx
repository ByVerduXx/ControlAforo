import React from 'react'
import './Input.css'


function Input({type, value, placeholder, onChange}) {
    return (
        <input className="form-input" type={type} placeholder={placeholder} value={value} onChange={onChange} />
    )
}

export default Input
