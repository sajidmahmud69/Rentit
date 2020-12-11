import React, { Component } from 'react'
import './../index.css'

export class Position extends Component {
    constructor (){
        super ()
        this.state = {
            origin: "",
            destination: ""
        }
        this.handleChange = this.handleChange.bind (this)
    }
    handleChange (event){
        const {name, value} = event.target
        this.setState ({
            [name]: value
        })
        console.log (this.state.origin)
    }
    storeRawLocation(){
        let places =  this.state.origin
        places = places + "\n"
        places = places + this.state.destination
        places = JSON.stringify(places)
        const fs = require ('fs')
        fs.writeFile ('raw_location.txt', places, (err)=>{
            if (err) throw (err);
        })
    }
    componentDidMount(){
        console.log ("Mounted")
    }
    render() {
        return (
            <div>
                <main className = "form">
                    <form type  = "submit">
                        <input 
                            type = "text"
                            name = "origin"
                            value = {this.state.origin}
                            placeholder = "Starting Point" 
                            onChange = {this.handleChange}
                        />
                        <br />
                        <input 
                            type = "text"
                            name = "destination"
                            value = {this.state.destination}
                            placeholder = "Ending Point"
                            onChange = {this.handleChange}
                        />
                        <br />
                        <hr />
                        <h3>Entered addreses</h3>
                        <p>Origin: {this.state.origin}</p>
                        <p>Destination: {this.state.destination}</p>
                        <hr />
                    </form>
                    <button onClick = {this.storeRawLocation}>Convert to Geocode</button>
                </main>
            </div>
        )
    }
}

export default Position
