import React from 'react'
import {Routes, Route } from "react-router-dom";
import Home from './Home';
import Activities from './Activities';
import User from './User';
import Admin from './Admin';

function App() {
    return (
        <div>
            <Routes>
    <Route path="/" element={<Home />}/> 
    <Route path="/Activities" element={<Activities />}/> 
    <Route path="users" element={<User />}/>      
    <Route path="admin" element={<Admin />}/> 
    </Routes>
        </div>
    )
}

export default App
