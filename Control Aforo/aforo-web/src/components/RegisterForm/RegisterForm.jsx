import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Formik } from 'formik'
import registerService from '../../services/register'
import Input from '../Input/Input'
import Button from '../Button/Button'

function RegisterForm() {

    const [registered, setRegistered] = useState(false)
    const history = useHistory()

    if (registered) {
        
        return (
            <>
                <h4 className="register-success">Te has registrado correctamente</h4>
                <div className="botones-volver">
                    <Button classname="verde" onClick={() => history.push('/login')}>Ir a iniciar sesión</Button>
                    <Button classname="azul" onClick={() => history.push('/')}>Volver al inicio</Button>
                </div>
                
            </>
        )
    
    }

    return (
        <>
            <Formik
                initialValues={{ username: '', password: '', dni: '', email: '', telefono: '', nombre: '', direccion: '', rfid: '', oficina: '' }}
                onSubmit={async (values, { setFieldError }) => {
                    return registerService(values)
                        .then(() => {
                            setRegistered(true)
                        })
                        .catch((err) => {
                            console.log(err)
                            setFieldError('request', err.message)
                        })
                }}
            >
                {
                    ({ errors, handleChange, handleSubmit, isSubmitting }) => (
                        <>
                            <span className="register-error">
                                {errors.request || ''}
                            </span>

                            <form className="register-form" onSubmit={handleSubmit}>
                                <Input nombre="username" onChange={handleChange} placeholder="Username" />
                                <Input nombre="password" type="password" onChange={handleChange} placeholder="Password" />
                                <Input nombre="dni" onChange={handleChange} placeholder="DNI" />
                                <Input nombre="email" onChange={handleChange} placeholder="Email" />
                                <Input nombre="telefono" onChange={handleChange} placeholder="Telefono" />
                                <Input nombre="nombre" onChange={handleChange} placeholder="Nombre" />
                                <Input nombre="direccion" onChange={handleChange} placeholder="Direccion" />
                                <Input nombre="rfid" onChange={handleChange} placeholder="RFID" />
                                <Input nombre="oficina" onChange={handleChange} placeholder="Oficina" />
                                <Button classname="boton-registrar" disabled={isSubmitting}>
                                    Registrarse
                                </Button>
                            </form>
                        </>
                    )}
            </Formik>
        </>
    )
}

export default RegisterForm
