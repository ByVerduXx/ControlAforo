const ENDPOINT = 'http://localhost:3001';

export default function login({username, password}) {
    return fetch(`${ENDPOINT}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const jwt = res.token
        return jwt
    })
}

