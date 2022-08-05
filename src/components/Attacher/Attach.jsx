import React, { useState } from "react";
import { useConnect } from "../../hooks/useConnect";

const Attach = () => {
	const [ctcInfoStr, setCtcInfoStr] = useState("");
	const { attach } = useConnect();
	return (
		<div>
			Please paste the contract info to attach to:
			<br />
			<textarea
				spellCheck='false'
				className='ContractInfo'
				onChange={(e) => setCtcInfoStr(e.currentTarget.value)}
				placeholder='Enter contract info'
			/>
			<br />
			<button disabled={!ctcInfoStr} onClick={() => attach(ctcInfoStr)}>
				Attach
			</button>
		</div>
	);
};

export default Attach;
