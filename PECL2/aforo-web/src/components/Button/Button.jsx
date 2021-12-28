import React from 'react'
import './Button.css'


function Button({identificador="", classname="", type="", onClick=() => {}, disabled=false,children}) {
    if (disabled) {return (
        <button id={identificador} className={`${classname} desactivado`} onClick={onClick} type={type} disabled>{children}</button>
    )} else {}
    return (
        <button id={identificador} className={classname} onClick={onClick} type={type}>{children}</button>
    )
}

export default Button
