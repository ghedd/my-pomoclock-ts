import React from "react";
import ClockTabs from "./components/ClockTabs";
import { DesktopNotificationsProvider } from "./contexts/DesktopNotificationsCtx";

const App = () => {
	const notifyMe = () => {
		// Let's check if the browser supports notifications
		if (!("Notification" in window)) {
			alert("This browser does not support desktop notification");
		}

		// Let's check whether notification permissions have already been granted
		else if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			navigator.serviceWorker.ready.then((reg) => {
				reg.showNotification("HEY!!!", {
					vibrate: [200, 100, 200],
				});
			});
		}

		// Otherwise, we need to ask the user for permission
		else if (Notification.permission !== "denied") {
			Notification.requestPermission().then(function (permission) {
				// If the user accepts, let's create a notification
				if (permission === "granted") {
					navigator.serviceWorker.ready.then((reg) => {
						reg.showNotification("HEY!!!", {
							vibrate: [200, 100, 200],
						});
					});
				}
			});
		}

		// At last, if the user has denied notifications, and you
		// want to be respectful there is no need to bother them any more.
	};
	return (
		<DesktopNotificationsProvider>
			<div>
				<h1>This is my app</h1>
				<button onClick={() => notifyMe()}>notify me</button>
				<ClockTabs />
			</div>
		</DesktopNotificationsProvider>
	);
};

export default App;
