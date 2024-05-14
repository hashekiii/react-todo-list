import PropTypes from "prop-types";

const TaskForm = ({
	taskContent,
	taskScore,
	handleTaskInput,
	handleScoreInput,
	handleSubmit,
}) => {
	return (
		<>
			<form action="">
				<div className="row align-items-center mb-3">
					<div className="col-md-3 col-sm-4 form-label">Task</div>
					<div className="col-md-8 col-sm-7">
						<input
							type="text"
							className="form-control mx-2"
							placeholder="Enter Task"
							id="taskInput"
							value={taskContent}
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
							id="scoreInput"
							value={taskScore}
							onChange={handleScoreInput}
						/>
					</div>
				</div>
				<button
					className="btn btn-primary "
					type="submit"
					onClick={handleSubmit}
				>
					Add Task
				</button>
			</form>
		</>
	);
};

TaskForm.propTypes = {
	taskContent: PropTypes.string,
	taskScore: PropTypes.number,
	handleTaskInput: PropTypes.func,
	handleScoreInput: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default TaskForm;
