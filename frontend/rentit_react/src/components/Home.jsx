import React from "react";

function Home() {
    return (
        <React.Fragment>
            <div
                className="w3-container w3-center w3-blue"
                style={{ padding: "2rem" }}>
                <h1 className="w3-jumbo" style={{color:"black",fontFamily:"serif",fontWeight:"bold"}}>~ Rentit ~</h1>
                <h2 style={{color:"black",fontFamily:"serif"}}>we find you your new home</h2>
                <div
                className="w3-container w3-blue"
                style={{ padding: "2rem", marginTop: "2rem" }}>
                <h2>You can find for-rent ad listings</h2>
                <p>You can find nearby for-rent ad listings here.</p>
                <p>You can make comments, make an appointment with the landlord.</p>
                <p>You do have to sign up or login to your account.</p>
            </div>

            <div
                className="w3-container w3-blue"
                style={{ padding: "2rem", marginTop: "2rem", }}>
                <h2 style={{color:"black",fontFamily:"serif"}}>You can post for-rent ads as well</h2>
                
                <p style={{color:"black"}}>You can also change your password, delete your account. However,</p>
                <p style={{color:"black"}}>deleting your account will also remove your ad listings.</p>
            </div>

            <div
                className="w3-container w3-blue"
                style={{ padding: "2rem", marginTop: "2rem" }}>
                <h2>You can pay rent through here!</h2>

                <p>Our great great integration with up-to-date payment methods</p>
                <p>makes it easy for you to pay your rent to your landlord through here</p>
                <p>You could go oldschool and pay cash directly.</p>
            </div>
            </div>
        </React.Fragment>
    );
}

export default Home;