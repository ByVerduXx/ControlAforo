import React from 'react'
import './NotificationCard.css'


function NotificationCard({username, email, nombre_completo, fecha_positivo}) {
    
    let fecha = new Date(fecha_positivo)

    return (
        <div className="NotificationCard">
            <h4 className='card-titulo'>Usuario positivo</h4>
            <div className="NotificationCard-header">
                <div className="NotificationCard-header-nombre">
                    Ha dado positivo: <strong>{nombre_completo}</strong>
                </div>
                <div className="NotificationCard-header-email">
                    Contacto: <strong>{email}</strong>
                </div>
            </div>
            <div className="NotificationCard-body">
                <div className="NotificationCard-body-username">
                    Usuario: <strong>{username}</strong>
                </div>
                <div className="NotificationCard-body-fecha">
                    Fecha notificacion: {fecha.toLocaleDateString('es-ES')}
                </div>
            </div>
        </div>
    )
}

export default NotificationCard