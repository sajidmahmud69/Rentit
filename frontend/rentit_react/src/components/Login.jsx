import React, { Component } from "react";
import axios from "axios";
import Alert from "./Alert";
import {check, login} from "../login";

class Login extends Component {

    constructor(){
        super()
        this.state={
            err:"",
            login: false
        }
    }
    componentDidMount() {
        check().then(r => {if (r) {
            window.location = "/"
        }})
    }

    login = (e) => {
        e.preventDefault();
        login(document.getElementById("username").value,
                document.getElementById("password").value)
            .then((r) => {
                if (r=== true) {
                    window.location = "/"
                } else {
                    this.setState({ err: r });
                }
            })
    };


    render() {
        return (
            <div className="w3-card-4" style={{ margin: "2rem" }}>
                <div className="w3-container w3-blue w3-center w3-xlarge">
                    LOGIN
                </div>
                <div className="w3-container">
                    {this.state.err.length >0 && (
                        <Alert
                            message={`Check your form and try again! (${this.state.err})`}
                            />
                    )}
                    <form onSubmit={this.login}>
                        <p>
                            <label htmlFor="username">username</label>
                            <input
                                type="text"
                                class="w3-input w3-border"
                                id="username"
                            />
                        </p>
                        <p>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                class="w3-input w3-border"
                                id="password"
                            />
                        </p>
                        <p>
                            <button type="submit" class="w3-button w3-blue">
                                Login
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;