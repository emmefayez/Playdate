import React from 'react';
import { Link } from "react-router-dom"; 
import Navbar from './Navbar';
import img1 from './img1.png';
import img2 from './img2.png';


export default function Home() {
    return (
        <div>
            <Navbar />
        <div className="container mt-4">
            
            <section className="col-6">
                <h3>Run out of ideas to entratain your kid/s?</h3>
                <p> No need to panic!</p> <p> We have a list of suggestions for <strong>you</strong>!</p>
            </section>

            <div className="row mt-4">
            <div className="col-6">
            <section className="card">
                <div className="card-body">
                <h2>Activities catalogue</h2>
                <p>Browse through the catalogue to find the perfect game and filter using a keyword.</p>
                
                <span>Take a look </span>
                   <Link to="/Activities">here</Link>
                <img src={img1} alt="activities_img" className="img-fluid"/>
                </div>
            </section>
            </div>
            <div className="col-6">
              <section className="card">
                  <div className="card-body">
                <h2>Places catalogue</h2>
                <p>Looking for something to visit with kids in Barcelona?Here a list of playgrounds, kids clubs and parks!</p>
                <span>Take a look </span>
                <Link to="/Places">here</Link>
                <img src={img2} alt="activities_img" className="img-fluid"/>
                <br/>
                
            </div>
            </section>
            </div>
            
           </div>

        </div>
        </div>
    )
}
