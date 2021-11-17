import React, { useState } from "react";
import "../App.css";
import { useParams } from "react-router";

export default function Footer() {
	const { id } = useParams();
	const [page, setPage] = useState({ id: id });

	let color = "yellow";
	let background = `footer ${color}`;

	return (
		<div className={background}>
			<h1>hi {color}</h1>
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}
