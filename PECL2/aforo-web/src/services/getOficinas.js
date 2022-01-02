const ENDPOINT = process.env.REACT_APP_API_URL;

export default function getOficinas() {
    return fetch(`${ENDPOINT}/oficinas`)
    .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    })
    .then(data => {
        let oficinas = []
        data.map(oficina => {
            return oficinas.push(oficina.id_oficina)
        })
        return oficinas
    }).catch(err => {
        console.log(err)
    })
}