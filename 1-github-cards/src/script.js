// Avatar and Username
var Card = React.createClass({

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
			<div>
				<img src={this.state.avatar_url} width="120" />
				<h3>{this.state.name}</h3>
				<hr/>
			</div>
		);
	}
});

// Simple Form for Username input
var Form = React.createClass({

	handleSubmit: function(e) {
		e.preventDefault();

		var handleInput = React.findDOMNode(this.refs.handle);
		
		// Add the card here
		this.props.addCard(handleInput.value);
		handleInput.value = '';


	},
	
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input placeholder="github handle" ref="handle" />
				<button>Add</button>
			</form>
		);
	}
})

var Main = React.createClass({

	getInitialState: function() {
		return { handles: [] };
	},

	addCard: function(handleToAdd) {
		// get current state's handle array
		this.setState({ handles: this.state.handles.concat(handleToAdd) });
	},

	render: function() {
		var cards = this.state.handles.map(function(handle) {
			return (<Card handle={handle} />);
		});
		return (
			<div>
				<Form addCard={this.addCard} />
				{cards}
			</div>
		);
	}
});

React.render(<Main />, document.getElementById("root"));