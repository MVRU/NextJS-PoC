import { useCallback } from "react";

export const handleDeleteWithAnimation = (
	index,
	setHighlight,
	handleDeleteTask
) => {
	setHighlight(true);
	setTimeout(() => {
		handleDeleteTask(index);
		setTimeout(() => {
			setHighlight(false);
		}, 50);
	}, 500);
};

export const handleKeyDown = (e, handleToggleComplete, index) => {
	if (e.key === "Enter") {
		handleToggleComplete(index);
	}
};

export const handleRename = (index, handleRenameTask, newName) => {
	if (newName !== null) {
		handleRenameTask(index, newName);
	}
};
