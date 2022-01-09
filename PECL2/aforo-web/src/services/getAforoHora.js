const ENDPOINT = process.env.REACT_APP_API_URL;

export default function getAforoHora(jwt, hora) {
    return fetch(`${ENDPOINT}/estadisticas/aforo_hora?hora=${hora}`,{
        method: 'GET',
        headers: {
            'Authorization': `JWT ${jwt}`
        }
    })
    .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    })
    .then(data => {
        return data
    }).catch(err => {
        console.log(err)
    })
}