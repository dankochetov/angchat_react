var StartPage = React.createClass({
	propTypes: {
		route: React.PropTypes.shape({
			changePage: React.PropTypes.func.isRequired,
			user: React.PropTypes.object.isRequired,
			logged: React.PropTypes.bool.isRequired
		}).isRequired
	},

	signup: function() {
		this.props.route.changePage('/signup');
	},

	login: function() {
		this.props.route.changePage('/login');
	},

	componentDidMount: function() {
		if (this.props.route.logged)
			this.props.route.changePage('/rooms');
	},

	render: function() {
		return (
			<div id='loginbox'>
				<button onClick={this.signup}>Sign up</button>
				<br />
				<button onClick={this.login}>Log in</button>
			</div>
		);
	}
});

module.exports = StartPage;