import { useContext } from "react";

import { ConnectContext } from "../context/ConnectContext";

export const useConnect = () => {
	return useContext(ConnectContext);
};
