import React, {useEffect, useState} from 'react'
import useUser from '../../hooks/useUser'
import {useHistory, useParams} from 'react-router-dom'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './Profile.css'

function Profile() {

    const {isLogged, getUserData, userData} = useUser()
    const history = useHistory()
    const {username} = useParams()
    const [modifiedData, setModifiedData] = useState({password: '', age: userData.age, color: userData.color})
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (!isLogged) return history.push('/login')
        getUserData(username)
    }, [isLogged, history, getUserData, username])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(modifiedData)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setModifiedData({...modifiedData, [name]: value})
    }

    const handleModifyClick = () => {
        setDisabled(false)
    }

    const handleCancelClick = () => {
        setDisabled(true)
        setModifiedData({password: '', age: userData.age, color: userData.color})
    }

    const handleDeleteClick = () => {
        console.log('delete')
    }

    return (
        <div className="profile">
            {userData.error && <h1>{userData.error}</h1>}
            {!userData.error && 
                <>
                    <h1 className='perfil-title'>Perfil</h1>
                    <form className='perfil-form' onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <Input id='username' classname="desactivado" nombre="username" valor={userData.username} disabled />
                        <label htmlFor="password">Password</label>
                        <Input id='password' classname={disabled ? 'desactivado' : ''} nombre="password" type='password' valor='' disabled={disabled} onChange={handleChange} />
                        <label htmlFor="age">Edad</label>
                        <Input id='age' classname={disabled ? 'desactivado' : ''} nombre="age" valor={userData.age} disabled={disabled} onChange={handleChange} />
                        <label htmlFor="color">Color</label>
                        <Input id='color' classname={disabled ? 'desactivado' : ''} nombre="color" valor={userData.color} disabled={disabled} onChange={handleChange} />
                        <Button classname="azul" disabled={!disabled} onClick={handleModifyClick}>Modificar</Button>
                        <Button type="submit" classname="verde" disabled={disabled}>Enviar</Button>
                        <Button classname="rojo" disabled={disabled} onClick={handleCancelClick} >Cancelar</Button>
                        <Button onClick={handleDeleteClick}>Borrar Cuenta</Button>
                    </form>
                </>
            }
        </div>
    )
}

export default Profile
