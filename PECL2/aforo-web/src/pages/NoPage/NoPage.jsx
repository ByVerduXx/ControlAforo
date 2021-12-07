import React, {useEffect} from 'react'
import './NoPage.css'

function NoPage() {

    useEffect(() => {
        document.title = 'CdA | 404'
    }, [])

    return (
        <div className="nopage">
            <h1 className="nopage-title">404 NOT FOUND</h1>
        </div>
    )
}

export default NoPage
