import React, { Component } from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import locations from './../locations.js'

export class MyMap extends Component {
    constructor (){
        super ()
        this.state = {
            default_position : {
                // NYC centered
                lat: 40.7128, 
                lng: -74.0060
            }            
        }
    }
    
    displayMarkers = ()=> {
        // location parameter is taking an object of locations and looping thru them 
        return locations.map ((location, index)=>{
            return <Marker key = {index} id = {index} position = {location} />
        }) 
    }

    
    render() {
        const mapStyles = {
            width: '50%',
            height: '50%'
        }
        return (
            <div className = "map">
                <Map  
                    google = {this.props.google}
                    zoom = {8}
                    style = {mapStyles}
                    initialCenter = {this.state.default_position}
                >
                {this.displayMarkers()}
                </Map>               
                
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBTWnT0FVwWHskcTYJP-rJDMCnPfK9byIc'
})(MyMap);