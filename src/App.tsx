import React from "react";
import ClockTabs from "./components/ClockTabs";
import { DesktopNotificationsProvider } from "./contexts/DesktopNotificationsCtx";

const App = () => {
	return (
		<DesktopNotificationsProvider>
			<div>
				<h1>This is my app</h1>
				<ClockTabs />
			</div>
		</DesktopNotificationsProvider>
	);
};

export default App;
