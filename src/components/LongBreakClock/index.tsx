import React, { useState, useEffect } from "react";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import { ClockProps } from "../ClockTabs";
import useWidth from "../../hooks/useWidth";
import useDesktopNotifications from "../../hooks/useDesktopNotifications";

/* ---------------- styles --------------- */
import { Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import TimerControlGroup from "../TimerControlGroup";
import ClockEclipse from "../ClockEclipse";
import useSettings from "../../hooks/useSettings";
/* --------------------------------------- */

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			marginTop: "1.5rem",
			marginBottom: "1rem",
		},
	})
);
const LongBreakClock: React.FC<ClockProps> = ({ handleOnClockEnd }) => {
	const [isPaused, setPaused] = useState(true);
	// const duration = 15;
	const { timerSettings } = useSettings();
	const { minute, second, secondOnly, isDone, resetTimer } = useCountdownTimer(
		isPaused,
		timerSettings.longBreakDuration
	);
	const { windowWidth } = useWidth();
	const { dispatchMessage } = useDesktopNotifications();
	// METHODS
	const toggleTimer = () => {
		setPaused(!isPaused);
	};
	/* --------------------------------------- */
	useEffect(() => {
		if (minute === 4)
			dispatchMessage("Head's up! You've got about 5 minutes left.");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [minute, second]);

	useEffect(() => {
		if (isDone) {
			handleOnClockEnd(isDone, () => {
				setPaused(true);
			});
		}
	}, [handleOnClockEnd, isDone]);

	const classes = useStyles();

	return (
		<Grid
			className={classes.root}
			spacing={4}
			container
			direction="column"
			justify="center"
			alignItems="center"
		>
			<Grid item>
				<ClockEclipse
					size={windowWidth <= 400 ? 200 : windowWidth <= 768 ? 300 : 350}
					duration={timerSettings.longBreakDuration}
					minute={minute}
					second={second}
					secondOnly={secondOnly}
					currentTimer={"long-break"}
				/>
			</Grid>
			<Grid item>
				<TimerControlGroup
					isPaused={isPaused}
					toggleTimer={toggleTimer}
					resetTimer={resetTimer}
				/>
			</Grid>
		</Grid>
	);
};

export default LongBreakClock;
