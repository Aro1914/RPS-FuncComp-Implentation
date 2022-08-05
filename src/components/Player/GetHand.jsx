import React from "react";
import { useConnect } from "../../hooks/useConnect";

const GetHand = () => {
	const { playable, resolveHandP, playHand } = useConnect();
	return (
		<div>
			{resolveHandP.hand ? "It was a draw! Pick again." : ""}
			<br />
			{!playable ? "Please wait..." : ""}
			<br />
			<button disabled={!playable} onClick={() => playHand("ROCK")}>
				Rock
			</button>
			<button disabled={!playable} onClick={() => playHand("PAPER")}>
				Paper
			</button>
			<button disabled={!playable} onClick={() => playHand("SCISSORS")}>
				Scissors
			</button>
		</div>
	);
};

export default GetHand;
