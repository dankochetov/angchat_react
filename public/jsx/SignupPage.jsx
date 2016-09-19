var SignupPage = React.createClass({
	propTypes: {
		route: React.PropTypes.shape({
			changePage: React.PropTypes.func.isRequired,
			user: React.PropTypes.object.isRequired,
			logged: React.PropTypes.bool.isRequired
		}).isRequired
	},
	
	render: function() {
		return <div>Sign up</div>;
	}
});

module.exports = SignupPage;