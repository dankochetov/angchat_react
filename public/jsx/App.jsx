var AppRouterStructure = require('./AppRouterStructure');

var App = React.createClass({
	getInitialState: function() {
		return {
			loginChecked: false,
			logged: false,
			user: {}
		};
	},

	logout: function() {
		this.setState({
			logged: false,
			user: {}
		});
	},

	componentDidMount: function() {
		this.serverRequest = $.get('/getuser', function(response) {
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

	componentWillUnmount: function() {
		this.serverRequest.abort();
	},

	render: function() {
		if (!this.state.loginChecked)
			return <div>Loading...</div>;

		var dataToPass = {
			user: this.state.user,
			logged: this.state.logged,
			logout: this.logout
		};

		return <AppRouterStructure {...dataToPass} />;
	}
});

ReactDOM.render(<App />, document.getElementById('app'));