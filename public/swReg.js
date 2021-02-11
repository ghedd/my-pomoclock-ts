if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("./sw.js")
		.then((reg) => {
			console.log("SW is successfully registered at", reg.scope);
		})
		.catch((err) =>
			console.log("Opps! What a shame. This is properly the error: ", err)
		);
}
