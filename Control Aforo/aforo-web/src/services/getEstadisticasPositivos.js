const ENDPOINT = process.env.REACT_APP_API_URL;

export default function getEstadisticasPositivos(jwt, total) {
    return fetch(`${ENDPOINT}/estadisticas/positivos?total=${total}`, {
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