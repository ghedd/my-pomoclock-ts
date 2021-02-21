import React, { useState } from "react";
import {
	Button,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	// DialogTitle,
	IconButton,
	Theme,
	Typography,
	withStyles,
	WithStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Settings } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import SettingOptions from "../SettingOptions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
// interface SettingDialogProps {
// 	handleOpen?(): void;
// }

const styles = (theme: Theme) =>
	createStyles({
		root: {
			margin: 0,
			padding: theme.spacing(2),
		},
		closeButton: {
			position: "absolute",
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500],
		},
	});

export interface DialogTitleProps extends WithStyles<typeof styles> {
	id: string;
	children: React.ReactNode;
	onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const SettingDialog: React.FC = () => {
	const [isOpen, setOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<IconButton
				edge="end"
				color="inherit"
				aria-label="menu"
				onClick={() => handleClickOpen()}
			>
				<Settings />
			</IconButton>
			<Dialog open={isOpen} fullScreen={fullScreen}>
				<DialogTitle id="setting-dialog" onClose={() => handleClose()}>
					Settings
				</DialogTitle>
				<DialogContent>
					{/* <DialogContentText> */}
					<SettingOptions />
					{/* </DialogContentText> */}
				</DialogContent>
				<DialogActions>
					<Button>save</Button>
					<Button color="secondary" onClick={() => setOpen(false)}>
						cancel
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SettingDialog;
