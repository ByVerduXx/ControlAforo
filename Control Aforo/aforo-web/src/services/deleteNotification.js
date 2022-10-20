const ENDPOINT = process.env.REACT_APP_API_URL;

export default function deleteNotification(username, jwt, id_notificacion) {
    return fetch(`${ENDPOINT}/users/${username}/notifications/${id_notificacion}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `JWT ${jwt}`
        }
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }).then(res => {
        return res.message
    }).catch(err => {
        console.log(err)
        return err
    })
}