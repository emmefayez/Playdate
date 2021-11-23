import React, { useState } from "react";
import { useNavigate } from "react-router";

import Noty from "noty";
import axios from "axios";

function Login() {
	const [credentials, setCredentials] = useState({
		email: "test",
		password: "test",
	});
	const navigate = useNavigate();

	const { email, password } = credentials;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const success = (event) => {
		event.preventDefault();
		new Noty({
			layout: "topRight",
			type: "success",
			theme: "sunset",
			text: "Successful login",
			timeout: 4000,
		}).show();
	};

	const wrongPassword = (event) => {
		event.preventDefault();
		new Noty({
			layout: "center",
			type: "error",
			theme: "sunset",
			text: "Incorrect password",
			timeout: 4000,
		}).show();
	};

	const wrongEmail = (event) => {
		event.preventDefault();
		new Noty({
			layout: "center",
			type: "error",
			theme: "sunset",
			text: "There is no user with this email",
			timeout: 4000,
		}).show();
	};

	const somethingElseWrong = (event) => {
		event.preventDefault();
		new Noty({
			layout: "center",
			type: "error",
			theme: "sunset",
			text: "Something went wrong...",
			timeout: 4000,
		}).show();
	};

	const login = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios("/users/login", {
				method: "POST",
				data: credentials,
			});
			switch (data.message) {
				case "User does not exist":
					wrongEmail(e);
					break;
				case "Incorrect password":
					wrongPassword(e);
					break;
				case "Login successful, here is your token":
					success(e);
					break;
				default:
					somethingElseWrong(e);
			}

			localStorage.setItem("token", data.token);
			navigate("/profile");
		} catch (error) {}
	};

	const logout = () => {
		localStorage.removeItem("token");
		new Noty({
			layout: "topRight",
			type: "success",
			theme: "sunset",
			text: "Successful logout",
			timeout: 4000,
		}).show();
	};

	return (
		<div className="container bg-lightop shadow mt-4">
			<br />
			<div className="container bg-light">
				<h2>Welcome back!</h2>
				<br />
				<h3>Login</h3>
				<form onSubmit={login}>
					<div className="col-6">
						<label>E-mail</label>
						<input
							value={email}
							onChange={handleChange}
							type="text"
							name="email"
							placeholder="example@gmail.com"
							className="form-control"
						/>
						<label>Password</label>
						<input
							value={password}
							onChange={handleChange}
							type="password"
							name="password"
							className="form-control "
						/>
						<button className="btn btn-primary mt-4">Log in</button>

						{/* <div className="col-6 mt-4">
							<a href="#"> I forgot my password!</a>
						</div> */}
					</div>
				</form>
				<button
					className="btn btn-outline-dark ml-2 mt-4 mb-4"
					onClick={logout}
				>
					Log out
				</button>
			</div>
			<br />
		</div>
	);
}

export default Login;
