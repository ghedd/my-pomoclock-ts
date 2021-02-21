import React, { useState } from "react";
import {
	createStyles,
	FormControl,
	Grid,
	makeStyles,
	MenuItem,
	Select,
	Theme,
	Typography,
} from "@material-ui/core";
import useWidth from "../../hooks/useWidth";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			marginBottom: theme.spacing(2),
			marginTop: theme.spacing(2),
			// marginBottom: "1rem",
			minWidth: 180,
			width: "100%",
		},
		// selectEmpty: {
		// 	marginTop: theme.spacing(2),
		// },
	})
);

const SettingOptions: React.FC = () => {
	const initOptions = {
		focusDuration: 25,
		shortBreakDuration: 5,
		longBreakDuration: 15,
		focusInterval: 4,
	};
	const [timerOptions, setOptions] = useState(initOptions);

	const optionLabels = {
		focusDuration: "focusDuration",
		shortBreakDuration: "shortBreakDuration",
		longBreakDuration: "longBreakDuration",
		focusInterval: "focusInterval",
	};
	const focusDurations = [20, 25, 30, 35, 40, 45];
	const shortBreakDurations = [1, 3, 5, 10];
	const longBreakDurations = [15, 20, 25, 30];
	const focusIntervals = [2, 3, 4, 5, 6];
	const classes = useStyles();
	const { windowWidth } = useWidth();

	//METHODS
	const handleChange = (
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		const name = event.target.name as keyof typeof timerOptions;
		setOptions({ ...timerOptions, [name]: event.target.value });
	};
	const createOptionInput = (option: string, values: number[]) => {
		let input = {
			displayName: "",
			name: "",
			value: 0,
		};

		switch (option) {
			case "focusDuration":
				input = {
					displayName: "Focus duration",
					name: option,
					value: timerOptions.focusDuration,
				};
				break;
			case "shortBreakDuration":
				input = {
					displayName: "Short break duration",
					name: option,
					value: timerOptions.shortBreakDuration,
				};
				break;
			case "longBreakDuration":
				input = {
					displayName: "Long break duration",
					name: option,
					value: timerOptions.longBreakDuration,
				};
				break;
			case "focusInterval":
				input = {
					displayName: "Focus sessions before long break",
					name: option,
					value: timerOptions.focusInterval,
				};
				break;
		}

		return (
			<Grid
				container
				direction={windowWidth <= 768 ? "column" : "row"}
				justify="space-between"
				alignItems={windowWidth <= 768 ? "flex-start" : "center"}
				spacing={3}
			>
				<Grid item>
					<Typography variant="body1">{input.displayName}:</Typography>
				</Grid>
				<Grid item>
					<Select
						value={input.value}
						color="secondary"
						onChange={handleChange}
						// displayEmpty
						// className={classes.selectEmpty}
						inputProps={{
							name: input.name,
							id: input.name,
						}}
					>
						{values.map((val) => (
							<MenuItem key={`${input.name}-${val}`} value={val}>
								{val} {input.name === "focusInterval" ? "" : "minutes"}
							</MenuItem>
						))}
					</Select>
				</Grid>
			</Grid>
		);
	};
	/* --------------------------------------- */

	return (
		<div>
			<FormControl className={classes.formControl}>
				{createOptionInput(optionLabels.focusDuration, focusDurations)}
			</FormControl>
			<FormControl className={classes.formControl}>
				{createOptionInput(
					optionLabels.shortBreakDuration,
					shortBreakDurations
				)}
			</FormControl>
			<FormControl className={classes.formControl}>
				{createOptionInput(optionLabels.longBreakDuration, longBreakDurations)}
			</FormControl>
			<FormControl className={classes.formControl}>
				{createOptionInput(optionLabels.focusInterval, focusIntervals)}
			</FormControl>
		</div>
	);
};

export default SettingOptions;
