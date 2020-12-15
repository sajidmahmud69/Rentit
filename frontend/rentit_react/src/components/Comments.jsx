import Axios from 'axios'
import React from 'react'

function Comments(props) {
    const submitForm = e => {
        e.preventDefault()
        Axios.post ("http://localhost:5000/api/addcomment", {
            comment : document.getElementById ("comment").value,
            list_id : props.list_id
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem ("token")
            }
        }).then (res => {
            if (res.data.success){
                window.location.reload ()
            }
        })
    }
    return (
        <div className = "w3-modal w3-animate-opacity" id = "comments">
            <div className = "w3-modal-content w3-card">
                <header className = "w3-container w3-blue">
                    <span className = "w3-button w3-display-topright w3-hover-none w3-hover-text-white" onClick = {() => {
                        document.getElementById("comments").style.display = "none"
                    }}>X</span>
                    <h2>Write a comment</h2>
                </header>
                <form className = "w3-container" onSubmit = {submitForm}>
                    <div className = "w3-section">
                        {/* <label htmlFor = "name">Name</label>
                        <input type = "text" id = "name" className = "w3-input w3-border w3-margin-bottom" /> */}
                        

                        <label htmlFor = "comment">Comment</label>
                        <textarea rows = {4} cols = {76} id = "comment"/>


                        <button type = "submit" className = "w3-button w3-blue">Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default Comments
