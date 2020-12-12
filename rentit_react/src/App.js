import React from 'react'

function App() {
    return (
        <form action = "http://localhost:5000/">
            username <input type = "text" name = "username" />
            <br></br> <br></br>
            password <input type = "password" name = "password"/>
        </form>
    )
}

export default App
