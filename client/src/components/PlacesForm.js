import React, { useEffect, useState } from "react";
import Noty from "noty";

export default function PlacesForm({ anchor, onDone }) {
	const [newPlace, setNewPlace] = useState({
		name: "",
		age: 1,
		type: "",
		description: "",
		latitude: "",
		longitude: "",
		address: "",
	});

	const [error, setError] = useState("");

	useEffect(() => {
		setNewPlace({ ...newPlace, latitude: anchor[0], longitude: anchor[1] });
	}, [anchor]);

	const apiKey = "afcv2MJNDXWhstq1z6wuOXpyDpPm9Tqs";

	const { name, age, type, latitude, longitude, address, description } =
		newPlace;

	const handleInputChange = (event) => {
		const { value, name } = event.target;
		setNewPlace((state) => ({ ...state, [name]: value }));
		if (name === "address")
			setNewPlace((state) => ({ ...state, latitude: "", longitude: "" }));
	};

	let lat, lng;

	const addPlace = async () => {
		await getCoordinates();
		try {
			const res = await fetch("/places", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newPlace,
					latitude: newPlace.latitude || lat,
					longitude: newPlace.longitude || lng,
				}),
			});
			const data = await res.json();
			setNewPlace(data);
		} catch (error) {
			setError(error.message);
		}
		new Noty({
			layout: "topRight",
			type: "success",
			theme: "sunset",
			text: "Location added!",
			timeout: 2000,
		}).show();

		setNewPlace({
			name: "",
			age: 1,
			type: "",
			description: "",
			latitude: "",
			longitude: "",
			address: "",
		});
		onDone();
	};

	const getAddress = async () => {
		setError("");

		const result = await fetch(
			`http://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
		);
		const splitAdd = await result.json();
		setNewPlace((state) => ({
			...state,
			address: `${splitAdd.results[0].locations[0].street}, ${splitAdd.results[0].locations[0].adminArea5}, ${splitAdd.results[0].locations[0].adminArea1}, ${splitAdd.results[0].locations[0].postalCode}`,
		}));
	};

	const getCoordinates = async () => {
		setError("");

		if (latitude === "" && longitude === "") {
			const result = await fetch(
				`http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${address
					.replace(/ /g, "+")
					.replace(/,/g, "")}`
			);
			const splitAdd = await result.json();

			lat = +splitAdd.results[0].locations[0].latLng.lat;
			lng = +splitAdd.results[0].locations[0].latLng.lng;
		} else {
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addPlace();
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<h2>Add new place</h2>
					<p>Don't leave any field empty </p>
					<label>
						<h5>Name</h5>
					</label>
					<input
						className="m-4"
						value={name}
						name="name"
						type="text"
						onChange={(e) => handleInputChange(e)}
						required
					/>
				</div>
				<div className="mb-4">
					<label>
						<h5>Address</h5>
					</label>
					<input
						className="m-4"
						value={address}
						name="address"
						type="text"
						onChange={(e) => handleInputChange(e)}
					/>
					<button className="btn btn-primary" onClick={(e) => getAddress()}>
						Get Address from Pin
					</button>
				</div>
				<textarea
					value={description}
					name="description"
					required
					onChange={(e) => handleInputChange(e)}
				/>
				<div className="mb-4">
					<label>
						<h5>Suitable from children up to:</h5>
					</label>
					<input
						className="m-4"
						value={+age}
						type="number"
						name="age"
						min="1"
						max="10"
						required
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="mb-4">
					<select
						className="btn btn-dark dropdown-toggle"
						name="type"
						onChange={handleInputChange}
						value={type}
						required
					>
						<option disabled selected value="">
							Choose type of location
						</option>
						<option value="Park">Park</option>
						<option value="Playground">Playground</option>
						<option value="Beach">Beach</option>
						<option value="Museum">Museum</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<button type="submit" className="btn btn-primary m-2">
					Add to catalogue
				</button>
			</form>
		</div>
	);
}
