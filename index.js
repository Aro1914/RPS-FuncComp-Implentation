import * as AppViews from "./components/App";
import * as Attacher from "./components/Attacher";
import * as Deployer from "./components/Deployer";
import * as PlayerViews from "./components/Player";
import RenderViews, { renderDOM } from "./layouts/renderViews";
import ReachContextProvider from "./context/ReachContext";
import "./index.css";

const Views = {
	...AppViews,
	...Attacher,
	...Deployer,
	...PlayerViews,
};

function App() {
	return (
		<div className='App'>
			<RenderViews {...Views} />
		</div>
	);
}

renderDOM(
	<ReachContextProvider>
		<App />
	</ReachContextProvider>
);

export default App;
