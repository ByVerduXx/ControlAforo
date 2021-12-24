import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import {useHistory, useParams} from 'react-router-dom'
import getNotifications from '../../services/getNotifications'


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
            Hello World
        </div>
    )
}

export default Notifications
