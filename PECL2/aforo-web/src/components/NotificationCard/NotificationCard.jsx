import React from 'react'
import './NotificationCard.css'


function NotificationCard({username, email, nombre_completo, fecha_positivo}) {
    
    let fecha = new Date(fecha_positivo)

    return (
        <div className="NotificationCard">
            <h4 className='card-titulo'>Usuario positivo</h4>
            <div className="NotificationCard-header">
                <div className="NotificationCard-header-nombre">
                    Ha dado positivo: {nombre_completo}
                </div>
                <div className="NotificationCard-header-email">
                    Contacto: {email}
                </div>
            </div>
            <div className="NotificationCard-body">
                <div className="NotificationCard-body-username">
                    Usuario: {username}
                </div>
                <div className="NotificationCard-body-fecha">
                    Fecha notificacion: {fecha.toLocaleDateString()}
                </div>
            </div>
        </div>
    )
}

export default NotificationCard