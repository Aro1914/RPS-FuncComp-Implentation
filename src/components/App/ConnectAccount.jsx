import React from "react";
import { useConnect } from "../../hooks/useConnect";

const ConnectAccount = () => {
	const { connecAccount } = useConnect();
	return (
		<div>
			Please wait while we connect to your account. If this takes more than a
			few seconds, there may be something wrong.
			<button onClick={connecAccount}>Connect Wallet</button>
		</div>
	);
};

export default ConnectAccount;
