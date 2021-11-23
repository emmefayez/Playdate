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
		// addy();
	}, [anchor]);

	const { name, age, type, latitude, longitude, address, description } =
		newPlace;

	const handleInputChange = (event) => {
		const { value, name } = event.target;
		setNewPlace((state) => ({ ...state, [name]: value }));
	};

	const addPlace = async () => {
		try {
			const res = await fetch("/places", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPlace),
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

	// try {
	// 	const res = await fetch("/journal_entries", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(joy),
	// 	});
	// 	const data = await res.json();
	// 	setJoy(data);
	// } catch (err) {
	// 	console.log(err);
	// }
	// setJoy({ date: "", moment_of_joy: "" });
	// onDone();

	const addy = async () => {
		setError("");

		if (latitude !== 41.3874 && longitude !== 2.1686) {
			const result = await fetch(
				`http://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
			);
			const splitAdd = await result.json();
			setNewPlace((state) => ({
				...state,
				address: `${splitAdd.results[0].locations[0].street}, ${splitAdd.results[0].locations[0].adminArea5}, ${splitAdd.results[0].locations[0].adminArea1}, ${splitAdd.results[0].locations[0].postalCode}`,
			}));
		}
	};

	const getCoordinates = async () => {
		setError("");

		if (latitude !== 41.3874 && longitude !== 2.1686) {
			const result = await fetch(
				`http://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
			);
			const splitAdd = await result.json();
			setNewPlace((state) => ({
				...state,
				address: `${splitAdd.results[0].locations[0].street}, ${splitAdd.results[0].locations[0].adminArea5}, ${splitAdd.results[0].locations[0].adminArea1}, ${splitAdd.results[0].locations[0].postalCode}`,
			}));
		} else {
			const result = await fetch(
				`http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${address
					.replace(/ /g, "+")
					.replace(/,/g, "")}`
			);
			console.log("result", result);
			const splitAdd = await result.json();
			console.log("split", splitAdd);

			setNewPlace((state) => ({
				...state,
				latitude: +`${splitAdd.results[0].locations[0].latLng.lat}`,
				longitude: +`${splitAdd.results[0].locations[0].latLng.lng}`,
			}));
		}
	};

	const apiKey = "afcv2MJNDXWhstq1z6wuOXpyDpPm9Tqs";

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
						minLength="5"
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
						minLength="5"
					/>
					<button onClick={(e) => addy()}>testing</button>
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
					{/* {newPlace.type === "Other" && (
						<input
							value={type}
							name="type"
							type="text"
							onChange={(e) => handleInputChange(e)}
						/>
					)} */}
				</div>
				<button type="submit" className="btn btn-primary m-2">
					Add to catalogue
				</button>
			</form>
		</div>
	);
}

// http://www.mapquestapi.com/geocoding/v1/address?key=afcv2MJNDXWhstq1z6wuOXpyDpPm9Tqs&location=Carrer+de+l'Hospital+Barcelona+ES+08001
// Carrer de l'Hospital, Barcelona, ES, 08001

// http://www.mapquestapi.com/geocoding/v1/reverse?key={apiKey}&location={newPlace.latitude},{newPlace.longitude}&includeRoadMetadata=true&includeNearestIntersection=true

// http://www.mapquestapi.com/geocoding/v1/reverse?key=afcv2MJNDXWhstq1z6wuOXpyDpPm9Tqs&location=33.768398,-118.185039&includeRoadMetadata=true&includeNearestIntersection=true

// 41.4054° N, 2.1649° E
// 33.768398 -118.185039

// http://api.openweathermap.org/data/2.5/weather?q=london&appid=98bc94da52b3c7fbcaa93d8141b40c96&units=metric
