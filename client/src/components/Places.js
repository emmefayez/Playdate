import React, { useState, useEffect } from "react";
import { Map, ZoomControl, Draggable, Marker, Overlay } from "pigeon-maps";
import { Routes, Route, Link } from "react-router-dom";
import PlacesForm from "./PlacesForm";
import Noty from "noty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUmbrellaBeach,
	faLandmark,
	faTree,
	faChild,
	faMapPin,
} from "@fortawesome/free-solid-svg-icons";

// import pin from "../img/pin.png";

import { maptiler } from "pigeon-maps/providers";

// const maptilerProvider = maptiler('MY_API_KEY', 'streets')
// kinda loads slow when you zoom, but it's much prettier than the original from pigeon

export default function Places() {
	const maptilerProvider = maptiler("cPEkrk9lH5auwetpn2eR	", "streets");
	const [anchor, setAnchor] = useState([41.3874, 2.1686]);
	const [hue, setHue] = useState(0);
	const [places, setPlaces] = useState([]);
	const [error, setError] = useState("");
	const [featuredPlace, setFeaturedPlace] = useState();

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
		getPlaces();
	};

	const color = `hsl(${hue % 360}deg 39% 70%)`;

	const icons = (location) => {
		switch (location.type) {
			case "Playground":
				return faChild;
			case "Beach":
				return faUmbrellaBeach;
			case "Museum":
				return faLandmark;
			case "Park":
				return faTree;
			default:
				return faMapPin;
		}
	};

	const handleIconClick = (location) => {
		if (location === featuredPlace) setFeaturedPlace(null);
		else setFeaturedPlace(location);
		console.log("clicked", location.id);
	};

	return (
		<div className="container bg-lightop shadow mt-4 mb-4">
			<br />
			<div className="container bg-light ">
				<div className="row mb-4">
					<div className="col-6 mt-3">
						{/* <br /> */}
						<Map
							provider={maptilerProvider}
							dprs={[1, 2]} // this provider supports HiDPI tiles
							height={600}
							width={600}
							defaultCenter={[41.3874, 2.1686]}
							defaultZoom={14}
						>
							<Draggable
								offset={[60, 87]}
								anchor={anchor}
								onDragEnd={setAnchor}
							>
								<Marker
									width={50}
									anchor={[41.3874, 2.1686]}
									color={color}
									onClick={() => setHue(hue + 20)}
								/>
							</Draggable>
							{places.map((location) => (
								<Overlay
									anchor={[location.latitude, location.longitude]}
									key={location.id}
								>
									<FontAwesomeIcon
										icon={icons(location)}
										size="2x"
										color={
											location.type === "Park"
												? "#00a08f"
												: location.type === "Museum"
												? "#ff9f52"
												: location.type === "Playground"
												? "#efc458"
												: location.type === "Beach"
												? "#19355f"
												: "#f66747"
										}
										onClick={() => handleIconClick(location)}
									/>
								</Overlay>
							))}

							<ZoomControl />
						</Map>
					</div>
					<div className="col-6  mt-3">
						{featuredPlace ? (
							<div>
								<div className="row">
									<div className="col-6">
										<h3> Location Name </h3>
									</div>
									<div className="col-2">
										<h3> Age </h3>
									</div>
									<div className="col-3">
										<h3> Type </h3>
									</div>
									<div className="col-1"></div>
								</div>
								<div className="row">
									<div className="col-6"> {featuredPlace.name}</div>
									<div className="col-2"> {featuredPlace.age}</div>
									<div className="col-3"> {featuredPlace.type}</div>
									<div className="col-1">
										<FontAwesomeIcon
											icon={icons(featuredPlace)}
											size="lg"
											color={
												featuredPlace.type === "Park"
													? "#00a08f"
													: featuredPlace.type === "Museum"
													? "#ff9f52"
													: featuredPlace.type === "Playground"
													? "#efc458"
													: featuredPlace.type === "Beach"
													? "#19355f"
													: "#f66747"
											}
										></FontAwesomeIcon>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<h3> Description </h3>
									</div>
								</div>
								<div className="row">
									<div className="col-12"> {featuredPlace.description}</div>
								</div>
								<div className="row">
									<div className="col-12">
										<h3> Address </h3>
									</div>
								</div>
								<div className="row">
									<div className="col-6">{featuredPlace.address}</div>
									<div className="col-6">
										<a
											href={`https://www.google.com/maps/search/?api=1&query=${featuredPlace.latitude}%2C${featuredPlace.longitude}`}
											target="_blank"
										>
											Open in Google maps
										</a>
									</div>
								</div>
							</div>
						) : (
							<h1>Click on an icon to view it's information</h1>
						)}
					</div>
				</div>

				<Link to={`/places/add`}>
					<button className="btn btn-primary mb-4">Add place</button>
				</Link>
			</div>
			<br />
			<div className="container bg-light mt-4">
				<Routes>
					<Route
						path="add"
						element={<PlacesForm anchor={anchor} onDone={onDone} />}
					/>
				</Routes>
			</div>
		</div>
	);
}

// 41.383117589461904, 2.156927026367157
// https://www.google.com/maps/search/?api=1&query=41.383117589461904%2C2.156927026367157
