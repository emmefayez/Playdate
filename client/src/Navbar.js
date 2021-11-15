import React from 'react';
import { Link } from "react-router-dom"; 

function Navbar() {
    return (
<div className="position-relative" id="navbar">
  <nav className="navbar navbar-expand-lg"> 
    <div className="container mt-4">
    <h1>Playdate!</h1>
     <Link to="/">Home</Link>
     <span className="m-3"><Link to="/Activities">Activities</Link></span>
      <span className="m-3"><Link to="/Places">Places</Link></span>
     <div>
     <span className="m-3"><Link to="/Admin">Admin</Link></span>
     <span className="m-3"><Link to="/register">Sign in</Link></span>
     <span className="m-3"><Link to="/login">Log in</Link></span>
     <span className="m-3"><Link to="/users">My profile</Link></span>
     </div>
      </div>
     </nav>
</div>
    )
}

export default Navbar
