import { SettingsProps } from "../../contexts/SettingsCtx";

interface ActionProps {
	type: string;
	payload: number;
}

const SETTINGS_ACTIONS = {
	SET_FOCUS_DURATION: "SET_FOCUS_DURATION",
	SET_FOCUS_INTERVAL: "SET_FOCUS_INTERVAL",
	SET_SHORTBREAK_DURATION: "SET_SHORTBREAK_DURATION",
	SET_LONGBREAK_DURATION: "SET_LONGBREAK_DURATION",
};

export const settingsReducer = ( state: SettingsProps, action: ActionProps ) => {
	switch ( action.type ) {
		case SETTINGS_ACTIONS.SET_FOCUS_DURATION:
			return { ...state, state: action.payload }

		default:
			return state;
	}
};
