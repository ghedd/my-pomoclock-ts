import React, { useState } from "react";
import useSettings from "../../hooks/useSettings";
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
import { Settings, Check } from "@material-ui/icons";
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
	const {
		timerSettings,
		isUpdating,
		updateSettings,
		toggleUpdating,
	} = useSettings();
	const initSettings = {
		focusDuration: timerSettings.focusDuration,
		focusInterval: timerSettings.focusInterval,
		longBreakDuration: timerSettings.longBreakDuration,
		shortBreakDuration: timerSettings.shortBreakDuration,
	};
	const [customSettings, setCustomSettings] = useState(initSettings);

	const [isOpen, setOpen] = useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

	const handleClickOpen = () => {
		toggleUpdating(true);
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setCustomSettings((customSettings) => initSettings);
	};

	const handleCustomSettings = (
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		const name = event.target.name as keyof typeof customSettings;
		setCustomSettings({ ...customSettings, [name]: event.target.value });
		toggleUpdating(true);
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
					<SettingOptions
						focusDuration={customSettings.focusDuration}
						focusInterval={customSettings.focusInterval}
						longBreakDuration={customSettings.longBreakDuration}
						shortBreakDuration={customSettings.shortBreakDuration}
						handleCustomSettings={handleCustomSettings}
					/>
					{/* </DialogContentText> */}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => updateSettings(customSettings)}>
						{isUpdating ? "save" : <Check />}
					</Button>
					<Button color="secondary" onClick={() => handleClose()}>
						cancel
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SettingDialog;
