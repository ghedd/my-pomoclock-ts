import React, { useState, useEffect } from "react";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import { parseTimeNum } from "../../utils/Functions/";
import { ClockProps } from "../ClockTabs";

const WorkClock: React.FC<ClockProps> = ({
	handleOnClockEnd,
	handleIntervalCount,
}) => {
	const [isPaused, setPaused] = useState(true);
	const [count, setCount] = useState(0);
	const { minute, second, isDone } = useCountdownTimer(isPaused, 1);

	useEffect(() => {
		if (isDone) {
			handleOnClockEnd(isDone, () => {
				setPaused(true);
				setCount((count) => count + 1);
			});
		}
	}, [handleOnClockEnd, isDone]);

	useEffect(() => {
		handleIntervalCount && handleIntervalCount(count);
	}, [count, handleIntervalCount]);

	return (
		<div>
			<h2>This should be the work clock</h2>
			<button onClick={() => setPaused((isPaused) => !isPaused)}>
				{isPaused ? "run" : "pause"}
			</button>
			<span>{parseTimeNum(minute)}:</span>
			<span>{parseTimeNum(second)}</span>
		</div>
	);
};

export default WorkClock;
