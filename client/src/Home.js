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
            <div>
            <section className="col-6">
                <h3>Run out of ideas for entratain your kid?</h3>
                <p> No panic!</p> <p> We have a list of suggestions for <strong>you</strong>!</p>
            </section>
            <section className="card">
                <div className="card-body">
                <h2>Activities catalogue</h2>
                <p>Browse through the catalogue to find the perfect game, you can filter by keyword (ex. sand, ball, draw) or by age.</p>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <Link to="/Activities">Bring me to the activities catalogue!</Link></button>
                <img src={img1} alt="activities_img" className="img-fluid"/>
                </div>
            </section>
              <section className="card">
                  <div className="card-body">
                <h2>Places catalogue</h2>
                <p>Looking for something to do visit with kids in Barcelona?</p>
                <Link to="/Admin">Bring me to the places catoluge</Link>
                <img src={img2} alt="activities_img" className="img-fluid"/>
            </div>
            </section>
            
</div>
        </div>
        </div>
    )
}
