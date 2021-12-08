const ENDPOINT = 'http://localhost:3001';

export default function getUserData(username, jwt) {
    return fetch(`${ENDPOINT}/users/profile/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${jwt}`
        }
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }).then(res => {
        const userData = {
            username: res.username, password: res.contrasena,
            dni: res.dni, email: res.email, telefono: res.telefono, nombre: res.nombre_completo, direccion: res.direccion
        }
        return userData
    })
}

