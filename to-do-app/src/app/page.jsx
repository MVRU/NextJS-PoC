"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./header/page";

export default function Home() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [showCompleted, setShowCompleted] = useState(false);

	const handleAddTask = () => {
		if (newTask.trim() !== "") {
			setTasks([...tasks, { name: newTask, completed: false }]);
			setNewTask("");
		}
	};

	const handleDeleteTask = (index) => {
		if (!tasks[index].completed) {
			const updatedTasks = [...tasks];
			updatedTasks.splice(index, 1);
			setTasks(updatedTasks);
		}
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

	const handleToggleComplete = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks[index].completed = !updatedTasks[index].completed;
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
						className="mr-2 p-2 border text-black rounded-lg"
					/>
					<button
						onClick={handleAddTask}
						className="p-2 px-4 bg-blue-500 text-white rounded-lg"
					>
						Agregar Tarea
					</button>
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
												moveTask(index, "up")
											}
											className="text-white mr-2"
										>
											▲
										</button>
										<button
											onClick={() =>
												moveTask(index, "down")
											}
											className="text-white"
										>
											▼
										</button>
										<button
											onClick={() =>
												handleDeleteTask(index)
											}
											className="text-red-500 ml-2"
											disabled={task.completed}
										>
											Eliminar
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
							? "Ocultar Tareas Completadas"
							: "Mostrar Tareas Completadas"}
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
								</li>
							))}
						</ul>
					)}
				</div>
			</main>
		</div>
	);
}
