import React from 'react'

function ViewComments(props) {
    return (
        <div className = "w3-modal w3-animate-opacity" id = "view-comments">
        <div className = "w3-modal-content w3-card">
            <header className = "w3-container w3-blue">
                <span className = "w3-button w3-display-topright w3-hover-none w3-hover-text-white" onClick = {() => {
                    document.getElementById("view-comments").style.display = "none"
                }}>X</span>
                <h2>Comment Section</h2>
                
            </header>
            <div>
                {props.comment}
            </div>
        </div>
        
    </div>
    )
}

export default ViewComments
