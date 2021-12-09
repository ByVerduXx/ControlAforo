const ENDPOINT = process.env.REACT_APP_API_URL;

export default function getUserData(username, jwt) {
    return fetch(`${ENDPOINT}/users/profile/${username}`, {
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