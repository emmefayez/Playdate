import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Info() {
	const navigate = useNavigate();

	return (
		<div className="container bg-lightop shadow mt-4">
			<br />
			<div className="container bg-light">
				<h3>Why Playdate?</h3>
				<p>
					Parenthood it's a strange journey. It's easy to stumble in the
					guilt-loop of "not spending enough quality time" with your kids and at
					the same time being too tired to come up with ideas of what to do
					together.
				</p>
				<p>
					On Playdate you can browse to a catalogue of different activities.
				</p>
				<p>
					Each activity has a title, a short description and a suggestion for
					minimum age.
				</p>
				<br />
				<h3>Share your knowledge!</h3>
				<p>
					Sharing is caring: on Playdate caregivers or educators can share their
					knowledge about activities they know.
				</p>
				<p>You need to register to add an activity to the catalogue.</p>
				<button
					className="btn btn-primary mt-4"
					onClick={() => navigate("/register")}
				>
					Register
				</button>{" "}
				<span>
					<button
						className="btn btn-primary mt-4"
						onClick={() => navigate("/login")}
					>
						Log in
					</button>
				</span>
				<br />
				<br />
			</div>
			<br />
		</div>
	);
}

export default Info;
