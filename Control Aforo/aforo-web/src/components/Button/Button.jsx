import React from 'react'
import './Button.css'


function Button({classname="", type="", onClick=() => {}, disabled=false,children}) {
    if (disabled) {return (
        <button className={`${classname} desactivado`} onClick={onClick} type={type} disabled>{children}</button>
    )} else {}
    return (
        <button className={classname} onClick={onClick} type={type}>{children}</button>
    )
}

export default Button
