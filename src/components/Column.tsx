"use client";

import React from "react";
import Card from "./Card";
import type { Task, TaskStatus } from "./types";

interface ColumnProps {
	title: string;
	status: TaskStatus;
	tasks: Task[];
	onDropTask: (taskId: string, newStatus: TaskStatus) => void;
	onCardDragStart?: (taskId: string) => void;
}

export default function Column({ title, status, tasks, onDropTask, onCardDragStart }: ColumnProps) {
	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}

	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		const taskId = e.dataTransfer.getData("text/plain");
		if (taskId) {
			onDropTask(taskId, status);
		}
	}

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<h2 className="text-sm font-semibold text-gray-700">{title}</h2>
				<span className="text-xs text-gray-500">{tasks.length}</span>
			</div>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className="max-h-[250px] h-[250px] overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 flex flex-col gap-3"
			>
				{tasks.map((task) => (
					<Card key={task.id} task={task} onDragStart={onCardDragStart ?? (() => {})} />
				))}
				{tasks.length === 0 && (
					<div className="text-xs text-gray-400 text-center py-6">Drop here</div>
				)}
			</div>
		</div>
	);
}


