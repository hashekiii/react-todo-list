import PropTypes from "prop-types";

const DeleteModal = ({
	isOpen,
	closeModal,
	editingTaskContent,
	deleteTask,
}) => {
	return (
		<>
			{isOpen && (
				<div
					className={`modal fade ${isOpen ? "show" : ""}`}
					style={{ display: isOpen ? "block" : "none" }}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="deleteTaskModalLabel"
					aria-hidden="true"
				>
					<div
						className="modal-dialog modal-dialog-centered text-dark"
						role="document"
					>
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="deleteTaskModalLabel">
									Remove Task
								</h1>
								<button
									type="button"
									className="btn-close"
									onClick={closeModal}
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
									onClick={closeModal}
								>
									Close
								</button>
								<button
									type="button"
									className="btn  btn-outline-danger"
									onClick={deleteTask}
								>
									Delete Task
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

DeleteModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	editingTaskContent: PropTypes.string.isRequired,
	deleteTask: PropTypes.func.isRequired,
};

export default DeleteModal;
