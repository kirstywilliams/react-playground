// Avatar and Username
var Card = React.createClass({displayName: "Card",

	getInitialState: function() {
		return {

		};
	},

	componentDidMount: function() {
		var component = this;
		$.get("https://api.github.com/users/kirstywilliams", function(data) {
			component.setState(data);
		});
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("img", {src: this.state.avatar_url, width: "120"}), 
				React.createElement("h3", null, this.state.name), 
				React.createElement("hr", null)
			)
		)
	}
});

var Main = React.createClass({displayName: "Main",

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(Card, {login: "kirstywilliams"})
			)
		)
	}
});

React.render(React.createElement(Main, null), document.getElementById("root"));