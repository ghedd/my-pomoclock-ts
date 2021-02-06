import React, { useState, useEffect } from "react";

interface DesktopNotifications {
	dispatchMsg: (message: string) => void;
	handleClick?: () => void;
}

export const DesktopNotificationsCtx = React.createContext(
	{} as DesktopNotifications
);

export const DesktopNotificationsProvider: React.FC = ({ children }) => {
	const [message, setMessage] = useState("");

	const dispatchMsg = (message: string) => {
		setMessage(message);
	};
	const handleClick = () => {
		console.log("clicked");
	};

	useEffect(() => {
		const notifyUser = () => {
			let notification: any;
			if (!("Notification" in window)) {
				alert("Opps! This browser doesn't seem to support notification");
			} else if (Notification.permission === "granted") {
				notification = new Notification(message);
				return notification;
			} else if (Notification.permission !== "denied") {
				Notification.requestPermission().then((permission) => {
					if (permission === "granted") {
						notification = new Notification(message);
						return notification;
					}
				});
			}
		};
		if (message !== "") {
			notifyUser();
		}
		return () => {
			setMessage("");
		};
	}, [message]);

	const value = {
		dispatchMsg,
		handleClick,
	};
	return (
		<DesktopNotificationsCtx.Provider value={value}>
			{children}
		</DesktopNotificationsCtx.Provider>
	);
};
