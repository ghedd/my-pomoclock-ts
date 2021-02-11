import { useState, useEffect, useRef } from "react";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import useDesktopNotifications from "../../hooks/useDesktopNotifications";
import timesUpSound from "../../assets/audio/times-up.mp3";
// import useDesktopNotifications from "../../hooks/useDesktopNotifications";
import { parseTimeNum } from "../../utils/Functions";
import { useAudio } from "../../hooks/useAudio";

const WorkClock: React.FC = () => {
	const [currentClock, setCurrentClock] = useState("work");
	const [duration, setDuration] = useState(1);
	const [isRunning, setRunning] = useState(false);
	const [intervalCount, setCount] = useState(1);
	const [isDone, setDone] = useState(false);
	const [isReset, setReset] = useState(false);
	const { playAudio } = useAudio(timesUpSound);
	const { minute, second } = useCountdownTimer(isRunning, duration);

	const { dispatchMessage } = useDesktopNotifications();

	const prevClockRef = useRef(currentClock);
	const prevClock = prevClockRef.current;
	useEffect(() => {
		prevClockRef.current = currentClock;
		console.log(intervalCount > 0 && intervalCount % 2 === 0);
		if (prevClock === "work" && isDone) {
			setCount((intervalCount) => intervalCount + 1);
		}
	}, [currentClock, isDone, intervalCount, prevClock]);

	// TODO:
	// [] switch clock when time's up
	useEffect(() => {
		dispatchMessage(intervalCount.toString());
	}, [intervalCount, dispatchMessage]);

	useEffect(() => {
		console.log("done? ", isDone);
		if (isDone) {
			playAudio();
			if (
				intervalCount > 0 &&
				intervalCount % 2 === 0 &&
				prevClock === "work"
			) {
				setDuration(1);
				setDone(false);
				setCurrentClock("long-break");
				dispatchMessage("Time to have a long break");
			} else if (currentClock === "work") {
				setDuration(1);
				setDone(false);
				setCurrentClock("short-break");
				dispatchMessage("Time to have a short break");
			} else {
				setCurrentClock("work");
				setDuration(1);
				setDone(false);
				dispatchMessage("Time to work");
			}
			/* if (currentClock === "short-break" || currentClock === "long-break") {
		
			} */
		}
		return () => {};
	}, [
		isDone,
		dispatchMessage,
		currentClock,
		intervalCount,
		prevClock,
		playAudio,
	]);

	const toggleClock = () => {
		setRunning(!isRunning);
		// setDone(false);
	};
	const selectClock = (clockType: string) => {
		setReset(true);
		switch (currentClock) {
			case "work":
				setDuration(1);
				setCurrentClock(clockType);
				break;
			case "long-break":
				setDuration(1);
				setCurrentClock(clockType);
				break;
			case "short-break":
				setDuration(1);
				setCurrentClock(clockType);
				break;
			default:
				return setDuration(25);
		}
	};

	/* ------------- reset clock ------------- */

	useEffect(() => {
		return () => {
			setReset(false);
		};
	}, [isReset]);

	useEffect(() => {
		if (minute === 0 && second === 0) {
			setRunning(false);
			setDone(true);
		}
	}, [minute, second]);

	/* ----------- end:reset clock ----------- */

	return (
		<div>
			<div className="clocktab">
				<button
					disabled={isRunning}
					onClick={() => {
						selectClock("work");
					}}
				>
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
			<button onClick={() => toggleClock()}>
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
