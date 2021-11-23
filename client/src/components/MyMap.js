import React, { useState, useEffect } from "react";
import { Map, ZoomControl, Draggable, Marker } from "pigeon-maps";
import { Routes, Route, Link } from "react-router-dom";
import PlacesForm from "./PlacesForm";
import Noty from "noty";

// import pin from "../img/pin.png";

import { maptiler } from "pigeon-maps/providers";

// const maptilerProvider = maptiler('MY_API_KEY', 'streets')
// kinda loads slow when you zoom, but it's much prettier than the original from pigeon

export default function MyMap() {
	const maptilerProvider = maptiler("cPEkrk9lH5auwetpn2eR	", "streets");
	const [anchor, setAnchor] = useState([41.3874, 2.1686]);
	const [hue, setHue] = useState(0);
	const [places, setPlaces] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		getPlaces();
	}, []);

	//to display all the activities
	const getPlaces = async (query) => {
		let url = "/places";
		try {
			const response = await fetch(url);
			const data = await response.json();

			setPlaces(data);
			if (!data.length) {
				new Noty({
					layout: "center",
					type: "error",
					theme: "sunset",
					text: "No activity found",
					timeout: 2000,
				}).show();
			}
		} catch (err) {
			setError(err.message);
		}
	};

	const onDone = () => {
		console.log("ondone");
		getPlaces();
	};

	const color = `hsl(${hue % 360}deg 39% 70%)`;

	const markerColor = (places) => {
		switch (places.type) {
			case "Playground":
				return `hsl(${hue % 360}deg 39% 70%)`;

			case "Beach":
				return "Good ways to distract myself:";

			case "Museum":
				return "Things that help when I feel this way:";

			case "Park":
				return "Ways to keep my space safe:";

			default:
				return "Add distractions, ways to keep your space safe, triggers, and things that help when you don't feel well";
		}
	};

	const googleMaps = `https://www.google.com/maps/search/?api=1&query=${anchor[0]}%2C${anchor[1]}`;

	return (
		<div className="container bg-lightop shadow mt-4">
			<Map
				provider={maptilerProvider}
				// dprs={[1, 2]} // this provider supports HiDPI tiles
				height={500}
				width={500}
				defaultCenter={[41.3874, 2.1686]}
				defaultZoom={14}
			>
				<Draggable offset={[60, 87]} anchor={anchor} onDragEnd={setAnchor}>
					<Marker
						width={50}
						anchor={[41.3874, 2.1686]}
						color={`hsl(${hue % 360}deg 80% 70%)`}
						onClick={() => setHue(hue + 20)}
					/>
				</Draggable>
				{places.map((location) => (
					<Marker
						width={50}
						anchor={[location.latitude, location.longitude]}
						color={color}
						onClick={() => setHue(hue + 20)}
					/>
				))}

				<ZoomControl />
			</Map>
			Current Position: {anchor[0]}, {anchor[1]}
			<br />
			<a href={googleMaps} target="_blank">
				Open in Google maps
			</a>
			<br />
			<Link to={`/mymap/add`}>
				<button className="btn btn-primary">Add place</button>
			</Link>
			<br />
			<br />
			<Routes>
				<Route
					path="add"
					element={<PlacesForm anchor={anchor} onDone={onDone} />}
				/>
			</Routes>
		</div>
	);
}

// 41.383117589461904, 2.156927026367157
// https://www.google.com/maps/search/?api=1&query=41.383117589461904%2C2.156927026367157
