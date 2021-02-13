import React, { useState, useEffect } from "react";
import { parseTimeNum } from "../../utils/Functions";
import { createStyles, makeStyles } from "@material-ui/core";

interface ClockEclipseProps {
	secondOnly: number;
	duration: number;
	minute: number;
	second: number;
	size?: number;
	strokeColor?: string;
	backgroundColor?: string;
}

const ClockEclipse: React.FC<ClockEclipseProps> = ({
	secondOnly,
	duration,
	minute,
	second,
	size = 60,
	strokeColor = "green",
	backgroundColor = "red",
}) => {
	const [timeRing, setTimeRing] = useState(0);

	const useStyles = makeStyles(() =>
		createStyles({
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
				color: "#fafafa",
			},
			clockEclipse__ring: {
				stroke: `${strokeColor}`,
				strokeLinecap: "round",
				transition: "100ms stroke-dashoffset ease-out",
				// axis compensation
				transform: "rotate(-90deg)",
				transformOrigin: "50% 50%",
			},
		})
	);

	/* ----------- ring properties ----------- */
	// const size = 120;
	const cx = size / 2;
	const cy = size / 2;
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

			<svg className="clockEclipse" height={size} width={size}>
				<circle
					stroke="#c4c4c4"
					strokeWidth={strokeWidth}
					fill={backgroundColor}
					r={radius}
					cx={cx}
					cy={cy}
					style={{ position: "absolute" }}
				/>
				<circle
					className={classes.clockEclipse__ring}
					strokeWidth={strokeWidth}
					fill="none"
					r={radius}
					cx={cx}
					cy={cy}
					strokeDasharray={`${circumference} ${circumference}`}
					style={{ strokeDashoffset: timeRing }}
				/>
			</svg>
		</div>
	);
};

export default ClockEclipse;
