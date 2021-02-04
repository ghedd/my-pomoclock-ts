import { useState, useEffect } from "react";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import { parseTimeNum } from "../../utils/Functions";

const WorkClock: React.FC = () => {
	const [currentClock, setCurrentClock] = useState("work");
	const [duration, setDuration] = useState(0);
	const [isRunning, setRunning] = useState(false);
	const [isReset, setReset] = useState(false);
	const { minute, second } = useCountdownTimer(isRunning, isReset, duration);

	const selectClock = (clockType: string) => {
		setCurrentClock(clockType);
		setReset(true);
	};

	/* ---------- update clock type ---------- */

	useEffect(() => {
		switch (currentClock) {
			case "work":
				return setDuration(25);
			case "long-break":
				return setDuration(15);
			case "short-break":
				return setDuration(5);
			default:
				return setDuration(25);
		}
	}, [currentClock]);

	/* -------- end: update clock type ------- */

	/* ------------- reset clock ------------- */

	useEffect(() => {
		return () => {
			setReset(false);
		};
	}, [isReset]);

	useEffect(() => {
		if (minute === 0 && second === 0) {
			setRunning(false);
		}
	}, [minute, second]);

	/* ----------- end:reset clock ----------- */

	return (
		<div>
			<div className="clocktab">
				<button disabled={isRunning} onClick={() => selectClock("work")}>
					work clock
				</button>
				<button disabled={isRunning} onClick={() => selectClock("long-break")}>
					long break
				</button>
				<button disabled={isRunning} onClick={() => selectClock("short-break")}>
					short break
				</button>
			</div>
			<h1>{currentClock}</h1>
			<button onClick={() => setRunning(!isRunning)}>
				{isRunning ? "pause" : "run"}
			</button>
			<button
				onClick={() => {
					setReset(true);
				}}
			>
				reset
			</button>
			<span>{parseTimeNum(minute)}:</span>
			<span>{parseTimeNum(second)}</span>
		</div>
	);
};

export default WorkClock;
