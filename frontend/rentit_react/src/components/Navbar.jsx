import React from "react";


function Navbar() {
    let x = localStorage.getItem ("token")
    // if there is a token render settings else render login and change the settings to "/settings" and login to "/login"
    let y = {menu: x ? "Settings" : "Login", link: x ? "/settings" : "/login"}
    // if there is a token render logout else render register and link the corresponding routes
    let z = {menu: x ? "Logout" : "Register", link: x ? "/logout" : "/register"}
    return (
        <div className="w3-bar w3-black">
            <a className="w3-bar-item w3-button" href="/">
                Rentit
            </a>
            <div style={{ float: "right" }}>
                <a className="w3-bar-item w3-button" href={y.link}>
                    {y .menu}
                </a>
                <a className="w3-bar-item w3-button" href= {z.link}>
                    {z.menu}
                </a>
            </div>
        </div>
    );
}

export default Navbar;