import React from 'react';
import Navbar from './Navbar';
import Noty from 'noty';
import "../node_modules/noty/lib/themes/sunset.css"; 
import "../node_modules/noty/lib/noty.css"; 

function Login() {

//ofc until now everything is fake

 const fakeLogin = (event) =>{
 event.preventDefault();
  new Noty({
  layout: "center",
  type: "error",
  theme: "sunset",
  text : "Sorry we are having troubles right now...",
  timeout: 4000
}).show();
 }   

    return (
        <div className="container">
            <Navbar />
            <div className="container m-4">
                <h2>Welcome back!</h2>
                <br />
            <h3>Login</h3>
            <form onSubmit={(event) => fakeLogin(event)}>
                <div className="col-6">
            <label>E-mail</label>
            <input type="text" name="email" placeholder="example@gmail.com" className="form-control" />
            <label>Password</label>
            <input type="password" name="password" className="form-control "/>
            <button className="btn btn-primary mt-4">Log in</button>
            <div className="col-6 mt-4">
            <a href="#"> I forgot my password!</a>
            </div>
            </div>
            </form>
            
            </div>

            
        </div>
    )
}

export default Login
