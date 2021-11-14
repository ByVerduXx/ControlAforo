import { useCallback, useContext } from 'react';
import Context from '../context/UserContext';
import loginService from '../services/login'

export default function useUser () {
    const {jwt, setJWT} = useContext(Context)
    const login = useCallback(({username, password}) => {
        loginService({username, password})
            .then(jwt => {
                setJWT(jwt)
            })
            .catch(err => {
                console.log(err)
            })
    }, [setJWT])

    const logout = useCallback(() => {
        setJWT(null)
    }, [setJWT])

    return {
        isLogged: Boolean(jwt),
        login,
        logout
    }
}