const ENDPOINT = 'http://localhost:3001';

export default function getUserData(username, jwt) {
    return fetch(`${ENDPOINT}/auth/profile/${username}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${jwt}`
        }
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }).then(res => {
        return res.message
    })
}