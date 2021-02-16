import React, { useState, useEffect } from "react";
import useCountdownTimer from "../../hooks/useCountdownTimer";
// import { parseTimeNum } from "../../utils/Functions/";
import { ClockProps } from "../ClockTabs";
import useWidth from "../../hooks/useWidth";

/* ---------------- styles --------------- */
import { Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import TimerControlGroup from "../TimerControlGroup";
import ClockEclipse from "../ClockEclipse";
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

const WorkClock: React.FC<ClockProps> = ({
	handleOnClockEnd,
	handleIntervalCount,
}) => {
	const [isPaused, setPaused] = useState(true);
	const [count, setCount] = useState(0);
	const duration = 25;
	const { minute, second, secondOnly, isDone, resetTimer } = useCountdownTimer(
		isPaused,
		duration
	);
	const { windowWidth } = useWidth();

	// METHODS
	const toggleTimer = () => {
		setPaused(!isPaused);
	};
	/* --------------------------------------- */

	useEffect(() => {
		if (isDone) {
			handleOnClockEnd(isDone, () => {
				setPaused(true);
				setCount((count) => count + 1);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handleOnClockEnd, isDone]);

	useEffect(() => {
		handleIntervalCount && handleIntervalCount(count);
	}, [count, handleIntervalCount]);

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
					duration={duration}
					minute={minute}
					second={second}
					secondOnly={secondOnly}
					currentTimer={"work"}
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

export default WorkClock;
