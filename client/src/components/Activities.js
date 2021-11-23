import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import Noty from "noty";
import axios from "axios";

function Activities() {
	const [activities, setActivities] = useState([]);
	const [error, setError] = useState("");
	const [users, setUsers] = useState([]);
	const [favActivities, setFavActivities] = useState([]);

	//this is the parent of addForm and searchForm

	const user = users[0];

	useEffect(() => {
		getActivities();
		getUser();
		getFavActivities();
	}, []);

	//to display all the activities
	const getActivities = async (query) => {
		let url = "/activities";

		if (query) {
			url += `?query=${query}`;
		}
		try {
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

	const getFavActivities = async () => {
		try {
			const data = await axios.get("/favorities", {
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
				},
			});

			setFavActivities(data.data);
		} catch (err) {
			setError(err.message);
		}
	};

	//to display the profile of the user
	const getUser = async () => {
		try {
			const response = await axios.get(`/users/profile`, {
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			console.log(response);
			setUsers(response.data);
		} catch (err) {
			setError(err.message);
		}
	};

	const addToFav = async (activity) => {
		console.log("clicked", activity.id, user.id);
		if (
			favActivities.filter(
				(favActivity) => favActivity.activity_id === activity.id
			).length === 0
		) {
			try {
				await axios.post(
					"/favorities",
					{ activity_id: activity.id },
					{
						headers: {
							authorization: "Bearer " + localStorage.getItem("token"),
						},
					}
				);
				new Noty({
					layout: "topRight",
					type: "success",
					theme: "sunset",
					text: ` ${activity.name} added to favorites!`,
					timeout: 2000,
				}).show();
			} catch (error) {
				setError(error.message);
			}
			getFavActivities();
		}
	};
	const removeFromFav = async (activity) => {
		console.log(activity.id, activity.activity_id);
		try {
			const result = await axios.delete("/favorities", {
				data: { activity_id: activity.id },
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			console.log("try");

			setFavActivities(result.data);
			new Noty({
				layout: "center",
				type: "error",
				theme: "sunset",
				text: ` ${activity.name} deleted from favorites!`,
				timeout: 2000,
			}).show();
		} catch (err) {
			console.log("err");
			setError(err.message);
		}
	};

	return (
		<div className="container bg-lightop shadow mt-4">
			<br />
			<div className=" bg-light ">
				<SearchForm submitCb={(query) => getActivities(query)} />
			</div>

			<div className="container">
				<div id="activities_catalogue">
					<h2 className="blue-d">Activities</h2>
					{activities.map((activity) => (
						<div key={activity.id} className="card-body">
							<div>
								<li className="list-group-item">
									<div className="card-title">
										<h4 className="green-ddd">{activity.name}</h4>
									</div>
									<div className="card-text">
										<span className="mb-4">
											<h5 className="green-dd">
												From children of: {activity.age} y.o
											</h5>
										</span>
										<h5 className="green-dd">Description:</h5>{" "}
										<p className="green-d">{activity.description}</p>
									</div>

									{users.length > 0 &&
										(favActivities.filter(
											(favActivity) => favActivity.activity_id === activity.id
										).length === 1 ? (
											<button
												className="btn btn-danger m-2"
												onClick={() => removeFromFav(activity)}
											>
												Remove from favorities
											</button>
										) : (
											<button
												className="btn btn-primary m-2"
												onClick={() => addToFav(activity)}
											>
												Add to favorities
											</button>
										))}
								</li>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Activities;
