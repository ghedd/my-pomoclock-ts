// import React from 'react'
import { useState, useEffect } from "react";
import useDesktopNotifications from "../../hooks/useDesktopNotifications";
import LongBreakClock from "../LongBreakClock";
import ShorkBreakClock from "../ShortBreakClock";
import WorkClock from "../WorkClock";
import timesUp from "../../assets/audio/times-up.mp3";
import { useAudio } from "../../hooks/useAudio";

export interface ClockProps {
	handleIntervalCount?(count: number): void | null;
	handleOnClockEnd(done: boolean, cb: any): void;
}

const ClockTabs: React.FC = () => {
	const clocks = {
		workClock: "work",
		shortBreak: "short-break",
		longBreak: "long-break",
	};
	const { workClock, shortBreak, longBreak } = clocks;
	const [workClockCount, setCount] = useState(1);
	const [currentClock, setCurrentClock] = useState(workClock);
	const [isDone, setDone] = useState(false);

	/* --------- NOTE: notifications --------- */
	const { playAudio } = useAudio(timesUp);

	const { dispatchMessage } = useDesktopNotifications();

	const handleOnClockEnd = (done: boolean, cb: () => void) => {
		cb();
		setDone(done);
	};

	const autoSwitchClock = () => {
		if (currentClock === clocks.workClock) {
			if (workClockCount !== 0 && workClockCount % 2 === 0) {
				dispatchMessage("Enjoy your long break!");
				setCurrentClock(clocks.longBreak);
			} else {
				setCurrentClock(clocks.shortBreak);
				dispatchMessage("How about taking a short break?");
			}
		} else {
			dispatchMessage("Just about time to get back to work!");
			setCurrentClock(clocks.workClock);
		}
	};
	const handleClockSwitch = (cb: () => void) => {
		cb();
		setDone(false);
	};
	const handleIntervalCount = (count: number) => {
		setCount(workClockCount + count);
	};
	useEffect(() => {
		if (isDone) {
			playAudio();
			handleClockSwitch(() => {
				autoSwitchClock();
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDone]);

	console.log("done? ", isDone);

	return (
		<div>
			<h1>Controller</h1>
			<button onClick={() => playAudio()}>sound</button>
			<div className="clock-tab">
				<button onClick={() => setCurrentClock(workClock)}>work</button>
				<button onClick={() => setCurrentClock(shortBreak)}>short break</button>
				<button onClick={() => setCurrentClock(longBreak)}>long break</button>
			</div>
			{currentClock === clocks.workClock ? (
				<WorkClock
					handleOnClockEnd={handleOnClockEnd}
					handleIntervalCount={handleIntervalCount}
				/>
			) : currentClock === clocks.shortBreak ? (
				<ShorkBreakClock handleOnClockEnd={handleOnClockEnd} />
			) : (
				<LongBreakClock handleOnClockEnd={handleOnClockEnd} />
			)}
		</div>
	);
};

export default ClockTabs;
