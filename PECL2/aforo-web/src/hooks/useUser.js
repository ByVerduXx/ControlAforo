import { useCallback, useContext, useState } from 'react';
import Context from '../context/UserContext';
import loginService from '../services/login'
import getUserDataService from '../services/getUserData'

export default function useUser () {
    const {jwt, setJWT, userData, setUserData} = useContext(Context)
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

    const logout = useCallback((username) => {
        window.sessionStorage.removeItem('user')
        window.sessionStorage.removeItem('jwt')
        setJWT(null)
        setUserData({})
    }, [setJWT, setUserData])

    const getUserData = useCallback((username) => {
        getUserDataService(username, jwt)
            .then(userData => {
                setUserData(userData)
            })
            .catch(err => {
                setUserData({error: '401 Unauthorized'})
            })
    }, [jwt, setUserData]) 

    return {
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout,
        getUserData,
        userData
    }
}