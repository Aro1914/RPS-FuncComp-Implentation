import React from "react";
import { useConnect } from "../../hooks/useConnect";

const DeployerOrAttacher = () => {
	const { selectDeployer, selectAttacher } = useConnect();
	return (
		<div>
			Please select a role:
			<br />
			<p>
				<button onClick={() => selectDeployer()}>Deployer</button>
				<br /> Set the wager, deploy the contract.
			</p>
			<p>
				<button onClick={() => selectAttacher()}>Attacher</button>
				<br /> Attach to the Deployer's contract.
			</p>
		</div>
	);
};

export default DeployerOrAttacher;
