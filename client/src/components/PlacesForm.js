import React, { useEffect, useState } from "react";

export default function PlacesForm({ anchor }) {
	const [newPlace, setNewPlace] = useState({
		name: "test",
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

	// const addy = () => {
	// 	setError("");
	// 	console.log(
	// 		`http://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
	// 	);
	// 	if (latitude !== 41.3874 && longitude !== 2.1686) {
	// 		console.log("after", longitude, latitude);
	// 		fetch(
	// 			`http://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true
	// 			`
	// 		)
	// 			.then((coordinates) => {
	// 				coordinates.json();
	// 				// console.log(coordinates);
	// 			})
	// 			.then((coordinates2) => {
	// 				console.log(` results ${coordinates2}`);
	// 				setNewPlace((state) => ({
	// 					...state,
	// 					address: `${coordinates2.results.locations.street}`,
	// 					// address: `${coordinates.results.locations.street}, ${coordinates.results.locations.adminArea5}, ${coordinates.results.locations.adminArea1}, ${coordinates.results.locations.postalCode}`,
	// 				}));
	// 			})
	// 			.catch((error) => {
	// 				setError("There was an error!", error);
	// 			});
	// 	}
	// };

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

	const apiKey = "afcv2MJNDXWhstq1z6wuOXpyDpPm9Tqs";

	return (
		<div className="container">
			<form>
				{latitude} {longitude}
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

// http://www.mapquestapi.com/geocoding/v1/address?key=afcv2MJNDXWhstq1z6wuOXpyDpPm9Tqs&location=Carrer+d'en+Grassot+101+Barcelona+Spain+08025

// http://www.mapquestapi.com/geocoding/v1/reverse?key={apiKey}&location={newPlace.latitude},{newPlace.longitude}&includeRoadMetadata=true&includeNearestIntersection=true

// 41.4054° N, 2.1649° E

// http://api.openweathermap.org/data/2.5/weather?q=london&appid=98bc94da52b3c7fbcaa93d8141b40c96&units=metric
