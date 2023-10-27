import React from "react";
import Task from "../task/page";

const TaskList = ({
	tasks,
	handleToggleComplete,
	handleRenameTask,
	moveTask,
	handleDeleteTask,
}) => {
	return (
		<ul>
			{tasks.map((task, index) => (
				<Task
					key={index}
					task={task}
					index={index}
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
