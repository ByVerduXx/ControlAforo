const ENDPOINT = process.env.REACT_APP_API_URL;

export default function register({username, password, dni, email, telefono, nombre, direccion, rfid, oficina}) {
    return fetch(`${ENDPOINT}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, dni, email, telefono, nombre, direccion, rfid, oficina})
    }).then(res => {
        if (!res.ok) {
            const message = res.status === 400 ? 'Faltan datos' : 'El usuario ya existe';
            throw new Error(message)
        }
        
        return true
    })
}