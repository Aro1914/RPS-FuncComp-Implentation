import React from "react";

const Done = ({ outcome }) => {
	return (
		<div>
			Thank you for playing. The outcome of this game was:
			<br />
			{outcome || "Unknown"}
		</div>
	);
};

export default Done;
