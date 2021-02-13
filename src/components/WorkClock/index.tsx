import React, { useState, useEffect } from "react";
import useCountdownTimer from "../../hooks/useCountdownTimer";
// import { parseTimeNum } from "../../utils/Functions/";
import ClockEclipse from "../ClockEclipse";
import { ClockProps } from "../ClockTabs";

/* ---------------- styles --------------- */
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

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
	const { minute, second, secondOnly, isDone } = useCountdownTimer(
		isPaused,
		duration
	);

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
					size={400}
					duration={duration}
					minute={minute}
					second={second}
					secondOnly={secondOnly}
				/>
			</Grid>
			<Grid item>
				<button onClick={() => setPaused((isPaused) => !isPaused)}>
					{isPaused ? "run" : "pause"}
				</button>
			</Grid>
		</Grid>
	);
};

export default WorkClock;
