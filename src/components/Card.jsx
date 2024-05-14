import PropTypes from "prop-types";

const Card = ({ title, children }) => {
	return (
		<div className="card bg-dark text-light shadow ">
			<div className="card-body">
				<h5 className="card-title mb-4">{title}</h5>
				{children}
			</div>
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};

export default Card;
