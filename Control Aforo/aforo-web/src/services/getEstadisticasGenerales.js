const ENDPOINT = process.env.REACT_APP_API_URL;

export default function getEstadisticasGenerales(jwt) {
    return fetch(`${ENDPOINT}/estadisticas`, {
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