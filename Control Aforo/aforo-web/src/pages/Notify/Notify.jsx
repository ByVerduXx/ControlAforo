import React, {useEffect, useState} from 'react'
import './Notify.css'
import useUser from '../../hooks/useUser'
import {useHistory} from 'react-router-dom'

import notify from '../../services/notify'

import Button from '../../components/Button/Button'

function Notify() {

    const {isLogged} = useUser()
    let history = useHistory()

    const [hidden, setHidden] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        document.title = 'CdA | Notificar'
    }, [])

    const handleClick = () => {
        if (!isLogged) return history.push('/login')
        notify(window.sessionStorage.getItem('jwt')).then(res => {
            if (res.status === 201) {
                setHidden(false)
                setError(false)
            }
        }).catch(err => {
            setHidden(false)
            setError(true)
        })
    }

    return (
        <div className="notify">
            <h1 className="notify-title">Notificar</h1>
            <p className="notify-p">En este apartado puedes notificar que has dado positivo en COVID-19,
                para poner sobre aviso a las personas con las que has coincidido en los últimos días. Por favor, pulsa el botón solo si se trata de un positivo real.</p>
            {!hidden && <p className={`notify-alert ${error ? 'notify-error' : 'notify-success'}`}>{error ? 'Ha ocurrido un error' : 'Notificacion enviada con exito'}</p>}
            <div className="boton-notify">
                <Button onClick={handleClick}>Notificar</Button>
            </div>
        </div>
    )
}

export default Notify
