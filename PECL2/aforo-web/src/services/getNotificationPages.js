const ENDPOINT = process.env.REACT_APP_API_URL;

export default function getNotificationPages(username, jwt) {
    return fetch(`${ENDPOINT}/users/${username}/notifications/pages`,{
        method: 'GET',
        headers: {
            'Authorization': `JWT ${jwt}`
        }
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    })
    .then(data => {
        return data.pages
    }).catch(err => {
        console.log(err)
    })
    
}