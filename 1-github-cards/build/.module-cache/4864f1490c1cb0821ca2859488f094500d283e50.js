// Avatar and Username
var Card = React.createClass({displayName: "Card",

	getInitialState: function() {
		return {

		};
	},

	componentDidMount: function() {
		var component = this;
		$.get("https://api.github.com/users/" + this.props.handle, function(data) {
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
		);
	}
});

var Form = React.createClass({displayName: "Form",

	handleSubmit: function(e) {
		e.preventDefault();

		var handle = React.findDOMNode(this.refs.handle);
		
		// Add the card here
		loginInput.value = '';


	},
	render: function() {
		return (
			React.createElement("form", {onSubmit: this.handleSubmit}, 
				React.createElement("input", {placeholder: "github handle", ref: "handle"}), 
				React.createElement("button", null, "Add")
			)
		);
	}
})

var Main = React.createClass({displayName: "Main",

	getInitialState: function() {
		return { handles: [] };
	},

	addCard: function() {

	},

	render: function() {
		var cards = this.state.handles.map(function(handle) {
			return (React.createElement(Card, {handle: handle}));
		});
		return (
			React.createElement("div", null, 
				React.createElement(Form, {addCard: this.addCard}), 
				cards
			)
		);
	}
});

React.render(React.createElement(Main, null), document.getElementById("root"));