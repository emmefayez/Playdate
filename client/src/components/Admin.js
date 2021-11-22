import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import AddForm from "./AddForm";
import "../App.css";
import SearchForm from "./SearchForm";
import Noty from "noty";

function Admin() {
	const [activities, setActivities] = useState([]);
	const [error, setError] = useState("");
	const [deleteConfirmMsg, setDeleteConfirmMsg] = useState("");

	useEffect(() => {
		getActivities();
	}, []);

	//render list of activities - I didn't export the activity catalogue as a component because here only the delete button will show
	const getActivities = async (query) => {
		let url = "/activities";
		if (query) {
			url += `?query=${query}`;
		}
		try {
			console.log("final url: ", url);
			const response = await fetch(url);
			const data = await response.json();

			setActivities(data);
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

	//DELETE
	const deleteActivity = async (id) => {
		try {
			const response = await fetch(`/activities/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			getActivities();
		} catch (err) {
			setDeleteConfirmMsg(err);
		}
		new Noty({
			layout: "center",
			type: "error",
			theme: "sunset",
			text: "Activity deleted!",
			timeout: 2000,
		}).show();
	};

	return (
		<div className="container bg-lightop shadow mt-4">
			<Link to={`/admin/add`}>
				<button className="btn btn-primary mt-4 mb-4">Add new activity</button>
			</Link>

			<Routes>
				<Route
					path="add"
					element={
						<AddForm onDone={(newActivity) => setActivities(newActivity)} />
					}
				/>
			</Routes>
			<hr />

			{/* <div className="container mt-4">
				<div className="row mb-4">
					<div className="col">
						<AddForm onDone={(newActivity) => setActivities(newActivity)} />
					</div>
				</div>
			</div> */}

			<SearchForm submitCb={(query) => getActivities(query)} />

			{/* {CATALOGUE} */}
			<div className="container">
				<h3>{deleteConfirmMsg}</h3>
				<div id="activities_catalogue">
					<h2>Activities</h2>
					{activities.map((activity) => (
						<div key={activity.id} className="card-body">
							<div>
								<li className="list-group-item">
									<div className="card-title">
										<h5> Title: {activity.name} </h5>
									</div>
									<div className="card-text">
										<span className="mb-4">
											<h5>From children of: {activity.age} y.o</h5>
										</span>
										<h5>Description:</h5> <p>{activity.description}</p>
									</div>
									<button
										className="btn btn-danger m-2"
										onClick={() => deleteActivity(activity.id)}
									>
										Delete activity
									</button>
								</li>
							</div>
						</div>
					))}
				</div>
				<div id="errorMsg">{error}</div>
			</div>
		</div>
	);
}

export default Admin;
