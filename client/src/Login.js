import React from 'react';
import Navbar from './Navbar';

function Login() {
    return (
        <div className="container">
            <Navbar />
            <div className="container m-4">
                <h2>Welcome back!</h2>
                <br />
            <h3>Login</h3>
            <form>
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
