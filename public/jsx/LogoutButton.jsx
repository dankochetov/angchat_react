var LogoutButton = React.createClass({
	propTypes: {
		logout: React.PropTypes.func.isRequired,
		changePage: React.PropTypes.func.isRequired
	},

	handleClick: function() {
		$.get('/logout', function(response) {
			this.props.logout();
			this.props.changePage('/');
		}.bind(this));
	},

	render: function() {
		return <button onClick={this.handleClick}>Logout</button>;
	}
});

module.exports = LogoutButton;