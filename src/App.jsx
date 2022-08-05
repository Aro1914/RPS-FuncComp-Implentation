import "./App.css";
import * as AppViews from "./components/App";
import * as Attacher from "./components/Attacher";
import * as Deployer from "./components/Deployer";
import * as PlayerViews from "./components/Player";
import RenderViews from "./layouts/renderViews";

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

export default App;
