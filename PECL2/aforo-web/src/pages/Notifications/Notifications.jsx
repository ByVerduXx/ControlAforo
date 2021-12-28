import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { useHistory, useParams } from 'react-router-dom'

import getNotifications from '../../services/getNotifications'
import getNotificationPages from '../../services/getNotificationPages'
import deleteNotification from '../../services/deleteNotification'

import NotificationCard from '../../components/NotificationCard/NotificationCard'
import Button from '../../components/Button/Button'

import './Notifications.css'

function Notifications() {

    const { isLogged } = useUser()
    const history = useHistory()
    const { username } = useParams()

    const [pages, setPages] = useState(0)
    const [pagina, setPagina] = useState(1)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        document.title = 'CdA | Notificaciones'
    }, [])

    useEffect(() => {
        if (!isLogged) return history.push('/login')
    }, [isLogged, history])

    useEffect(() => {
        let jwt = window.sessionStorage.getItem('jwt')
        getNotifications(username, jwt, pagina).then(setNotifications)
        getNotificationPages(username, jwt).then(setPages)
    }, [username, pagina])

    const handleNextPage = () => {
        if (pagina < pages) {
            setPagina(pagina + 1)
        }
    }

    const handlePreviousPage = () => {
        if (pagina > 1) {
            setPagina(pagina - 1)
        }
    }

    const handleDelete = (e) => {
        console.log(e.target.id)
        if (window.confirm('¿Estás seguro de que quieres eliminar esta notificación?')) {
            let jwt = window.sessionStorage.getItem('jwt')
            deleteNotification(username, jwt, e.target.id).then(() => {
                getNotifications(username, jwt, pagina).then(setNotifications)
                getNotificationPages(username, jwt).then(setPages)
                setPagina(1)
            })
        }
    }

    return (
        <div className='notifications'>
            <h1 className='notifications-title'>Notificaciones</h1>
            <div className='notifications-content'>
                <div className='notifications-container'>
                    {notifications.map(notification => (
                        <div className="notification-item" key={notification.id_notificacion}>
                            <NotificationCard {...notification} />
                            <Button identificador={notification.id_notificacion} classname='rojo' type='button' onClick={handleDelete}><i className='fas fa-trash'></i></Button>
                        </div>
                    ))}
                </div>
                <div className='botones-paginas'>
                    <Button onClick={handlePreviousPage} disabled={pagina === 1 ? true : false}>Ant</Button>
                    <p className='texto-pagina'>Pagina {pagina}/{pages}</p>
                    <Button onClick={handleNextPage} disabled={pagina === pages ? true : false}>Sig</Button>
                </div>
            </div>
        </div> 
    )
}

export default Notifications
