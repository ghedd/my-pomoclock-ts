import React, { useState, useEffect } from "react";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import { parseTimeNum } from "../../utils/Functions/";
import { ClockProps } from "../ClockTabs";

const LongBreakClock: React.FC<ClockProps> = ({ handleOnClockEnd }) => {
	const duration = 15;
	const [isPaused, setPaused] = useState(true);
	// const [isDone, setDone] = useState(false);
	const { minute, second, isDone } = useCountdownTimer(
		isPaused,
		duration
	);

	useEffect(() => {
		if (isDone) {
			handleOnClockEnd(isDone, () => {
				setPaused(true);
			});
		}
	}, [handleOnClockEnd, isDone]);

	return (
		<div>
			<span>{parseTimeNum(minute)}:</span>
			<span>{parseTimeNum(second)}</span>
			<button onClick={() => setPaused((isPaused) => !isPaused)}>
				{isPaused ? "run" : "pause"}
			</button>
		</div>
	);
};

export default LongBreakClock;
