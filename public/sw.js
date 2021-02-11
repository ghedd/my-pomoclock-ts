// @ts-nocheck
/* eslint-disable no-restricted-globals */

// install service worker
self.addEventListener("install", (event) => {
	console.log("SW has been installed");
});
// active service worker
self.addEventListener("activate", (event) => {
	console.log("SW has been activated");
});
// click event
self.addEventListener("notificationclick", (event) => {
	event.notification.close();
	const urlToOpen = new URL("/", self.location.origin).href;

	// @ts-ignore
	const { clients } = self;
	const promiseChain = clients
		.matchAll({
			type: "window",
			includeUncontrolled: true,
		})
		.then((windowClients) => {
			let matchingClient = null;

			for (let i = 0; i < windowClients.length; i++) {
				const windowClient = windowClients[i];
				if (windowClient.url === urlToOpen) {
					matchingClient = windowClient;
					break;
				}
			}

			if (matchingClient) {
				return matchingClient.focus();
			} else {
				return clients.openWindow(urlToOpen);
			}
		});

	event.waitUntil(promiseChain);
});
