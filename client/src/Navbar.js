import React from 'react';
import { Link } from "react-router-dom"; 

function Navbar() {
    return (
<div className="position-relative">
  <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
    <div className="container mt-4">
    <h1>Playdate!</h1>
     <Link to="/">Home</Link>
     <div>
     <span className="m-3"><Link to="/Admin">Admin</Link></span>
     <span className="m-3"><Link to="/users">User</Link></span>
     </div>
      </div>
     </nav>
</div>
    )
}

export default Navbar
