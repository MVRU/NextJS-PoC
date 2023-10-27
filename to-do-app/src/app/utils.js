export const updateLocalStorageTasks = (updatedTasks) => {
	try {
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	} catch (error) {
		console.error(
			"Error al guardar las tareas en el localStorage: ",
			error
		);
	}
};

export const handleKeyDown = (e, showModal, handleEmptyTasks) => {
	if (e.ctrlKey && e.key === "Delete") {
		showModal(true);
	}
	if (showModal) {
		const modalButtons = document.querySelectorAll(".modal-content button");
		if (e.key === "ArrowLeft") {
			modalButtons[0].focus();
		}
		if (e.key === "ArrowRight") {
			modalButtons[1].focus();
		}
		if (e.key === "Enter") {
			if (document.activeElement === modalButtons[0]) {
				handleEmptyTasks();
			}
			if (document.activeElement === modalButtons[1]) {
				showModal(false);
			}
		}
	}
};

export const handleEmptyTasks = (setShowModal) => {
	setShowModal(true);
};

export const handleConfirmEmptyTasks = (
	setTasks,
	updateLocalStorageTasks,
	setShowModal
) => {
	setTasks([]);
	updateLocalStorageTasks([]);
	setShowModal(false);
};
