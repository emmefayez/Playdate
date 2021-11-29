import React, { useState } from "react";

function SearchForm(props) {
	const [query, setQuery] = useState("");

	const handleQuery = (event) => {
		event.preventDefault();
		const query = event.target.value;
		setQuery(query);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.submitCb(query);
	};

	return (
		<div className="card">
			<form className="card-body" onSubmit={handleSubmit}>
				<label>
					<h5 className="card-title blue-d">Search by keyword</h5>
				</label>
				<input
					className="form-control mb-4"
					type="text"
					placeholder="ball, chalks, montessori"
					name="keyword"
					value={query}
					onChange={(e) => handleQuery(e)}
				/>
				<button
					aria-label="Search_button"
					type="submit"
					className="btn btn-primary"
				>
					Search
				</button>

				<div id="searchAge"></div>
			</form>
		</div>
	);
}

export default SearchForm;
