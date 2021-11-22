import React from "react";

function Navbar() {
	return (
		// <div className="position-relative" id="navbar">
		<nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href={`/`}>
					<h1>Playdate!</h1>
				</a>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<a className="nav-link" href={`/`}>
							Home
						</a>
						<a className="nav-link" href={`/activities`}>
							Activities
						</a>
						<a className="nav-link" href={`/places`}>
							Places
						</a>
						<a className="nav-link" href={`/info`}>
							About
						</a>
						<a className="nav-link" href={`/admin`}>
							Admin
						</a>
						<a className="nav-link" href={`/register`}>
							Sign Up
						</a>
						<a className="nav-link" href={`/login`}>
							Log in
						</a>
						<a className="nav-link" href={`/profile`}>
							My profile
						</a>
					</div>
				</div>
			</div>
		</nav>
		// </div>
	);
}

export default Navbar;
