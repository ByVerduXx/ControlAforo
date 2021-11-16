const ENDPOINT = 'http://localhost:5000';

export default function getUserData(username, jwt) {
    return fetch(`${ENDPOINT}/auth/profile/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${jwt}`
        }
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }).then(res => {
        const userData = {username: res.username,password: res.password,age: res.age, color: res.color}
        return userData
    })
}

