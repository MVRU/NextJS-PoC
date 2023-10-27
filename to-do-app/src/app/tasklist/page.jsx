import React from "react";
import Task from "../task/page";

const TaskList = ({
	tasks,
	handleToggleComplete,
	handleRenameTask,
	moveTask,
	handleDeleteTask,
}) => {
	if (!tasks || tasks.length === 0) {
		return <div>No hay tareas</div>;
	}

	return (
		<ul>
			{tasks.map((task, index) => (
				<Task
					key={index}
					index={index}
					task={task}
					handleToggleComplete={handleToggleComplete}
					handleRenameTask={handleRenameTask}
					moveTask={moveTask}
					handleDeleteTask={handleDeleteTask}
				/>
			))}
		</ul>
	);
};

export default TaskList;
