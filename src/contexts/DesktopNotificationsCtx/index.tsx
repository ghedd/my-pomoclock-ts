import React, { useState, useEffect, useCallback } from "react";

interface DesktopNotifications {
	dispatchMessage: (message: string) => void;
}

export const DesktopNotificationsCtx = React.createContext(
	{} as DesktopNotifications
);

export const DesktopNotificationsProvider: React.FC = ({ children }) => {
	const [message, setMessage] = useState("");

	const dispatchMessage = useCallback((message: string) => {
		setMessage(message);
	}, []);
	const showNotification = (message: string) => {
		// Let's check if the browser supports notifications
		if (!("Notification" in window)) {
			alert("This browser does not support desktop notification");
		}

		// Let's check whether notification permissions have already been granted
		else if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			navigator.serviceWorker.ready.then((reg) => {
				reg.showNotification(message);
			});
		}
		// Otherwise, we need to ask the user for permission
		else if (Notification.permission !== "denied") {
			Notification.requestPermission().then(function (permission) {
				// If the user accepts, let's create a notification
				if (permission === "granted") {
					navigator.serviceWorker.ready.then((reg) => {
						reg.showNotification(
							"Thank you for using PomO'clock! You'll be notified every time your clocks end.",
							{
								vibrate: [200, 100, 200],
							}
						);
					});
				}
			});
		}

		// At last, if the user has denied notifications, and you
		// want to be respectful there is no need to bother them any more.
	};
	useEffect(() => {
		if (message !== "") {
			showNotification(message);
		}
		return () => {
			setMessage("");
		};
	}, [message]);

	const value = {
		dispatchMessage,
	};
	return (
		<DesktopNotificationsCtx.Provider value={value}>
			{children}
		</DesktopNotificationsCtx.Provider>
	);
};
