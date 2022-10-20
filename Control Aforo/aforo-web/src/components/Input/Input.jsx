import React from 'react'
import './Input.css'


function Input({classname, type="text", nombre, valor, placeholder, onChange, disabled=false}) {
    if (disabled) {return (
        <input className={`form-input ${classname}`} type={type} name={nombre} placeholder={placeholder} defaultValue={valor} onChange={onChange} disabled/>
    )} else {
        return (
            <input className={`form-input`} type={type} name={nombre} placeholder={placeholder} defaultValue={valor} onChange={onChange} />
        )
    }
    
}

export default Input
