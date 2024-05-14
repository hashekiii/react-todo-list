import PropTypes from "prop-types";

const EditModal = ({
	isOpen,
	closeModal,
	editingTaskContent,
	editingTaskScore,
	handleEditTaskInput,
	handleEditScoreInput,
	saveEditChanges,
}) => {
	return (
		<>
			{isOpen && (
				<div
					className={`modal fade ${isOpen ? "show" : ""}`}
					style={{ display: isOpen ? "block" : "none" }}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="editTaskModalLabel"
					aria-hidden="true"
				>
					<div
						className="modal-dialog modal-dialog-centered text-dark"
						role="document"
					>
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="editTaskModalLabel">
									Edit Task
								</h1>
								<button
									type="button"
									className="btn-close"
									onClick={closeModal}
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
								<form action="">
									<div className="row align-items-center mb-3">
										<div className="col-md-3 col-sm-4 form-label">Task</div>
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
										<div className="col-md-3 col-sm-4 form-label">Score</div>
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
									onClick={closeModal}
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
		</>
	);
};

EditModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	editingTaskContent: PropTypes.string.isRequired,
	editingTaskScore: PropTypes.number.isRequired,
	handleEditTaskInput: PropTypes.func.isRequired,
	handleEditScoreInput: PropTypes.func.isRequired,
	saveEditChanges: PropTypes.func.isRequired,
};

export default EditModal;
