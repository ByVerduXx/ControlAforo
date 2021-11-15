import { useCallback, useContext, useState } from 'react';
import Context from '../context/UserContext';
import loginService from '../services/login'

export default function useUser () {
    const {jwt, setJWT} = useContext(Context)
    const [state, setState] = useState({loading: false, error: false})

    const login = useCallback(({username, password}) => {
        setState({loading: true, error: false})
        loginService({username, password})
            .then(jwt => {
                window.sessionStorage.setItem('jwt', jwt)
                window.sessionStorage.setItem('user', username)
                setState({loading: false, error: false})
                setJWT(jwt)  
            })
            .catch(err => {
                window.sessionStorage.removeItem('user')
                window.sessionStorage.removeItem('jwt')
                setState({loading: false, error: true})
                console.log(err)
            })
    }, [setJWT])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('user')
        window.sessionStorage.removeItem('jwt')
        setJWT(null)
    }, [setJWT])

    return {
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }
}