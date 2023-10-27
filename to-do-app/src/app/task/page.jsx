"use client";

import React, { useState, useRef, useCallback } from "react";
import { Trash2, Edit2 } from "feather-icons-react";
import {
	handleDeleteWithAnimation,
	handleKeyDown,
	handleRename,
} from "./utils";

const Task = ({
	task,
	index,
	handleToggleComplete,
	handleRenameTask,
	moveTask,
	handleDeleteTask,
}) => {
	const [highlight, setHighlight] = useState(false);
	const checkboxRef = useRef(null);

	return (
		<li
			id={`task-${index}`}
			className={`p-2 mb-2 flex justify-between items-center rounded-lg transition-all duration-500 ${
				task.completed
					? "bg-gray-950"
					: highlight
					? "bg-red-500"
					: "bg-gray-800"
			}`}
		>
			<div>
				<input
					type="checkbox"
					ref={checkboxRef}
					checked={task.completed}
					onClick={() =>
						handleDeleteWithAnimation(
							index,
							setHighlight,
							handleDeleteTask
						)
					}
					onChange={() => handleToggleComplete(index)}
					onKeyDown={(e) =>
						handleKeyDown(e, handleToggleComplete, index)
					}
					className="mr-2"
				/>
				<span className={task.completed ? "line-through" : ""}>
					{task.name}
				</span>
			</div>
			<div>
				<button
					onClick={() =>
						handleRename(
							index,
							handleRenameTask,
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
					onClick={() => moveTask(index, "up")}
					className="text-white mr-2"
				>
					↑
				</button>
				<button
					onClick={() => moveTask(index, "down")}
					className="text-white mr-2"
				>
					↓
				</button>
				<button
					onClick={() =>
						handleDeleteWithAnimation(
							index,
							setHighlight,
							handleDeleteTask
						)
					}
					className="text-red-500 ml-2"
					disabled={task.completed}
				>
					<Trash2 size={18} />
				</button>
			</div>
		</li>
	);
};

export default Task;
