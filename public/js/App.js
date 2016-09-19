(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AppRouterStructure = require('./AppRouterStructure');

var App = React.createClass({
	displayName: 'App',

	getInitialState: function () {
		return {
			loginChecked: false,
			logged: false,
			user: {}
		};
	},

	logout: function () {
		this.setState({
			logged: false,
			user: {}
		});
	},

	componentDidMount: function () {
		this.serverRequest = $.get('/getuser', function (response) {
			var newState = {
				loginChecked: true
			};

			if (response != '401') {
				newState.user = JSON.parse(response);
				newState.logged = true;
			}

			this.setState(newState);
		}.bind(this));
	},

	componentWillUnmount: function () {
		this.serverRequest.abort();
	},

	render: function () {
		if (!this.state.loginChecked) return React.createElement(
			'div',
			null,
			'Loading...'
		);

		var dataToPass = {
			user: this.state.user,
			logged: this.state.logged,
			logout: this.logout
		};

		return React.createElement(AppRouterStructure, dataToPass);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"./AppRouterStructure":2}],2:[function(require,module,exports){
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var history = ReactRouter.hashHistory;

var SignupPage = require('./SignupPage');
var LoginPage = require('./LoginPage');
var StartPage = require('./StartPage');
var RoomList = require('./RoomList');

var AppRouterStructure = React.createClass({
	displayName: 'AppRouterStructure',

	propTypes: {
		user: React.PropTypes.object.isRequired,
		logged: React.PropTypes.bool.isRequired,
		logout: React.PropTypes.func.isRequired
	},

	changePage: function (newPage) {
		history.push(newPage);
	},

	render: function () {
		return React.createElement(
			Router,
			{ history: history },
			React.createElement(Route, _extends({ path: '/' }, this.props, { changePage: this.changePage, component: StartPage })),
			React.createElement(Route, _extends({ path: 'rooms' }, this.props, { changePage: this.changePage, component: RoomList })),
			React.createElement(Route, _extends({ path: 'login' }, this.props, { changePage: this.changePage, component: LoginPage })),
			React.createElement(Route, _extends({ path: 'signup' }, this.props, { changePage: this.changePage, component: SignupPage }))
		);
	}
});

module.exports = AppRouterStructure;

},{"./LoginPage":4,"./RoomList":6,"./SignupPage":7,"./StartPage":8}],3:[function(require,module,exports){
var ErrorViewer = function (props) {
	var errorDivs = props.errors.map(function (e) {
		return React.createElement(
			'div',
			{ key: e, style: { color: 'red' } },
			e.msg
		);
	});
	return React.createElement(
		'div',
		null,
		errorDivs
	);
};

ErrorViewer.propTypes = {
	errors: React.PropTypes.array.isRequired
};

module.exports = ErrorViewer;

},{}],4:[function(require,module,exports){
var ErrorViewer = require('./ErrorViewer');

var LoginPage = React.createClass({
	displayName: 'LoginPage',

	propTypes: {
		route: React.PropTypes.shape({
			changePage: React.PropTypes.func.isRequired,
			user: React.PropTypes.object.isRequired,
			logged: React.PropTypes.bool.isRequired
		}).isRequired
	},

	getInitialState: function () {
		return {
			login: '',
			password: '',
			errors: []
		};
	},

	handleChange: function (e) {
		if (e.target.name == 'login') this.setState({
			login: e.target.value
		});else this.setState({
			password: e.target.value
		});
	},

	auth: function () {
		$.post('/signin', {
			login: this.state.login,
			password: this.state.password
		}, function (response) {
			if (response == 'success') this.props.route.changePage('/rooms');else this.setState({
				errors: JSON.parse(response)
			});
		}.bind(this));
	},

	componentDidMount: function () {
		if (this.props.route.logged) this.props.route.changePage('/rooms');
	},

	render: function () {
		return React.createElement(
			'div',
			null,
			React.createElement(ErrorViewer, { errors: this.state.errors }),
			'Login:',
			React.createElement('input', { name: 'login', value: this.state.login, onChange: this.handleChange }),
			React.createElement('br', null),
			'Password:',
			React.createElement('input', { type: 'password', name: 'password', value: this.state.password, onChange: this.handleChange }),
			React.createElement('br', null),
			React.createElement(
				'button',
				{ onClick: this.auth },
				'Log in'
			)
		);
	}
});

module.exports = LoginPage;

},{"./ErrorViewer":3}],5:[function(require,module,exports){
var LogoutButton = React.createClass({
	displayName: 'LogoutButton',

	propTypes: {
		logout: React.PropTypes.func.isRequired,
		changePage: React.PropTypes.func.isRequired
	},

	handleClick: function () {
		$.get('/logout', function (response) {
			this.props.logout();
			this.props.changePage('/');
		}.bind(this));
	},

	render: function () {
		return React.createElement(
			'button',
			{ onClick: this.handleClick },
			'Logout'
		);
	}
});

module.exports = LogoutButton;

},{}],6:[function(require,module,exports){
var LogoutButton = require('./LogoutButton');

var RoomList = React.createClass({
	displayName: 'RoomList',

	propTypes: {
		route: React.PropTypes.shape({
			changePage: React.PropTypes.func.isRequired,
			user: React.PropTypes.object.isRequired,
			logged: React.PropTypes.bool.isRequired,
			logout: React.PropTypes.func.isRequired
		}).isRequired
	},

	render: function () {
		return React.createElement(
			'div',
			null,
			'Room list here',
			' ',
			React.createElement(LogoutButton, { changePage: this.props.route.changePage, logout: this.props.route.logout })
		);
	}
});

module.exports = RoomList;

},{"./LogoutButton":5}],7:[function(require,module,exports){
var SignupPage = React.createClass({
	displayName: "SignupPage",

	propTypes: {
		route: React.PropTypes.shape({
			changePage: React.PropTypes.func.isRequired,
			user: React.PropTypes.object.isRequired,
			logged: React.PropTypes.bool.isRequired
		}).isRequired
	},

	render: function () {
		return React.createElement(
			"div",
			null,
			"Sign up"
		);
	}
});

module.exports = SignupPage;

},{}],8:[function(require,module,exports){
var StartPage = React.createClass({
	displayName: 'StartPage',

	propTypes: {
		route: React.PropTypes.shape({
			changePage: React.PropTypes.func.isRequired,
			user: React.PropTypes.object.isRequired,
			logged: React.PropTypes.bool.isRequired
		}).isRequired
	},

	signup: function () {
		this.props.route.changePage('/signup');
	},

	login: function () {
		this.props.route.changePage('/login');
	},

	componentDidMount: function () {
		if (this.props.route.logged) this.props.route.changePage('/rooms');
	},

	render: function () {
		return React.createElement(
			'div',
			{ id: 'loginbox' },
			React.createElement(
				'button',
				{ onClick: this.signup },
				'Sign up'
			),
			React.createElement('br', null),
			React.createElement(
				'button',
				{ onClick: this.login },
				'Log in'
			)
		);
	}
});

module.exports = StartPage;

},{}]},{},[1]);
