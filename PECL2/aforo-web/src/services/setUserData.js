const ENDPOINT = 'http://localhost:5000';

export default function setUserData(username, jwt, userData) {
    return fetch(`${ENDPOINT}/auth/profile/${username}`, {
        method: 'PUT',
        headers: {
            'Authorization': `JWT ${jwt}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(res => {
        if (!res.ok) throw new Error('Ha habido un error.')
        return res.json()
    }).then(res => {
        return res.message
    })
}