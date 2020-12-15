import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Comments from './Comments'
import ViewComments from "./ViewComments";
import Appointment from './Appointment'

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
    const [comments, setComments] = useState ([])

    useEffect (() => {
        Axios.get ("http://localhost:5000/api/comments")
        .then (res => setComments (res.data))
    }, [])

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
                <div><h3>Description: {props.Description}</h3></div>
                <img src = {props.Image} style = {{width: "1100px"}}/>
                <div>{props.Address}</div>
                <div>${props.Price}</div>
            </div>
            <div className = "w3-modal-content w3-card">
                <footer className = "w3-container w3-center w3-large">
                    <button 
                        className = "w3-button" style = {{marginRight: "2rem" ,float:"left"}} onClick = {() => {
                            document.getElementById("view-comments").style.display = "block"
                        }}>   View Comments 
                    </button>
                        {comments.map (item => {
                            return (
                                <ViewComments comment = {item.comment} />
                            )
                        })}


                    <button className = "w3-button" style = {{marginRight: "2rem" ,float:"left"}}onClick = {() => {
                        document.getElementById ("comments").style.display = "block"
                    }}>Comment</button>
                    <Comments list_id = {props.id}/>

                    <button className = "w3-button" style = {{marginRight: "2rem" ,float:"left"}}onClick = {() => {
                        document.getElementById ("appointment").style.display = "block"
                    }}>Make an appointment</button>
                    <Appointment />
                </footer>
            </div>
                {console.log (comments.comment)}
        </div>
    );
}

export default ListingItem;

