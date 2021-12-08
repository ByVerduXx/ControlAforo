const ENDPOINT = 'http://localhost:3001';

export default function register({username, password, dni, email, telefono, nombre, direccion}) {
    return fetch(`${ENDPOINT}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, dni, email, telefono, nombre, direccion})
    }).then(res => {
        if (!res.ok) {
            const message = res.status === 400 ? 'Faltan datos' : 'El usuario ya existe';
            throw new Error(message)
        }
        
        return true
    })
}