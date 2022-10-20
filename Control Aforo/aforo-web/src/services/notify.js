const ENDPOINT = process.env.REACT_APP_API_URL;

export default function notify(jwt) {
    return fetch(`${ENDPOINT}/notify`, {
        method: 'POST',
        headers: {
            'Authorization': `JWT ${jwt}`
        },
    }).then(res => {
        if (!res.ok) throw new Error('Ha habido algún error, por favor intentelo de nuevo')
        return res
    }).catch(err => {
        console.log(err)
        throw new Error('Ha habido algún error, por favor intentelo de nuevo')
    })
}
