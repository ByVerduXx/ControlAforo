import React, {useEffect, useState} from 'react'
import useUser from '../../hooks/useUser'
import {useHistory, useParams} from 'react-router-dom'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Spinner from 'react-bootstrap/Spinner'
import './Profile.css'

function Profile() {

    const {isLogged, getUserData, userData, isUpdateUserLoading, hasUpdateUserError, updateUserMessage, updateUserData, deleteUser, 
        hasDeleteUserError, isDeleteUserLoading, deleteUserMessage, logout} = useUser()
    const history = useHistory()
    const {username} = useParams()
    const [modifiedData, setModifiedData] = useState({password: '', dni: '', email: '', telefono: '', nombre: '', direccion: '', rfid: '', oficina: ''})
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        document.title = 'CdA | Perfil'
    }, [])

    useEffect(() => {
        if (!isLogged) return history.push('/login')
        getUserData(username)
    }, [isLogged, history, getUserData, username])

    useEffect(() => {
        setModifiedData({...userData})
    }, [userData])

    useEffect(() => {
        if (!hasDeleteUserError && deleteUserMessage) {
            logout()
            history.push('/')
        }
    }, [hasDeleteUserError, deleteUserMessage, logout, history])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateUserData(username, modifiedData)
        setDisabled(true)
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
    }

    const handleDeleteClick = (e) => {
        e.preventDefault()
        if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) {
            deleteUser(username)
        }
    }
    return (
        <div className="profile">
            <h1 className='perfil-title'>Perfil</h1>
            {userData.error && <h1>{userData.error}</h1>}
            {(hasUpdateUserError || hasDeleteUserError) && <p className='error-modificar'>Ha habido un error</p>}
            {!hasUpdateUserError && updateUserMessage && <p className='success-modificar'>{updateUserMessage}</p>}
            {!userData.error && !isUpdateUserLoading && !isDeleteUserLoading &&
                <form className='perfil-form' onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <Input id='username' classname="desactivado" nombre="username" valor={userData.username} disabled />
                    <label htmlFor="password">Password</label>
                    <Input id='password' classname={disabled ? 'desactivado' : ''} nombre="password" type='password' valor='' disabled={disabled} onChange={handleChange} />
                    <label htmlFor="dni">DNI</label>
                    <Input id='dni' classname="desactivado" nombre="dni" valor={userData.dni} disabled />
                    <label htmlFor="email">Email</label>
                    <Input id='email' classname={disabled ? 'desactivado' : ''} nombre="email" valor={userData.email} disabled={disabled} onChange={handleChange} />
                    <label htmlFor="telefono">Teléfono</label>
                    <Input id='telefono' classname={disabled ? 'desactivado' : ''} nombre="telefono" valor={userData.telefono} disabled={disabled} onChange={handleChange} />
                    <label htmlFor="nombre">Nombre</label>
                    <Input id='nombre' classname={disabled ? 'desactivado' : ''} nombre="nombre" valor={userData.nombre} disabled={disabled} onChange={handleChange} />
                    <label htmlFor="direccion">Dirección</label>
                    <Input id='direccion' classname={disabled ? 'desactivado' : ''} nombre="direccion" valor={userData.direccion} disabled={disabled} onChange={handleChange} />
                    <label htmlFor="rfid">RFID</label>
                    <Input id='rfid' classname={'desactivado'} nombre="rfid" valor={userData.rfid} disabled />
                    <label htmlFor="oficina">Oficina</label>
                    <Input id='oficina' classname={'desactivado'} nombre="oficina" valor={userData.oficina} disabled />
                    <div className="botonera">
                        <Button classname="azul" disabled={!disabled} onClick={handleModifyClick}>Modificar</Button>
                        <Button classname="rojo" disabled={disabled} onClick={handleCancelClick} >Cancelar</Button>
                        <Button type="submit" classname="verde" disabled={disabled}>Enviar</Button>
                        <Button onClick={handleDeleteClick}>Borrar Cuenta</Button>
                    </div>
                </form>
            }
            {isUpdateUserLoading &&
                <>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    &nbsp;
                    &nbsp;
                    <strong>Modificando datos</strong>
                </>
            }
            {isDeleteUserLoading &&
                <>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    &nbsp;
                    &nbsp;
                    <strong>Borrando cuenta</strong>
                </>
            }
        </div>
    )
}

export default Profile
