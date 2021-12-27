import React from 'react'
import './NotificationCard.css'


function NotificationCard({username, email, nombre_completo, fecha_positivo}) {
    
    return (
        <div className="NotificationCard">
            <div className="NotificationCard-header">
                <div className="NotificationCard-header-username">
                    {username}
                </div>
                <div className="NotificationCard-header-email">
                    {email}
                </div>
            </div>
            <div className="NotificationCard-body">
                <div className="NotificationCard-body-nombre">
                    {nombre_completo}
                </div>
                <div className="NotificationCard-body-fecha">
                    {fecha_positivo}
                </div>
            </div>
        </div>
    )
}

export default NotificationCard