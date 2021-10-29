import React from 'react'
import './Button.css'


function Button({type="", children}) {
    return (
        <button type={type}>{children}</button>
    )
}

export default Button
