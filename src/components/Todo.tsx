"use client";

import React from "react";
import Column from "./Column";
import type { Task, TaskStatus } from "./types";

interface Props {
	tasks: Task[];
	onDropTask: (taskId: string, newStatus: TaskStatus) => void;
	onCardDragStart?: (taskId: string) => void;
}

export function Todo({ tasks, onDropTask, onCardDragStart }: Props) {
	return (
		<Column
			title="Todo"
			status="todo"
			tasks={tasks}
			onDropTask={onDropTask}
			onCardDragStart={onCardDragStart}
		/>
	);
}


