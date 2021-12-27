const ENDPOINT = process.env.REACT_APP_API_URL;

export default function getNotifications(username, jwt) {
    return fetch(`${ENDPOINT}/users/${username}/notifications`, {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${jwt}`
        }
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
        return err
    })
}