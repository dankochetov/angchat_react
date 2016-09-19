var LogoutButton = require('./LogoutButton');

var RoomList = React.createClass({
	propTypes: {
		route: React.PropTypes.shape({
			changePage: React.PropTypes.func.isRequired,
			user: React.PropTypes.object.isRequired,
			logged: React.PropTypes.bool.isRequired,
			logout: React.PropTypes.func.isRequired
		}).isRequired
	},

	render: function() {
		return (
			<div>
				Room list here{' '}
				<LogoutButton changePage={this.props.route.changePage} logout={this.props.route.logout} />
			</div>
		);
	}
});

module.exports = RoomList;