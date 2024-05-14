import PropTypes from "prop-types";

const ProgressBar = ({ formattedProgressRatio }) => {
	return (
		<>
			<div
				className="progress mb-4"
				role="progressbar"
				aria-valuenow={formattedProgressRatio}
				aria-valuemin="0"
				aria-valuemax="100"
			>
				<div
					className="progress-bar bg-success"
					style={{ width: `${formattedProgressRatio}%` }}
				>
					<p className="text-center mb-0">{formattedProgressRatio}%</p>
				</div>
			</div>
		</>
	);
};

ProgressBar.propTypes = {
	formattedProgressRatio: PropTypes.number.isRequired,
};

export default ProgressBar;
