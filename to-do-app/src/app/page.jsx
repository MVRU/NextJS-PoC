"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Trash2, Edit2 } from "feather-icons-react";
import Head from "next/head";
import Header from "./header/page";
import Modal from "./modal/page";
import TaskList from "./tasklist/page";
import {
	updateLocalStorageTasks,
	handleKeyDown,
	handleEmptyTasks,
	handleConfirmEmptyTasks,
} from "./utils";

export default function Home() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	useEffect(() => {
		try {
			const storedTasks = localStorage.getItem("tasks");
			if (storedTasks) {
				setTasks(JSON.parse(storedTasks));
			}
		} catch (error) {
			console.error("Error al recuperar tareas de localStorage: ", error);
		}
	}, []);

	const handleAddTask = useCallback(() => {
		if (newTask.trim() !== "") {
			const updatedTasks = [
				...tasks,
				{ name: newTask, completed: false },
			];
			setTasks(updatedTasks);
			updateLocalStorageTasks(updatedTasks);
			setNewTask("");
		}
	}, [newTask, tasks]);

	const handleDeleteTask = useCallback(
		(index) => {
			const updatedTasks = tasks.filter(
				(_, i) => i !== index && !tasks[i].completed !== undefined
			);
			setTasks(updatedTasks);
			updateLocalStorageTasks(updatedTasks);
		},
		[tasks]
	);

	const handleToggleComplete = useCallback(
		(index) => {
			const updatedTasks = [...tasks];
			if (updatedTasks[index]?.completed !== undefined) {
				updatedTasks[index].completed = true;
				setTimeout(() => {
					const tasksAfterDelay = updatedTasks.filter(
						(_, i) => i !== index
					);
					setTasks(tasksAfterDelay);
					updateLocalStorageTasks(tasksAfterDelay);
				}, 1000);
			}
		},
		[tasks]
	);

	const handleRenameTask = (index, newName) => {
		if (newName !== null) {
			const updatedTasks = [...tasks];
			updatedTasks[index].name = newName;
			setTasks(updatedTasks);
			updateLocalStorageTasks(updatedTasks);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleAddTask();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", (e) =>
			handleKeyDown(e, setShowModal, handleEmptyTasks)
		);
		return () => {
			window.removeEventListener("keydown", (e) =>
				handleKeyDown(e, setShowModal, handleEmptyTasks)
			);
		};
	}, []);

	const [showModal, setShowModal] = useState(false);

	const handleEmptyTasks = () => {
		setShowModal(true);
	};

	const handleCancelEmptyTasks = () => {
		setShowModal(false);
	};

	const moveTask = (index, direction) => {
		const updatedTasks = [...tasks];
		const temp = updatedTasks[index];
		if (direction === "up" && index > 0) {
			updatedTasks[index] = updatedTasks[index - 1];
			updatedTasks[index - 1] = temp;
		} else if (direction === "down" && index < updatedTasks.length - 1) {
			updatedTasks[index] = updatedTasks[index + 1];
			updatedTasks[index + 1] = temp;
		}
		setTasks(updatedTasks);
	};

	return (
		<div>
			<Head>
				<title>Lista de Tareas</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<div className="mobile-container">
				<main className="container mx-auto mt-5">
					<h1 className="text-4xl font-bold mb-4">Lista de Tareas</h1>

					<div className="mb-4 flex ">
						<input
							type="text"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
							onKeyPress={handleKeyPress}
							className="mr-2 p-0.5 md:p-2 md:px-4 border text-black rounded-lg"
						/>
						<button
							onClick={handleAddTask}
							className="md:p-2 md:px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out text-sm"
						>
							Agregar Tarea
						</button>
						<button
							onClick={handleEmptyTasks}
							className="bg-red-500 text-white md:p-2 ml-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out text-sm"
						>
							Vaciar
						</button>
						<Modal
							showModal={showModal}
							handleConfirmEmptyTasks={() =>
								handleConfirmEmptyTasks(
									setTasks,
									updateLocalStorageTasks,
									setShowModal
								)
							}
							handleCancelEmptyTasks={handleCancelEmptyTasks}
						/>
					</div>

					<TaskList
						tasks={tasks}
						handleToggleComplete={handleToggleComplete}
						handleRenameTask={handleRenameTask}
						moveTask={moveTask}
						handleDeleteTask={handleDeleteTask}
					/>
				</main>
			</div>
		</div>
	);
}
