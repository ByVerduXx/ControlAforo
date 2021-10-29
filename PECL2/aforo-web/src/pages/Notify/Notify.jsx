import React from 'react'
import './Notify.css'

import Button from '../../components/Button/Button'

function Notify() {
    return (
        <div className="notify">
            <h1>Notificar</h1>
            <p>En este apartado puedes notificar que has dado positivo en COVID-19,
                para poner sobre aviso a las personas con las que has coincidido en los últimos días. Por favor, pulsa el botón solo si se trata de un positivo real.</p>
            <div className="boton-notify">
                <Button>Notificar</Button>
            </div>
        </div>
    )
}

export default Notify
