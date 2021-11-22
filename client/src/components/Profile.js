import React, { useState, useEffect } from "react";
import AddForm from "./AddForm";
import avatar_1 from "../img/avatar_1.png";
import axios from "axios";

function Profile() {
	//don't delete this because you are sending the activity to be displayed in the "Activities" component
	const [activities, setActivities] = useState([]);
	const [favActivities, setFavActivities] = useState([]);
	const [error, setError] = useState("");
	//this will probably not being necessary with auth
	const [users, setUsers] = useState([]);

	//fetch of just the fav activities
	//using the props id
	useEffect(() => {
		getUser();
		getFavActivities();
	}, []);

	//to display the profile of the user
	const getUser = async () => {
		try {
			const response = await axios.get(`/users/profile`, {
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			setUsers(response.data);
		} catch (err) {
			setError(err);
		}
	};

	//THIS will be really work once auth will be incorporeted in the project, I inserted a fav activity manually rn
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

	const removeFromFav = async (activity) => {
		try {
			const result = await axios.delete("/favorities", {
				data: { activity_id: activity.activity_id },
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			console.log("try");

			setFavActivities(result.data);
		} catch (err) {
			console.log("err");
			setError(err.message);
		}
	};

	// const addToFav = async (activity) => {
	// 	console.log("clicked", activity.id, user.id);
	// 	try {
	// 		await axios.post(
	// 			"/favorities",
	// 			{ activity_id: activity.id },
	// 			{
	// 				headers: {
	// 					authorization: "Bearer " + localStorage.getItem("token"),
	// 				},
	// 			}
	// 		);
	// 	} catch (error) {
	// 		setError(error.message);
	// 	}
	// };

	return (
		<div>
			<div className="container bg-lightop shadow mt-4">
				<h1>Welcome to your profile</h1>
				<p>Here you can see your data and the activities you liked the most!</p>
				<div className="row m-4">
					<div className="col-6">
						<div className="profile-card">
							<img
								src={avatar_1}
								alt="profile avatar"
								className="img-fluid"
								id="profile"
							/>
							{users.length > 0 &&
								users.map((user) => (
									<div key={user.id}>
										<h5> Welcome back, {user.name} !</h5>
										<div className="profile-card"></div>
										<div>Name: {user.name}</div>
										<div>Email address: {user.email}</div>
									</div>
								))}
						</div>
					</div>

					<div className="col-6 mt-4">
						<h3>Your favorities activities:</h3>
						{favActivities.length > 0 &&
							favActivities.map((activity) => (
								<div key={activity.id} className="card-body">
									<div>
										<li className="list-group-item">
											<div className="card-title">Title: {activity.name}</div>
											<div className="card-text">
												<span className="mb-4">
													From children of: {activity.age} y.o
												</span>
												<p>Description: {activity.description}</p>
											</div>
											<button
												className="btn btn-danger"
												onClick={() => removeFromFav(activity)}
											>
												{" "}
												Delete{" "}
											</button>
										</li>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>

			<div className="container mt-4">
				<p>Do you want to share an activity with us? Fill the form!</p>
				<AddForm onDone={(newActivity) => setActivities(newActivity)} />
			</div>
		</div>
	);
}

export default Profile;
