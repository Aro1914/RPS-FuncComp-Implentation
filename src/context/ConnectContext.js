import React, { useState } from "react";
import {
	loadStdlib,
	ALGO_MyAlgoConnect as MyAlgoConnect,
} from "@reach-sh/stdlib";
import * as backend from "../build/index.main.mjs";
const reach = loadStdlib("ALGO");

reach.setWalletFallback(
	reach.walletFallback({
		providerEnv: "TestNet",
		MyAlgoConnect,
	})
);

const handToInt = { ROCK: 0, PAPER: 1, SCISSORS: 2 };
const intToOutcome = ["Bob wins!", "Draw!", "Alice wins!"];
const { standardUnit } = reach;

const deadline = { ETH: 10, ALGO: 100, CFX: 1000 }[reach.connector];

export const ConnectContext = React.createContext();

const ConnectContextProvider = ({ children }) => {
	const [defaults] = useState({
		defaultFundAmt: "10",
		defaultWager: "3",
		standardUnit,
	});
	const [views, setViews] = useState({
		view: "ConnectAccount",
		Wrapper: "AppWrapper",
	});
	const [user, setUser] = useState({
		account: "",
		balance: "",
	});
	const [wager, setWager] = useState(defaults.defaultWager);
	const [outcome, setOutcome] = useState("");

	const [contract, setContract] = useState(null);
	const [playable, setPlayable] = useState(false);

	const [resolveAcceptedP, setResolvedAcceptedP] = useState({});
	const [resolveHandP, setResolveHandP] = useState({});

	const connecAccount = async () => {
		const account = await reach.getDefaultAccount();
		const balAtomic = await reach.balanceOf(account);
		const balance = reach.formatCurrency(balAtomic, 4);
		setUser({ account, balance });
		if (await reach.canFundFromFaucet()) {
			setViews({ view: "FundAccount" });
		} else {
			setViews({ view: "DeployerOrAttacher", Wrapper: "AppWrapper" });
		}
	};

	const fundAccount = async (fundAmount) => {
		await reach.fundFromFaucet(user.account, reach.parseCurrency(fundAmount));
		setViews({ view: "DeployerOrAttacher" });
	};

	const skipFundAccount = async () => {
		setViews({ view: "DeployerOrAttacher", Wrapper: "AppWrapper" });
	};

	const selectAttacher = () => {
		setViews({ Wrapper: "AttacherWrapper", view: "Attach" });
	};

	const selectDeployer = () => {
		setViews({ Wrapper: "DeployerWrapper", view: "SetWager" });
	};

	//Player Interactions
	
	const random = () => {
		return reach.hasRandom.random();
	};
	const getHand = async () => {
		const hand = await new Promise((resolveHandP) => {
			setResolveHandP({ resolveHandP });
			setPlayable(true);
			setViews({ view: "GetHand" });
		});
		setResolveHandP((c) => ({ ...c, hand }));
		setViews({ view: "WaitingForResults" });
		return handToInt[hand];
	};
	const seeOutcome = (i) => {
		setOutcome(intToOutcome[i]);
		setViews({ view: "Done" });
	};
	const informTimeout = () => {
		setViews({ view: "Timeout" });
	};
	const playHand = (hand) => {
		resolveHandP.resolveHandP(hand);
	};

	const handleWager = () => {
		setWager(reach.parseCurrency(wager));
		setViews({ view: "Deploy", Wrapper: "DeployerWrapper" });
	};

	const commonInteract = {
		random,
		getHand,
		seeOutcome,
		informTimeout,
	};

	const DeployerInteract = {
		...commonInteract,
		wager,
		deadline,
	};

	const deploy = async () => {
		const ctc = user.account.contract(backend);
		setViews({ view: "Deploying" });

		ctc.p.Alice(DeployerInteract);
		const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
		console.log(ctcInfoStr);
		setContract({ ctcInfoStr });
		setViews({ view: "WaitingForAttacher" });
	};

	const acceptWager = async (wagerAtomic) => {
		const wager = reach.formatCurrency(wagerAtomic, 4);
		return await new Promise((resolveAcceptedP) => {
			setResolvedAcceptedP({ resolveAcceptedP });
			setWager(wager);
		});
	};
	const Attacherinteract = {
		acceptWager,
		...commonInteract,
	};

	const attach = async (ctcInfoStr) => {
		try {
			console.log(ctcInfoStr);
			console.log(user.account);
			const ctc = user.account.contract(backend, JSON.parse(ctcInfoStr));
			setViews({ view: "Attaching" });
			await ctc.p.Bob(Attacherinteract);
		} catch (error) {
			console.log({ error });
		}
	};

	const termsAccepted = () => {
		resolveAcceptedP.resolveAcceptedP();
		setViews({ view: "WaitingForTurn" });
	};

	const connectContextValues = {
		...defaults,

		contract,
		playHand,

		//Connect Account
		user,
		views,
		fundAccount,
		connecAccount,
		skipFundAccount,

		//Select Participant
		selectDeployer,
		selectAttacher,

		// For Deployer
		handleWager,
		setWager,
		deploy,
		playable,
		resolveHandP,
		outcome,

		//Attacher
		attach,
		acceptWager,
		termsAccepted,
	};

	return (
		<ConnectContext.Provider value={connectContextValues}>
			{children}
		</ConnectContext.Provider>
	);
};

export default ConnectContextProvider;
