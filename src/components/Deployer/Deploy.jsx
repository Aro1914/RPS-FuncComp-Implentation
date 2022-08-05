import React from "react";
import { useConnect } from "../../hooks/useConnect";

const Deploy = () => {
	const { deploy, wager, standardUnit } = useConnect();
	return (
		<div>
			Wager (pay to deploy): <strong>{wager}</strong> {standardUnit}
			<br />
			<button onClick={() => deploy()}>Deploy</button>
		</div>
	);
};

export default Deploy;
