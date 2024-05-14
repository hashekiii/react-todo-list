const Footer = () => {
	return (
		<footer className="footer fixed-bottom bg-dark text-light py-3">
			<div className="container text-center">
				<p className="mb-0">
					&copy; {new Date().getFullYear()} Mark Samuel Ku. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
