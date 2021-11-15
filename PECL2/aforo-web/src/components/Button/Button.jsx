import React from 'react'
import './Button.css'


function Button({type="", onClick=() => {}, children}) {
    return (
        <button onClick={onClick} type={type}>{children}</button>
    )
}

export default Button
