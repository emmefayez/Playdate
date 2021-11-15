import React from 'react'
import { Link } from "react-router-dom"; 
import Navbar from './Navbar'

function Info() {
    return (
        <div className="info_section mt-4">
            <Navbar />
            <section className="container mt-4">
            <h3>Why Playdate?</h3>
            <br />
            <div className="about">
            <p>Parenthood it's a strange journey. It's easy to stumble 
            in the guilt-loop of "not spending enough quality time" with your kids and at the same time being too tired to come up with ideas of what to do together.</p>
            <p>On Playdate you can browse to a catalogue of different activities.</p>
            <p>Each activity has a title, a short description and a suggestion for minimum age.</p>
            <br />
            <h3>Share your knowledge!</h3> 
            <p>Sharing is caring: on Playdate caregivers or educators can share their knowledge about activities they know.</p> 
            <p>You need to register to add an activity to the catalogue.</p>
            <button className="btn btn-outline-warning mt-4"><span className="m-3"><Link to="/register">Sign in</Link></span></button>


 
            </div>
            </section>
        </div>
    )
}

export default Info
