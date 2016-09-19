var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var history = ReactRouter.hashHistory;

var SignupPage = require('./SignupPage');
var LoginPage = require('./LoginPage');
var StartPage = require('./StartPage');
var RoomList = require('./RoomList');

var AppRouterStructure = React.createClass({
	propTypes: {
		user: React.PropTypes.object.isRequired,
		logged: React.PropTypes.bool.isRequired,
		logout: React.PropTypes.func.isRequired
	},

	changePage: function(newPage) {
		history.push(newPage);
	},

	render: function() {
		return (
			<Router history={history}>
				<Route path='/' {...this.props} changePage={this.changePage} component={StartPage} />
				<Route path='rooms' {...this.props} changePage={this.changePage} component={RoomList} />
				<Route path='login' {...this.props} changePage={this.changePage} component={LoginPage} />
				<Route path='signup' {...this.props} changePage={this.changePage} component={SignupPage} />
			</Router>
		);
	}
});

module.exports = AppRouterStructure;