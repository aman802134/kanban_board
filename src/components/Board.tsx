"use client";

import React from "react";
import { Todo } from "./Todo";
import { InProgress } from "./InProgress";
import { Done } from "./Done";
import type { Task, TaskStatus } from "./types";

function generateId() {
	return Math.random().toString(36).slice(2, 9);
}

const initialTasks: Task[] = [
	{ id: generateId(), title: "Set up project", status: "todo" },
	{ id: generateId(), title: "Create components", status: "inProgress" },
	{ id: generateId(), title: "Write documentation", status: "done" },
];

export default function Board() {
	const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
	const [draggingTaskId, setDraggingTaskId] = React.useState<string | null>(null);

	function moveTask(taskId: string, newStatus: TaskStatus) {
		setTasks((prev) =>
			prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
		);
		setDraggingTaskId(null);
	}

	const tasksByStatus = React.useMemo(() => {
		return {
			todo: tasks.filter((t) => t.status === "todo"),
			inProgress: tasks.filter((t) => t.status === "inProgress"),
			done: tasks.filter((t) => t.status === "done"),
		};
	}, [tasks]);

	function handleCardDragStart(taskId: string) {
		setDraggingTaskId(taskId);
	}

	return (
		<div className="mx-auto max-w-6xl p-4">
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-xl font-bold text-gray-800">Kanban Board</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const form = e.currentTarget as HTMLFormElement;
						const input = form.elements.namedItem("title") as HTMLInputElement;
						const title = input.value.trim();
						if (!title) return;
						setTasks((prev) => [
							{ id: generateId(), title, status: "todo" },
							...prev,
						]);
						input.value = "";
					}}
					className="flex gap-2"
				>
					<input
						name="title"
						placeholder="Add new task..."
						className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-400 focus:outline-none"
					/>
					<button
						type="submit"
						className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black/90"
					>
						Add
					</button>
				</form>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Todo tasks={tasksByStatus.todo} onDropTask={moveTask} onCardDragStart={handleCardDragStart} />
				<InProgress tasks={tasksByStatus.inProgress} onDropTask={moveTask} onCardDragStart={handleCardDragStart} />
				<Done tasks={tasksByStatus.done} onDropTask={moveTask} onCardDragStart={handleCardDragStart} />
			</div>

			{draggingTaskId && (
				<div className="fixed bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs text-white">
					Dragging: {draggingTaskId}
				</div>
			)}
		</div>
	);
}


