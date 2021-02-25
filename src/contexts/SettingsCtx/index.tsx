import React, { createContext, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
// import { settingsReducer } from "../../reducers/settingsReducer";

interface SettingsCtxProps {
	timerSettings: SettingsProps;
	// dispatch(action: any): void;
	updateSettings(newSettings: SettingsProps): void;
	isUpdating: boolean;
	toggleUpdating(isUpdating: boolean): void;
}

export interface SettingsProps {
	focusDuration: number;
	focusInterval: number;
	shortBreakDuration: number;
	longBreakDuration: number;
}
/* export interface SettingsProps {
	[key: string]: number;
} */

export const SettingsCtx = createContext({} as SettingsCtxProps);

export const SettingsProvider: React.FC = ({ children }) => {
	/* 	const [timerSettings, dispatch] = useReducer(settingsReducer, {
		focusDuration: 25,
		focusInterval: 4,
		longBreakDuration: 15,
		shortBreakDuration: 5,
	}); */
	const SETTINGS_DEFAULT = {
		focusDuration: 25,
		focusInterval: 4,
		longBreakDuration: 15,
		shortBreakDuration: 5,
	};

	const [timerSettings, setSettings] = useLocalStorage(
		"settings",
		SETTINGS_DEFAULT
	);
	const [isUpdating, setUpdating] = useState(true);
	//METHODS
	const checkSettingsChanged = (updates: any) => {
		// const currSetingsKeys = Object.keys(timerSettings);
		// const updatesKeys = Object.keys(updates);
		let k: keyof typeof timerSettings;
		for (k in timerSettings) {
			if (timerSettings[k] !== updates[k]) return true;
		}
		return false;
	};
	const updateSettings = (updates: SettingsProps) => {
		const hasChanged = checkSettingsChanged(updates);
		if (hasChanged) {
			setSettings(updates);
			localStorage.setItem("settings", JSON.stringify(updates));
			setUpdating(false);
			// console.log("Change detected");
		} else {
			return;
		}
	};

	const toggleUpdating = (isUpdating: boolean) => {
		setUpdating(isUpdating);
	};

	const value = {
		timerSettings,
		updateSettings,
		toggleUpdating,
		isUpdating,
	};
	return <SettingsCtx.Provider value={value}>{children}</SettingsCtx.Provider>;
};
