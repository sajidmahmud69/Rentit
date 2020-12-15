import React from "react";
import Axios from 'axios'

function deleteListing(lid){
    Axios.delete ("http://localhost:5000/api/deletelisting/" + lid, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem ("token")
        }
    }).then (res => {
        console.log (res.data)
        window.location.reload()
    })
}



function ListingItem(props){
    return (
        <div 
            className = "w3-card w3-border w3-border-gray w3-round-large"
            style = {{marginTop: "2rem"}}
        >
            <div
                className = "w3-container" style = {{padding: "2rem"}}
            >
                <h2 className = "w2-opacity w3-xxlarge">
                    <span className = "w3-opacity">{props.Title}</span>
                    {props.isOwner && 
                        <button 
                            className="w3-right w3-button w3-red w3-large w3-hover-pale-red w3-round-large"
                            onClick = {() => deleteListing(props.id)}
                        >
                             
                            Delete
                        </button>
                    }
                </h2>
                <div>{props.Description}</div>
                <img src = {props.Image} style = {{width: "1100px"}}/>
                <div>{props.Address}</div>
                <div>{props.Price}</div>
            </div>
            <footer className = "w3-container w3-center w3-large">
                <button className = "w3-button" style = {{marginRight: "2rem" ,float:"left"}}>More Info </button>
                <button className = "w3-button" style = {{marginRight: "2rem" ,float:"left"}}>Like</button>
                <button className = "w3-button" style = {{marginRight: "2rem" ,float:"left"}}>Comment</button>
                <button className = "w3-button" style = {{marginRight: "2rem" ,float:"left"}}>Make an appointment</button>
            </footer>

        </div>
    );
}

export default ListingItem;