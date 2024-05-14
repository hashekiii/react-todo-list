import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const TaskList = ({
	tasks,
	setTasks,
	handleTaskCompletion,
	formattedProgressRatio,
}) => {
	const [editingTaskContent, setEditingTaskContent] = useState("");
	const [editingTaskScore, setEditingTaskScore] = useState(0);
	const [editingTaskIndex, setEditingTaskIndex] = useState(null);
	const [isEditModalOpen, setisEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

	function editTask(task, index) {
		setisEditModalOpen(true);
		console.log("opened: " + task.name + " " + task.score + " " + index);
		setEditingTaskContent(task.name);
		setEditingTaskScore(task.score);
		setEditingTaskIndex(index);
	}
	const handleEditTaskInput = (e) => {
		setEditingTaskContent(e.target.value);
	};

	const handleEditScoreInput = (e) => {
		setEditingTaskScore(Number(e.target.value));
	};
	const closeEditModal = () => {
		setisEditModalOpen(false);
	};
	const saveEditChanges = () => {
		if (editingTaskContent.trim() !== "" && editingTaskScore !== 0) {
			setTasks((prevTasks) =>
				prevTasks.map((task, index) =>
					index === editingTaskIndex
						? { ...task, name: editingTaskContent, score: editingTaskScore }
						: task,
				),
			);
			setisEditModalOpen(false);
		} else {
			alert("Task content and score cannot be empty!");
		}
	};
	const openDeleteModal = (index) => {
		setEditingTaskIndex(index);
		setEditingTaskContent(tasks[index].name);
		setisDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setisDeleteModalOpen(false);
	};
	function deleteTask(index) {
		setTasks((t) => t.filter((_, i) => i !== index));
		setisDeleteModalOpen(false);
	}

	return (
		<div>
			{tasks.length !== 0 && (
				<ProgressBar formattedProgressRatio={formattedProgressRatio} />
			)}

			<ul className="list-group list-group-flush shadow-sm shadow-lg ">
				{tasks.length === 0 && (
					<li className="list-group-item text-center text-muted">
						No Tasks to show
					</li>
				)}
				{tasks.map((task, index) => (
					<li
						key={index}
						className={`list-group-item d-flex justify-content-between align-items-center list-group-item-light mb-3`}
					>
						<input
							type="checkbox"
							className="form-check-input me-1 "
							id={"task-checkbox-${index}"}
							checked={task.completed}
							onChange={() => handleTaskCompletion(index)}
						/>
						<label className="form-check-label">{task.name}</label>
						<span className="badge bg-secondary rounded-pill">
							{task.score}
						</span>
						<div className="btn-group" role="group">
							<button
								className="btn btn-sm btn-outline-secondary"
								type="button"
								id="editButton"
								data-bs-toggle="modal"
								data-bs-target="#editTaskModal"
								onClick={() => editTask(task, index)}
							>
								<i className="bi bi-pencil-square"></i>
							</button>
							<button
								className="btn btn-sm btn-outline-danger"
								type="button"
								onClick={() => openDeleteModal(index)}
							>
								<i className="bi bi-trash	"></i>
							</button>
						</div>
					</li>
				))}
			</ul>
			<EditModal
				isOpen={isEditModalOpen}
				closeModal={closeEditModal}
				editingTaskContent={editingTaskContent}
				editingTaskScore={editingTaskScore}
				handleEditTaskInput={handleEditTaskInput}
				handleEditScoreInput={handleEditScoreInput}
				saveEditChanges={saveEditChanges}
			/>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				closeModal={closeDeleteModal}
				editingTaskContent={editingTaskContent}
				deleteTask={() => deleteTask(editingTaskIndex)}
			/>
		</div>
	);
};

TaskList.propTypes = {
	tasks: PropTypes.array.isRequired,
	setTasks: PropTypes.func.isRequired,
	handleTaskCompletion: PropTypes.func.isRequired,
	formattedProgressRatio: PropTypes.number.isRequired,
};
export default TaskList;
