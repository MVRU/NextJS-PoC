"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./header/page";
import { Trash2, Edit2 } from "feather-icons-react";

export default function Home() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [showCompleted, setShowCompleted] = useState(false);

	useEffect(() => {
		try {
			const storedTasks = localStorage.getItem("tasks");
			if (storedTasks) {
				setTasks(JSON.parse(storedTasks));
			}
		} catch (error) {
			console.error("Error fetching tasks from localStorage: ", error);
		}
	}, []);

	const updateLocalStorageTasks = (updatedTasks) => {
		try {
			localStorage.setItem("tasks", JSON.stringify(updatedTasks));
		} catch (error) {
			console.error("Error saving tasks to localStorage: ", error);
		}
	};

	const handleAddTask = () => {
		if (newTask.trim() !== "") {
			const updatedTasks = [
				...tasks,
				{ name: newTask, completed: false },
			];
			setTasks(updatedTasks);
			updateLocalStorageTasks(updatedTasks);
			setNewTask("");
		}
	};

	const handleDeleteTask = (index) => {
		const updatedTasks = tasks.filter((_, i) => i !== index);
		setTasks(updatedTasks);
		updateLocalStorageTasks(updatedTasks);
	};

	const handleToggleComplete = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks[index].completed = !updatedTasks[index].completed;
		setTasks(updatedTasks);
		updateLocalStorageTasks(updatedTasks);
	};

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
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const [showModal, setShowModal] = useState(false);

	const handleKeyDown = (e) => {
		if (e.ctrlKey && e.key === "Delete") {
			setShowModal(true);
		}
		if (showModal) {
			const modalButtons = document.querySelectorAll(
				".modal-content button"
			);
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
					setShowModal(false);
				}
			}
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [showModal]);

	const handleEmptyTasks = () => {
		setShowModal(true);
	};

	const handleConfirmEmptyTasks = () => {
		setTasks([]);
		updateLocalStorageTasks([]);
		setShowModal(false);
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

	const completedTasks = tasks.filter((task) => task.completed);

	return (
		<div>
			<Head>
				<title>Lista de Tareas</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<main className="container mx-auto mt-5">
				<h1 className="text-4xl font-bold mb-4">Lista de Tareas</h1>

				<div className="mb-4 flex">
					<input
						type="text"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						onKeyPress={handleKeyPress}
						className="mr-2 p-2 px-4 border text-black rounded-lg"
					/>
					<button
						onClick={handleAddTask}
						className="p-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
					>
						Agregar Tarea
					</button>
					<button
						onClick={handleEmptyTasks}
						className="bg-red-500 text-white p-2 ml-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
					>
						Vaciar
					</button>
					{/* Modal */}
					{showModal && (
						<div className="modal ml-6 bg-gray-800 px-4 rounded-lg">
							<div className="modal-content">
								<p className="font-bold">
									¿Desea borrar todas las tareas?
								</p>
								<button
									onClick={handleConfirmEmptyTasks}
									className=" text-white mr-2 hover:text-red-500 focus:text-red-500 transition duration-300 ease-in-out"
								>
									Borrar
								</button>
								<button
									onClick={handleCancelEmptyTasks}
									className=" text-white hover:text-gray-400 focus:text-gray-400 transition duration-300 ease-in-out"
								>
									Cancelar
								</button>
							</div>
						</div>
					)}
				</div>

				<ul>
					{tasks.map(
						(task, index) =>
							!task.completed && (
								<li
									key={index}
									className="bg-gray-800 p-2 mb-2 flex justify-between items-center rounded-lg"
								>
									<div>
										<input
											type="checkbox"
											checked={task.completed}
											onChange={() =>
												handleToggleComplete(index)
											}
											className="mr-2"
										/>
										<span
											className={
												task.completed
													? "line-through"
													: ""
											}
										>
											{task.name}
										</span>
									</div>
									<div>
										<button
											onClick={() =>
												handleRenameTask(
													index,
													prompt(
														"Ingrese el nuevo nombre de la tarea",
														task.name
													)
												)
											}
											className="text-blue-500 mr-2"
										>
											<Edit2 size={18} />
										</button>
										<button
											onClick={() =>
												moveTask(index, "up")
											}
											className="text-white mr-2"
										>
											↑
										</button>
										<button
											onClick={() =>
												moveTask(index, "down")
											}
											className="text-white"
										>
											↓
										</button>
										<button
											onClick={() =>
												handleDeleteTask(index)
											}
											className="text-red-500 ml-2"
											disabled={task.completed}
										>
											<Trash2 size={18} />
										</button>
									</div>
								</li>
							)
					)}
				</ul>

				<div className="mt-4">
					<button
						onClick={() => setShowCompleted(!showCompleted)}
						className="bg-gray-800 text-white p-2 rounded-lg"
					>
						{showCompleted
							? "🔼 Ocultar Tareas Completadas"
							: "🔽 Mostrar Tareas Completadas"}
					</button>
					{showCompleted && (
						<ul className="mt-4">
							{completedTasks.map((task, index) => (
								<li
									key={index}
									className="bg-gray-500 p-2 mb-2 flex justify-between items-center rounded-lg"
								>
									<div>
										<span className="line-through">
											{task.name}
										</span>
									</div>
									<div>
										<button
											onClick={() =>
												handleDeleteTask(index)
											}
											className="text-red-700"
										>
											<Trash2 size={18} />
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</main>
		</div>
	);
}
