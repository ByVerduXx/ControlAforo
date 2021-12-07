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
    const [modifiedData, setModifiedData] = useState({password: '', age: '', color: ''})
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
                    <label htmlFor="age">Edad</label>
                    <Input id='age' classname={disabled ? 'desactivado' : ''} nombre="age" valor={modifiedData.age} disabled={disabled} onChange={handleChange} />
                    <label htmlFor="color">Color</label>
                    <Input id='color' classname={disabled ? 'desactivado' : ''} nombre="color" valor={modifiedData.color} disabled={disabled} onChange={handleChange} />
                    <Button classname="azul" disabled={!disabled} onClick={handleModifyClick}>Modificar</Button>
                    <Button classname="rojo" disabled={disabled} onClick={handleCancelClick} >Cancelar</Button>
                    <Button type="submit" classname="verde" disabled={disabled}>Enviar</Button>
                    <Button onClick={handleDeleteClick}>Borrar Cuenta</Button>
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
