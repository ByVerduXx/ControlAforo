const ENDPOINT = 'http://localhost:5000';

export default function register({username, password, age, color}) {
    return fetch(`${ENDPOINT}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, age, color})
    }).then(res => {
        if (!res.ok) {
            const message = res.status === 400 ? 'Faltan datos' : 'El usuario ya existe';
            throw new Error(message)
        }
        
        return true
    })
}