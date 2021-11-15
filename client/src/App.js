import React from 'react'
import {Routes, Route } from "react-router-dom";
import Home from './Home';
import Activities from './Activities';
import User from './User';
import Registration from './Registration';
import Admin from './Admin';
import Places from './Places';

function App() {
    return (
        <div>
            <Routes>
    <Route path="/" element={<Home />}/> 
    <Route path="/register" element={<Registration />}/> 
    <Route path="/Activities" element={<Activities />}/> 
    <Route path="/Places" element={<Places />}/> 
    <Route path="users" element={<User />}/>      
    <Route path="admin" element={<Admin />}/> 
    </Routes>
        </div>
    )
}

export default App
