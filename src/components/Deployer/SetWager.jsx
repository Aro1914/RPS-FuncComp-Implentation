import React from "react";
import { useConnect } from "../../hooks/useConnect";

const SetWager = () => {
	const { handleWager, defaultWager, standardUnit, setWager } = useConnect();
	return (
		<div>
			<input
				type='number'
				placeholder={defaultWager}
				onChange={(e) => setWager(e.currentTarget.value)}
			/>
			{standardUnit}
			<br />
			<button onClick={() => handleWager()}>Set wager</button>
		</div>
	);
};

export default SetWager;
