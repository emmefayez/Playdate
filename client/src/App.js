import "./App.css";
import "../node_modules/noty/lib/themes/sunset.css";
import "../node_modules/noty/lib/noty.css";

import Footer from "./components/Footer";

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Info from "./components/Info";
import Navbar from "./components/Navbar";
import Places from "./components/Places";

function App() {
	const pathname = window.location.pathname;

	useEffect(() => {
		color();
	}, [pathname]);

	const color = () => {
		switch (pathname) {
			case "/":
				return "#a3d3df";
			case "/activities":
				return "#a4d5ce";
			case "/places":
				return "#ffd5b6";
			case "/info":
				return "#9eaeb5";
			case "/admin":
				return "#d2c4f3";
			case "/login":
				return "#febdb0";
			case "/register":
				return "#febdb0";
			default:
				return "#a4d5ce";
		}
	};

	// let background = `${color()}`;
	let background = (document.body.style.backgroundColor = color());

	return (
		<div className={background}>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/places/*" element={<Places />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Login />} />
				<Route path="/Activities" element={<Activities />} />
				<Route path="/info" element={<Info />} />
				{/* <Route path="/Places" element={<Places />} /> */}

				<Route path="/profile" element={<Profile />} />
				<Route path="/admin/*" element={<Admin />} />
			</Routes>
			<br />
			<Footer />
		</div>
	);
}

export default App;
