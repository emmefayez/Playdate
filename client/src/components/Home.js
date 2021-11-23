import React from "react";
import { Link } from "react-router-dom";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import "../App.css";

export default function Home() {
	return (
		<div className="container bg-lightop shadow mb-4 mt-4">
			<br />
			<div className="container bg-light">
				<h2 className="blue-d">Run out of ideas to entertain your kids?</h2>
				<p className="green-dd"> No need to panic!</p>
				<p className="green-dd">
					We have a list of suggestions for <strong>you</strong>!
				</p>
				<p className="green-dd">
					You can also share an activity that you like to play!
				</p>
			</div>

			<div className="row mt-4">
				<div className="col-6">
					<section className="card">
						<div className="card-body">
							<h2 className="blue-d">Activities catalogue</h2>
							<p>
								Browse through the catalogue to find the perfect game.You can
								also filter the results using a keyword.
							</p>

							<span>Take a look </span>
							<Link to="/Activities">here</Link>
							<img src={img1} alt="activities_img" className="img-fluid" />
						</div>
					</section>
				</div>
				<div className="col-6">
					<section className="card">
						<div className="card-body">
							<h2 className="blue-d">Places catalogue</h2>
							<p>
								Looking for something to visit with kids in Barcelona?Here a
								list of playgrounds, kids clubs and parks!
							</p>
							<span>Take a look </span>
							<Link to="/Places">here</Link>
							<img src={img2} alt="activities_img" className="img-fluid" />
							<br />
						</div>
					</section>
				</div>
			</div>
			<br />
		</div>
	);
}
