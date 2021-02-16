import React from "react";

/* ---------------- styles --------------- */
import { Button, makeStyles, createStyles, Theme } from "@material-ui/core";
import { PlayArrow, Replay, Pause } from "@material-ui/icons";
import useWidth from "../../hooks/useWidth";

interface TimerControlGroupProps {
	isPaused: boolean;
	toggleTimer(): void;
	resetTimer(): void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				minWidth: 80,
				margin: theme.spacing(1),
			},
		},
	})
);

const TimerControlGroup: React.FC<TimerControlGroupProps> = ({
	isPaused,
	toggleTimer,
	resetTimer,
}) => {
	const { windowWidth } = useWidth();
	const classes = useStyles();

	const makeResponsiveBtn = (): any => {
		return windowWidth <= 400
			? "small"
			: windowWidth <= 768
			? "medium"
			: "large";
	};
	return (
		<div className={classes.root}>
			<Button
				color="secondary"
				variant="contained"
				size={makeResponsiveBtn()}
				startIcon={isPaused ? <PlayArrow /> : <Pause />}
				onClick={() => toggleTimer()}
			>
				{isPaused ? "start" : "pause"}
			</Button>
			<Button
				variant="contained"
				color="default"
				size={makeResponsiveBtn()}
				startIcon={<Replay />}
				onClick={() => resetTimer()}
			>
				reset
			</Button>
		</div>
	);
};

export default TimerControlGroup;
