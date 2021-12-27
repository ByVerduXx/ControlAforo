import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import {useHistory, useParams} from 'react-router-dom'
import getNotifications from '../../services/getNotifications'

import NotificationCard from '../../components/NotificationCard/NotificationCard'
import Button from '../../components/Button/Button'

import './Notifications.css'

function Notifications() {

    const {isLogged} = useUser()
    const history = useHistory()
    const {username} = useParams()

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        document.title = 'CdA | Notificaciones'
    }, [])

    useEffect(() => {
        if (!isLogged) return history.push('/login')
    }, [isLogged, history])

    useEffect(() => {
        let jwt = window.sessionStorage.getItem('jwt')
        getNotifications(username, jwt).then(setNotifications)
    }, [username])

    return (
        <div className='notifications'>
            <div className='notifications-list'>
                {notifications.map(notification => (
                    <div>
                        <NotificationCard key={notification.id_notificacion} {...notification} />
                        <Button classname='rojo' type='button'><i className='fas fa-trash'></i></Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notifications
