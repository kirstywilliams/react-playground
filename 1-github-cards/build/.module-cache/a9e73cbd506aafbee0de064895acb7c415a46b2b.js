// Avatar and Username
var Card = React.createClass({displayName: "Card",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("img", {src: "https://avatars.githubusercontent.com/u/2313895?v=3", width: "120"}), 
				React.createElement("h3", null, "Kirsty Williams"), 
				React.createElement("hr", null)
			)
		)
	}
});

var Main = React.createClass({displayName: "Main",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(Card, null)
			)
		)
	}
});

React.render(React.createElement(Main, null), document.getElementById("root"));