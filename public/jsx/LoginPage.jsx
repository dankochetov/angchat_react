var ErrorViewer = require('./ErrorViewer');

var LoginPage = React.createClass({
	propTypes: {
		route: React.PropTypes.shape({
			changePage: React.PropTypes.func.isRequired,
			user: React.PropTypes.object.isRequired,
			logged: React.PropTypes.bool.isRequired
		}).isRequired
	},

	getInitialState: function() {
		return {
			login: '',
			password: '',
			errors: []
		};
	},

	handleChange: function(e) {
		if (e.target.name == 'login')
			this.setState({
				login: e.target.value
			});
		else
			this.setState({
				password: e.target.value
			});
	},

	auth: function() {
		$.post('/signin', {
			login: this.state.login,
			password: this.state.password
		}, function(response) {
			if (response == 'success')
				this.props.route.changePage('/rooms');
			else
				this.setState({
					errors: JSON.parse(response)
				});
		}.bind(this));
	},

	componentDidMount: function() {
		if (this.props.route.logged)
			this.props.route.changePage('/rooms');
	},

	render: function() {
		return (
			<div>
				<ErrorViewer errors={this.state.errors} />
				Login: 
				<input name='login' value={this.state.login} onChange={this.handleChange} />
				<br />
				Password: 
				<input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
				<br />
				<button onClick={this.auth}>Log in</button>
			</div>
		);
	}
});

module.exports = LoginPage;