var Link = ReactRouter.Link;

var StartPageRenderer = function(props) {
	return (
		<div id='loginbox'>
			<Link to='signup'>Sign up</Link>
			<br />
			<Link to='login'>Log in</Link>
		</div>
	);
}

StartPageRenderer.propTypes = {
	route: React.PropTypes.shape({
		login: React.PropTypes.func.isRequired,
		signup: React.PropTypes.func.isRequired
	}).isRequired
};

module.exports = StartPageRenderer;