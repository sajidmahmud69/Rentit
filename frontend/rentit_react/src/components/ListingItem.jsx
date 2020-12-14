import React from "react";

function ListingItem(props){
    return (
            <div 
                        className = "w3-card w3-border w3-border-gray w3-round-large"
                        style = {{marginTop: "2rem"}}
                    >
                        <div
                            className = "w3-container" style = {{padding: "2rem"}}
                        >
                            <h2 className = "w2-opacity w3-xxlarge">{props.Title}</h2>
                            <div>{props.Description}</div>
                            <img src = {props.Image}/>
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