import React from "react";
import ListingItem from "./ListingItem";
import Axios from "axios";

class MainPage extends React.Component{

    constructor(){
        super()
        this.state = {listings: []}
        
    }

    componentDidMount(){
        Axios.get("http://localhost:5000/api/listings").then (res => {
            this.setState({listings: res.data})
        });
    }

    render() {

        return (
            <React.Fragment>
                <div
                className="w3-container w3-jumbo"
                style={{margin: "3rem", paddingLeft: "1rem"}}>
                    Listings
                </div>
                <div className="w3-container">
                    {this.state.listings.length === 0 ? <p className="w3-xlarge w3-opacity" style={{marginLeft: "2rem"}}>No listings! Create one</p> : this.state.listings.map((item,index) =>{
                        return (
                            <ListingItem
                                Title={item.title}
                                Description={item.description}
                                Image={item.image}
                                Address={item.address}
                                Price={item.price}
                                key={index}
                                />
                        );
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default MainPage;