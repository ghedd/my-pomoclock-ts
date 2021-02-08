import React, { useState, useEffect } from "react";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import { parseTimeNum } from "../../utils/Functions";
import { ClockProps } from "../ClockTabs";
const ShorkBreakClock: React.FC<ClockProps> = ({ handleOnClockEnd }) => {
	const [isPaused, setPaused] = useState(true);
	// const [isDone, setDone] = useState(false);
	const { minute, second, isDone } = useCountdownTimer(isPaused, 1);

	useEffect(() => {
		if (isDone) {
			handleOnClockEnd(isDone, () => {
				setPaused(true);
			});
		}
	}, [handleOnClockEnd, isDone]);

	return (
		<div>
			<h2>This should be the short-break clock</h2>
			<button onClick={() => setPaused((isPaused) => !isPaused)}>
				{isPaused ? "run" : "pause"}
			</button>
			<span>{parseTimeNum(minute)}:</span>
			<span>{parseTimeNum(second)}</span>
		</div>
	);
};
export default ShorkBreakClock;
