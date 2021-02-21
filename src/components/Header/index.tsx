import React from "react";
import SettingDialog from "../SettingDialog";
import {
	AppBar,
	Toolbar,
	Typography,
	// Button,
	// IconButton,
	Container,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// import MenuIcon from "@material-ui/icons/Menu";
// import { Settings } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			backdropFilter: "blur(30px) opacity(0.1)",
		},
		menu: {
			// margin: "0 auto",
			// width: "100%",
			// maxWidth: 960,
		},

		title: {
			flexGrow: 1,
		},
	})
);
const Header: React.FC = () => {
	const classes = useStyles();

	return (
		<AppBar position="static" className={classes.root} color="secondary">
			<Container>
				<Toolbar variant="dense" className={classes.menu}>
					<Typography variant="h6" className={classes.title}>
						PomO'clock
					</Typography>
					{/* <IconButton edge="end" color="inherit" aria-label="menu">
						<Settings />
					</IconButton> */}
					<SettingDialog />
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
