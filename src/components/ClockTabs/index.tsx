// import React from 'react'

import LongBreakClock from "../LongBreakClock";
import ShorkBreakClock from "../ShortBreakClock";
import WorkClock from "../WorkClock";

const ClockTabs: React.FC = () => {
	return (
		<div>
			<h1>Clocks will be put here</h1>
			<WorkClock />
			<ShorkBreakClock />
			<LongBreakClock />
		</div>
	);
};

export default ClockTabs;
