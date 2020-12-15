import React from 'react'

function Appointment() {

    return (
        <div className = "w3-modal w3-animate-opacity" id = "appointment">
            <div className = "w3-modal-content w3-card">
                <header className = "w3-container w3-blue">
                    <span className = "w3-button w3-display-topright w3-hover-none w3-hover-text-white" onClick = {() => {
                        document.getElementById("appointment").style.display = "none"
                    }}>X</span>
                    <h2>Make an appointment</h2>
                </header>
                <form className = "w3-container" >
                    <div className = "w3-section">
                        <label htmlFor = "name">Name</label>
                        <br></br>
                        <input type = "text" placeholder="Eg: Donato Cruz"

                            id = "name" />
                        <br></br>
                        <br></br>
                        <label htmlFor ="phone">Phone Number</label>
                        <br></br>
                        <input type="tel" id="phone" name="phone"
                                placeholder="Eg: 111-111-1111"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                required />
                        <br></br>
                        <br></br>
                        <label htmlFor = "datetime">Date & Time</label>
                        <br></br>
                        <input type="datetime-local" id="datetime"
                                name="datetime"
                                min="2020-12-15T18:30" max="2021-06-14T00:00" />

                        <br></br>
                        <br></br>
                        <button type = "submit" className = "w3-button w3-blue">Submit</button>

            </div>
                </form>
            </div>
        </div>
    )
}

export default Appointment;