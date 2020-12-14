import Axios from 'axios'
import React from 'react'

function AddListing() {
    
    const submitForm = e => {
        e.preventDefault()
        Axios.post ("http://localhost:5000/api/addlisting", {
            title: document.getElementById ("title").value,
            description: document.getElementById ("description").value,
            image: document.getElementById ("image").value,
            address: document.getElementById ("address").value,
            price: document.getElementById ("price").value
        },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem ("token")
            }
        }).then (res => {
            if (res.data.success){
                window.location.reload()
            }
        })
    }


    return (
        <div className = "w3-modal w3-animate-opacity" id = "addListing">
            <div className = "w3-modal-content w3-card">
                <header className = "w3-container w3-blue">
                    <span className = "w3-button w3-display-topright w3-hover-none w3-hover-text-white" onClick = {() => {
                        document.getElementById("addListing").style.display = "none"
                    }}>X</span>
                    <h2>Add Listing</h2>
                </header>
                <form className = "w3-container" onSubmit = {submitForm}>
                    <div className = "w3-section">
                        <label htmlFor = "title">Title</label>
                        <input type = "text" id = "title" className = "w3-input w3-border w3-margin-bottom" />
                        <label htmlFor = "title">Description</label>
                        <input type = "text" id = "description" className = "w3-input w3-border w3-margin-bottom" />
                        <label htmlFor = "title">Image URL</label>
                        <input type = "text" id = "image" className = "w3-input w3-border w3-margin-bottom" />
                        <label htmlFor = "title">Address</label>
                        <input type = "text" id = "address" className = "w3-input w3-border w3-margin-bottom" />
                        <label htmlFor = "title">Price</label>
                        <input type = "text" id = "price" className = "w3-input w3-border w3-margin-bottom" />
                        <button type = "submit" className = "w3-button w3-blue">Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default AddListing