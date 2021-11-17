import "./App.css";
import "../node_modules/noty/lib/themes/sunset.css";
import "../node_modules/noty/lib/noty.css";
import Footer from "./components/Footer";

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import User from "./components/User";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Places from "./components/Places";
import Info from "./components/Info";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Login />} />
				<Route path="/Activities" element={<Activities />} />
				<Route path="/info" element={<Info />} />
				<Route path="/Places" element={<Places />} />
				<Route path="users" element={<User />} />
				<Route path="/admin/*" element={<Admin />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
