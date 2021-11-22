import React, { useState } from "react";
import { Map, ZoomControl, Draggable, Marker } from "pigeon-maps";
import { Routes, Route, Link } from "react-router-dom";
import PlacesForm from "./PlacesForm";

// import pin from "../img/pin.png";

import { maptiler } from "pigeon-maps/providers";

// const maptilerProvider = maptiler('MY_API_KEY', 'streets')
// kinda loads slow when you zoom, but it's much prettier than the original from pigeon

export default function MyMap() {
	const maptilerProvider = maptiler("cPEkrk9lH5auwetpn2eR	", "streets");
	const [anchor, setAnchor] = useState([41.3874, 2.1686]);
	const [hue, setHue] = useState(0);
	const [locations, setLocations] = useState([
		{ long: 41.3874, lat: 2.1686 },
		{ long: 41.3674, lat: 2.1686 },
		{ long: 41.3774, lat: 2.1786 },
	]);
	const color = `hsl(${hue % 360}deg 39% 70%)`;

	const googleMaps = `https://www.google.com/maps/search/?api=1&query=${anchor[0]}%2C${anchor[1]}`;

	return (
		<div className="container mt-4 bg-light">
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
						color={color}
						onClick={() => setHue(hue + 20)}
					/>
				</Draggable>
				{locations.map((location) => (
					<Marker
						width={50}
						anchor={[location.long, location.lat]}
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
				<Route path="add" element={<PlacesForm anchor={anchor} />} />
			</Routes>
		</div>
	);
}

// 41.383117589461904, 2.156927026367157
// https://www.google.com/maps/search/?api=1&query=41.383117589461904%2C2.156927026367157
