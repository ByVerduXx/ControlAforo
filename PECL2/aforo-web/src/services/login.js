const ENDPOINT = 'http://192.168.1.136:5000';

export default function login({username, password}) {
    return fetch(`${ENDPOINT}/auth/login`, {
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

