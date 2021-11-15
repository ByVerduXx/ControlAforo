import { useCallback, useContext, useState } from 'react';
import Context from '../context/UserContext';
import loginService from '../services/login'

export default function useUser () {
    const {jwt, setJWT} = useContext(Context)
    const [state, setState] = useState({loading: false, error: false})
    const [username, setUsername] = useState(null)
    const login = useCallback(({username, password}) => {
        setState({loading: true, error: false})
        loginService({username, password})
            .then(jwt => {
                setState({loading: false, error: false})
                setJWT(jwt)
                console.log(username)
                setUsername(username)
            })
            .catch(err => {
                setState({loading: false, error: true})
                console.log(err)
            })
    }, [setJWT])

    const logout = useCallback(() => {
        setJWT(null)
        setUsername(null)
    }, [setJWT])

    return {
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        username,
        login,
        logout
    }
}