// import React from 'react'
import { useState, useEffect } from "react";
import useDesktopNotifications from "../../hooks/useDesktopNotifications";
import LongBreakClock from "../LongBreakClock";
import ShorkBreakClock from "../ShortBreakClock";
import WorkClock from "../WorkClock";
import timesUp from "../../assets/audio/times-up.mp3";
import { useAudio } from "../../hooks/useAudio";
// import { CountDownTimerProvider } from "../../contexts/CountDownTimerCtx";

/* ---------------- styles --------------- */
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Card, AppBar, Tabs, Tab, Box } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";

export interface ClockProps {
	handleIntervalCount?(count: number): void | null;
	handleOnClockEnd(done: boolean, cb: any): void;
}

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		clockCard: {
			width: "100%",
			minHeight: 400,
			

		},
	})
);

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

const a11yProps = (index: any) => {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
};
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

	/* ----------------- MUI ----------------- */
	const [value, setValue] = useState(0);

	/* --------------------------------------- */

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

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
				setValue(2);
			} else {
				setCurrentClock(clocks.shortBreak);
				setValue(1);
				dispatchMessage("How about taking a short break?");
			}
		} else {
			dispatchMessage("Just about time to get back to work!");
			setCurrentClock(clocks.workClock);
			setValue(0);
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

	/* ---------- end: notification ---------- */

	const classes = useStyles();
	return (
		<Card className={classes.clockCard}>
			<AppBar position="static" color="transparent">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="clock tab pannel"
				>
					<Tab
						label="Focus"
						{...a11yProps(0)}
						onClick={() => setCurrentClock(workClock)}
					/>
					<Tab
						label="Short Break"
						{...a11yProps(1)}
						onClick={() => setCurrentClock(shortBreak)}
					/>
					<Tab
						label="Long Break"
						{...a11yProps(2)}
						onClick={() => setCurrentClock(longBreak)}
					/>
				</Tabs>
			</AppBar>
			<div>
				<TabPanel value={value} index={0}>
					<WorkClock
						handleOnClockEnd={handleOnClockEnd}
						handleIntervalCount={handleIntervalCount}
					/>
				</TabPanel>

				<TabPanel value={value} index={1}>
					<ShorkBreakClock handleOnClockEnd={handleOnClockEnd} />
				</TabPanel>

				<TabPanel value={value} index={2}>
					<LongBreakClock handleOnClockEnd={handleOnClockEnd} />
				</TabPanel>
			</div>
		</Card>
	);
};

export default ClockTabs;
