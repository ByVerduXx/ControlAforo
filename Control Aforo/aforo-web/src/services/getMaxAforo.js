const ENDPOINT = process.env.REACT_APP_API_URL;

export default function getMaxAforo(id_oficina) {
    return fetch(`${ENDPOINT}/oficinas/${id_oficina}/max_aforo`)
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