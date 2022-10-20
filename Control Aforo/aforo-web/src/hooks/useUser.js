import { useCallback, useContext, useState } from 'react';
import Context from '../context/UserContext';
import loginService from '../services/login'
import getUserDataService from '../services/getUserData'
import setUserDataService from '../services/setUserData';
import deleteUserService from '../services/deleteUser';

export default function useUser () {
    const {jwt, setJWT, userData, setUserData} = useContext(Context)
    const [state, setState] = useState({loading: false, error: false})
    const [updateUserState, setUpdateUserState] = useState({loading: false, error: false, message: ''})
    const [deleteUserState, setDeleteUserState] = useState({loading: false, error: false, message: ''})

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

    const updateUserData = useCallback((username, userdata) => {
        setUpdateUserState({loading: true, error: false, message: ''})
        setUserDataService(username, jwt, userdata)
            .then(resp => {
                setUpdateUserState({loading: false, error: false, message: 'Usuario actualizado correctamente'})
            })
            .catch(err => {
                setUpdateUserState({loading: false, error: true, message: ''})
            })
    }, [jwt])

    const deleteUser = useCallback((username) => {
        setDeleteUserState({loading: true, error: false, message: ''})
        deleteUserService(username, jwt)
            .then(resp => {
                setDeleteUserState({loading: false, error: false, message: 'Usuario eliminado correctamente'})
            })
            .catch(err => {
                setDeleteUserState({loading: false, error: true, message: ''})
            })
    }, [jwt])

    return {
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        isUpdateUserLoading: updateUserState.loading,
        hasUpdateUserError: updateUserState.error,
        updateUserMessage: updateUserState.message,
        isDeleteUserLoading: deleteUserState.loading,
        hasDeleteUserError: deleteUserState.error,
        deleteUserMessage: deleteUserState.message,
        login,
        logout,
        getUserData,
        updateUserData,
        deleteUser,
        userData
    }
}