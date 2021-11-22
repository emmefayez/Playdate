import React, { useState } from "react";
import avatar_1 from "../img/avatar_1.png";
import avatar_2 from "../img/avatar_2.png";
import avatar_3 from "../img/avatar_3.png";
import Noty from "noty";

function Registration() {
	const [user, setUser] = useState({
		avatar: "",
		name: "",
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const handleInputChange = (event) => {
		event.preventDefault();
		const { value, name } = event.target;
		setUser((state) => ({ ...state, [name]: value }));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		register();
	};

	const register = async () => {
		try {
			const response = await fetch("/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const newUser = await response.json();
			//   props.onDoneCb(newUser);
			setUser(newUser);

			//Where is this data going
		} catch (error) {
			setError(error.message);
		}
		new Noty({
			layout: "center",
			type: "alert",
			theme: "sunset",
			text: "Great! Welcome to Playdate!",
			timeout: 4000,
		}).show();
	};
	const { avatar_group, name, email, password } = user;

	return (
		<div className="container bg-lightop shadow mt-4">
			<div className="container mt-4">
				<h1>Registration</h1>
				<h3>Choose your avatar</h3>
				<form id="registrationform" onSubmit={handleSubmit}>
					<div className="row mt-4">
						<div id="1" className="card-body">
							<label htmlFor="flor">
								<img
									src={avatar_1}
									alt="avatar_1"
									className="img-fluid"
									id="one"
								/>
							</label>
							<input
								id="puzzle"
								type="radio"
								name="avatar_group"
								value="1"
								checked={avatar_group === "1" ? true : false}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>

						<div id="2" className="card-body">
							<label htmlFor="hoja">
								<img
									src={avatar_2}
									alt="avatar_2"
									className="img-fluid"
									id="two"
								/>
							</label>
							<input
								id="octupus"
								type="radio"
								name="avatar_group"
								value="2"
								checked={avatar_group === "2" ? true : false}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>

						<div id="3" className="card-body">
							<label htmlFor="arbol">
								<img
									src={avatar_3}
									alt="avatar_3"
									className="img-fluid"
									id="three"
								/>
							</label>
							<input
								id="sandbox"
								type="radio"
								name="avatar_group"
								value="3"
								checked={avatar_group === "3" ? true : false}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
					</div>

					<div className="col-6 mt-4">
						<label className="form-label mt-4">Username</label>
						<input
							className="form-control"
							type="text"
							name="name"
							value={name}
							required
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
					<div className="col-6 mt-4">
						<label className="form-label mt-4">Email</label>
						<input
							className="form-control"
							type="email"
							name="email"
							value={email}
							required
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
					<div className="col-6 mt-4">
						<label className="form-label mt-4">Password</label>
						<input
							className="form-control"
							type="password"
							name="password"
							value={password}
							required
							onChange={(e) => handleInputChange(e)}
						/>
					</div>

					<div className="col-6 mt-4">
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckDefault"
								onChange={(e) => handleInputChange(e)}
							/>
							<label className="form-check-label" htmlFor="flexCheckDefault">
								I agree with Terms of Use
							</label>
						</div>
					</div>
					<div className="col-6 mt-4">
						<button type="submit" className="btn btn-primary">
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Registration;
