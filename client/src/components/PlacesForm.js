import React, { useState } from "react";

export default function PlacesForm({ anchor }) {
	return (
		<div>
			this will be a form {anchor[0].toString().length},{" "}
			{anchor[1].toString().length}
		</div>
	);
}

// http://www.mapquestapi.com/geocoding/v1/address?key=afcv2MJNDXWhstq1z6wuOXpyDpPm9Tqs&location=Carrer+d'en+Grassot+101+Barcelona+Spain+08025
