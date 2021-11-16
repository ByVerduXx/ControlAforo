import React, {useEffect} from 'react'
import useUser from '../../hooks/useUser'
import {useHistory, useParams} from 'react-router-dom'
//import Input from '../../components/Input/Input'
import './Profile.css'

function Profile() {

    const {isLogged, getUserData, userData} = useUser()
    const history = useHistory()
    const {username} = useParams()

    useEffect(() => {
        if (!isLogged) return history.push('/login')
        getUserData(username)
    }, [isLogged, history, getUserData, username])

    return (
        <div className="profile">
            {userData.error && <h1>{userData.error}</h1>}
            {!userData.error && 
                <h1>Perfil</h1>
            }
        </div>
    )
}

export default Profile
