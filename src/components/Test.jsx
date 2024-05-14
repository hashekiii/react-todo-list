import { useState } from "react";

const Test = () => {
	const [taskContent, setTaskContent] = useState("");
	const [taskScore, setTaskScore] = useState(0);
	const [tasks, setTasks] = useState([]);
	const [editingTaskContent, setEditingTaskContent] = useState(null);
	const [editingTaskScore, setEditingTaskScore] = useState(null);
	const [editingTaskIndex, setEditingTaskIndex] = useState(null);

	const handleTaskInput = (e) => {
		setTaskContent(e.target.value);
	};

	const handleScoreInput = (e) => {
		setTaskScore(Number(e.target.value));
	};

	function addTask() {
		setTasks((t) => [...t, { name: taskContent, score: Number(taskScore) }]);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (taskContent.trim() !== "" && taskScore !== 0) {
			addTask();
			setTaskContent("");
			setTaskScore("");
			console.log({ taskContent, taskScore });
		} else {
			alert("Task content and score cannot be empty!");
		}
	};

	const handleTaskCompletion = (index) => {
		setTasks((prevTasks) =>
			prevTasks.map((t, i) =>
				i === index ? { ...t, completed: !t.completed } : t,
			),
		);
	};

	function deleteTask(index) {
		setTasks((t) => t.filter((_, i) => i !== index));
		setisDeleteModalOpen(false);
	}

	const totalScoreAchieved = tasks.reduce((total, task) => {
		if (task.completed) {
			return total + task.score;
		}
		return total;
	}, 0);

	// Calculate the total task score
	const totalTaskScore = tasks.reduce((total, task) => total + task.score, 0);

	// Calculate the progress ratio
	const progressRatio = (totalScoreAchieved / totalTaskScore) * 100;

	// Format the progress ratio to two decimal places
	const formattedProgressRatio = progressRatio.toFixed(2);

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

	const openDeleteModal = (index) => {
		setEditingTaskIndex(index);
		setEditingTaskContent(tasks[index].name);
		setisDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setisDeleteModalOpen(false);
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

	return (
		<>
			<div className="container text-center mt-5">
				<div className="row ">
					<div className="col col-md-6 col-sm-12 mb-3 col-lg-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title mb-4">Add New Task</h5>
								<form action="">
									<div className="row align-items-center mb-3">
										<div className="col-md-3 col-sm-4 form-label">Task</div>
										<div className="col-md-8 col-sm-7">
											<input
												type="text"
												className="form-control mx-2"
												placeholder="Enter Task"
												value={taskContent}
												id="taskInput"
												onChange={handleTaskInput}
											/>
										</div>
									</div>
									<div className="row align-items-center mb-3">
										<div className="col-md-3 col-sm-4 form-label">Score</div>
										<div className="col-md-8 col-sm-7">
											<input
												type="number"
												className="form-control mx-2"
												placeholder="Enter Score"
												value={taskScore}
												id="scoreInput"
												onChange={handleScoreInput}
											/>
										</div>
									</div>
									<button
										className="btn btn-success "
										onClick={handleSubmit}
										type="submit"
									>
										Add Task
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className="col col-md-6 col-sm-12 col-lg-8">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title ">Todo List</h5>

								{/* Progress Bar */}
								{tasks.length !== 0 && (
									<div
										className="progress"
										role="progressbar"
										aria-valuenow={formattedProgressRatio}
										aria-valuemin="0"
										aria-valuemax="100"
									>
										<div
											className="progress-bar bg-success"
											style={{ width: `${formattedProgressRatio}%` }}
										>
											<p className="text-center mb-0">
												{formattedProgressRatio}%
											</p>
										</div>
									</div>
								)}

								{/* Task List  */}
								<ul className="list-group list-group-flush shadow-sm shadow-lg ">
									{tasks.length === 0 && (
										<li className="list-group-item text-center text-muted">
											No Tasks to show
										</li>
									)}
									{tasks.map((task, index) => (
										<li
											key={index}
											className="list-group-item d-flex justify-content-between align-items-center "
										>
											<input
												type="checkbox"
												className="form-check-input me-1 "
												id={"task-checkbox-${index}"}
												checked={task.completed}
												onChange={() => handleTaskCompletion(index)}
											/>
											<label className="form-check-label">{task.name}</label>
											<span className="badge bg-primary rounded-pill">
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

								{/* Edit Task Modal */}
								{isEditModalOpen && (
									<div
										className={`modal fade ${isEditModalOpen ? "show" : ""}`}
										style={{ display: isEditModalOpen ? "block" : "none" }}
										tabIndex="-1"
										role="dialog"
										aria-labelledby="editTaskModalLabel"
										aria-hidden="true"
									>
										<div
											className="modal-dialog modal-dialog-centered"
											role="document"
										>
											<div className="modal-content">
												<div className="modal-header">
													<h1
														className="modal-title fs-5"
														id="editTaskModalLabel"
													>
														Edit Task
													</h1>
													<button
														type="button"
														className="btn-close"
														onClick={closeEditModal}
														aria-label="Close"
													></button>
												</div>
												<div className="modal-body">
													<form action="">
														<div className="row align-items-center mb-3">
															<div className="col-md-3 col-sm-4 form-label">
																Task
															</div>
															<div className="col-md-8 col-sm-7">
																<input
																	type="text"
																	className="form-control mx-2"
																	placeholder="Edit Task"
																	value={editingTaskContent}
																	id="taskInput"
																	onChange={handleEditTaskInput}
																/>
															</div>
														</div>
														<div className="row align-items-center mb-3">
															<div className="col-md-3 col-sm-4 form-label">
																Score
															</div>
															<div className="col-md-8 col-sm-7">
																<input
																	type="number"
																	className="form-control mx-2"
																	placeholder="Enter Score"
																	value={editingTaskScore}
																	id="scoreInput"
																	onChange={handleEditScoreInput}
																/>
															</div>
														</div>
													</form>
												</div>
												<div className="modal-footer">
													<button
														type="button"
														className="btn btn-secondary"
														onClick={closeEditModal}
													>
														Close
													</button>
													<button
														type="button"
														className="btn btn-primary"
														onClick={saveEditChanges}
													>
														Save changes
													</button>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Delete Task Modal */}
								{isDeleteModalOpen && (
									<div
										className={`modal fade ${isDeleteModalOpen ? "show" : ""}`}
										style={{ display: isDeleteModalOpen ? "block" : "none" }}
										tabIndex="-1"
										role="dialog"
										aria-labelledby="deleteTaskModalLabel"
										aria-hidden="true"
									>
										<div
											className="modal-dialog modal-dialog-centered"
											role="document"
										>
											<div className="modal-content">
												<div className="modal-header">
													<h1
														className="modal-title fs-5"
														id="deleteTaskModalLabel"
													>
														Remove Task
													</h1>
													<button
														type="button"
														className="btn-close"
														onClick={closeEditModal}
														aria-label="Close"
													></button>
												</div>
												<div className="modal-body">
													<h5>
														Are you sure you want to remove task:{" "}
														<strong>{editingTaskContent}</strong> ?
													</h5>
												</div>
												<div className="modal-footer">
													<button
														type="button"
														className="btn btn-secondary"
														onClick={closeDeleteModal}
													>
														Close
													</button>
													<button
														type="button"
														className="btn  btn-outline-danger"
														onClick={() => deleteTask(editingTaskIndex)}
													>
														Delete Task
													</button>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Test;
