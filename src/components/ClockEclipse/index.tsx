import React, { useState, useEffect } from "react";
import { parseTimeNum } from "../../utils/Functions";
/* ---------------- styles --------------- */

import { createStyles, makeStyles, Theme } from "@material-ui/core";
interface ClockEclipseProps {
	secondOnly: number;
	duration: number;
	minute: number;
	second: number;
	size?: number;
	strokeColor?: string;
	backgroundColor?: string;
	currentTimer: string;
}
const ClockEclipse: React.FC<ClockEclipseProps> = ({
	secondOnly,
	duration,
	minute,
	second,
	size = 60,
	// strokeColor = "green",
	// backgroundColor = "red",
	currentTimer,
}) => {
	const [timeRing, setTimeRing] = useState(0);
	const makeFill = (theme: Theme) => {
		return currentTimer === "work"
			? theme.palette.secondary.main
			: currentTimer === "short-break"
			? theme.palette.success.main
			: theme.palette.info.main;
	};
	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			"@keyframes smoothDash": {
				from: {
					strokeDashoffset: 0,
				},
				to: {
					strokeDashoffset: `${timeRing}`,
				},
			},
			clockEclipse: {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
			},
			clockEclipse__value: {
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				fontWeight: 700,
				fontFamily: `"Roboto Mono", monospace`,
				fontSize: "clamp(3rem, 15vw, 6rem)",
				color: theme.palette.primary.main,
			},
			clockEclipse__ringBgr: {
				fill: makeFill(theme),
				opacity: 0.5,
				stroke: theme.palette.grey[100],
			},
			clockEclipse__ring: {
				stroke: theme.palette.primary.main,
				strokeLinecap: "round",
				transition: "1000ms stroke-dashoffset linear",
				// the delay is an attempt to achieve
				// smooth circle animation,
				transitionDelay: "110ms",
				// axis compensation
				transform: "rotate(-90deg)",
				transformOrigin: "50% 50%",
			},
		})
	);

	/* ----------- ring properties ----------- */
	// const size = 120;
	const strokeWidth = 12;
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const setStrokeDashOffset = () => {
		const durationInSecond = duration * 60;
		const offset =
			circumference - (secondOnly / durationInSecond) * circumference;
		setTimeRing(offset);
	};

	// const fillColor = {
	// 	imdb: "#F5C518",
	// 	rottenTomatoes: "#FA320A",
	// 	metaCritic: "#66CC33",
	// };
	/* --------------------------------------- */

	useEffect(() => {
		setStrokeDashOffset();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secondOnly]);

	const classes = useStyles();

	return (
		<div className={classes.clockEclipse}>
			<div className={classes.clockEclipse__value}>
				<span>{parseTimeNum(minute)}</span>
				<span>:</span>
				<span>{parseTimeNum(second)}</span>
			</div>

			<svg height={size} width={size}>
				<circle
					className={classes.clockEclipse__ringBgr}
					strokeWidth={strokeWidth}
					// fill={}
					r={radius}
					cx="50%"
					cy="50%"
					style={{ position: "absolute" }}
				/>
				<circle
					className={classes.clockEclipse__ring}
					strokeWidth={strokeWidth}
					fill="none"
					r={radius}
					cx="50%"
					cy="50%"
					strokeDasharray={`${circumference} ${circumference}`}
					style={{ strokeDashoffset: timeRing }}
				/>
			</svg>
		</div>
	);
};

export default ClockEclipse;
