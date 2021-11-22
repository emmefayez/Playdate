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
import Places from "./components/Places";
import Info from "./components/Info";
import Navbar from "./components/Navbar";
import MyMap from "./components/MyMap";

function App() {
	const pathname = window.location.pathname;

	useEffect(() => {
		color();
	}, [pathname]);

	const color = () => {
		switch (pathname) {
			case "/":
				return "#f3dd83";
			case "/activities":
				return "#c1cd97";
			default:
				return "#c8b4ba";
		}
	};

	// let background = `${color()}`;
	let background = (document.body.style.backgroundColor = color());

	return (
		<div className={background}>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mymap/*" element={<MyMap />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Login />} />
				<Route path="/Activities" element={<Activities />} />
				<Route path="/info" element={<Info />} />
				<Route path="/Places" element={<Places />} />

				<Route path="/profile" element={<Profile />} />
				<Route path="/admin/*" element={<Admin />} />
			</Routes>
			<br />
			<Footer />
		</div>
	);
}

export default App;
