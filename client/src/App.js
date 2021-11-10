import React from 'react'
import {Routes, Route } from "react-router-dom";
import Home from './Home';
import User from './User';
import Admin from './Admin';

function App() {
    return (
        <div>
            <Routes>
    <Route path="/" element={<Home />}/> 
    <Route path="users" element={<User />}/>      
    <Route path="admin" element={<Admin />}/> 
    </Routes>
        </div>
    )
}

export default App
