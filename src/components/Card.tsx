"use client";

import React from "react";
import type { Task } from "./types";

interface CardProps {
	task: Task;
	onDragStart: (taskId: string) => void;
}

export default function Card({ task, onDragStart }: CardProps) {
	function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
		e.dataTransfer.setData("text/plain", task.id);
		e.dataTransfer.effectAllowed = "move";
		onDragStart(task.id);
	}

	return (
		<div
			draggable
			onDragStart={handleDragStart}
			className="rounded-md bg-white shadow hover:shadow-md transition-shadow border border-gray-200 p-3 cursor-move select-none"
			aria-grabbed="true"
		>
			<p className="text-sm text-gray-800">{task.title}</p>
		</div>
	);
}


