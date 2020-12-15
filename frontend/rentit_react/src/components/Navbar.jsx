import React from "react";


function Navbar() {
    let x = localStorage.getItem ("token")
    let y = {menu: x ? "Settings" : "Login", link: x ? "/settings" : "/login"}
    let z = {menu: x ? "Logout" : "Register", link: x ? "/logout" : "/register"}
    return (
        <div className="w3-bar w3-black">
            <a className="w3-bar-item w3-button" href="/">
                Rentit
            </a>
            <div style={{ float: "right" }}>
                <a className="w3-bar-item w3-button" href={y.menu}>
                    {y .menu}
                </a>
                <a className="w3-bar-item w3-button" href= {z.menu}>
                    {z.menu}
                </a>
            </div>
        </div>
    );
}

export default Navbar;