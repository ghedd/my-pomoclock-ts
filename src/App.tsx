import React from "react";
import ClockTabs from "./components/ClockTabs";
import { DesktopNotificationsProvider } from "./contexts/DesktopNotificationsCtx";

/* ---------------- styles --------------- */
import "./App.scss";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from "./components/Header";

const theme = createMuiTheme({
	typography: {
		fontFamily: `"Poppins", sans-serif`,
	},
	palette: {
		primary: {
			main: "#fafafa",
		},
		secondary: {
			main: "#9c0506",

			"100": "#00b28e",
			"200": "#0a5142",
		},
		success: {
			main: "#00b28e",
		},
		info: {
			main: "#0a5142",
		},
	},
});

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			margin: "0 auto",
		},
		mainContainer: {
			display: "grid",
			placeItems: "center",
			height: "calc(100% - 2rem)",
			minHeight: "90vh",
			width: "96vw",
		},
	})
);
const App = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<ThemeProvider theme={theme}>
				<DesktopNotificationsProvider>
					<Header />
					<Container  maxWidth="sm" className={classes.mainContainer}>
						<ClockTabs />
					</Container>
				</DesktopNotificationsProvider>
			</ThemeProvider>
		</div>
	);
};

export default App;
