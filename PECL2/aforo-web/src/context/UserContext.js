import React, {useState} from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
    const [jwt, setJWT] = useState(() => 
        window.sessionStorage.getItem('jwt')
    );
    const [userData, setUserData] = useState({});

    return <Context.Provider value={{jwt, setJWT, userData, setUserData}}>
        {children}
    </Context.Provider>
    

}

export default Context