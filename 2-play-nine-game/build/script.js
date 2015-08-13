var StarsFrame = React.createClass({displayName: "StarsFrame",
	render: function() {
		var stars = [];
		for(var i = 0; i < this.props.numberOfStars; i++) {
			stars.push(
				React.createElement("span", {className: "glyphicon glyphicon-star"})
			);
		}
		return (
			React.createElement("div", {id: "stars-frame"}, 
				React.createElement("div", {className: "well"}, 
					stars
				)
			)
		);
	}
});

var ButtonFrame = React.createClass({displayName: "ButtonFrame",
	render: function() {
		var disabled;
		disabled = (this.props.selectedNumbers.length == 0);
		return (
			React.createElement("div", {id: "button-frame"}, 
				React.createElement("button", {className: "btn btn-primary btn-lg", disabled: disabled}, 
					"="
				)
			)
		);
	}
});

var AnswerFrame = React.createClass({displayName: "AnswerFrame",
	render: function() {
		var props = this.props;
		var selectedNumbers = props.selectedNumbers.map(function(i) {
			return (
				React.createElement("span", {onClick: props.unselectNumber.bind(null, i)}, 
					i
				)
			)
		});

		return (
			React.createElement("div", {id: "answer-frame"}, 
				React.createElement("div", {className: "well"}, 
					selectedNumbers
				)
			)
		);
	}
});

var NumbersFrame = React.createClass({displayName: "NumbersFrame",
	render: function() {

		var numbers = [], className, 
			selectNumber = this.props.selectNumber,
			selectedNumbers = this.props.selectedNumbers;
		
		for (var i = 1; i <= 9; i++) {
			className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
			numbers.push(
				React.createElement("div", {className: className, onClick: selectNumber.bind(null, i)}, i)
			);
		}

		return (
			React.createElement("div", {id: "numbers-frame"}, 
				React.createElement("div", {className: "well"}, 
					numbers
				)
			)
		);
	}
});

var Game = React.createClass({displayName: "Game",

	getInitialState: function() {
		return { 
			selectedNumbers: [],
			numberOfStars: Math.floor(Math.random()*9) + 1 // 1 - 9
		};
	},


	selectNumber: function(clickedNumber) {
		if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
			this.setState(
				{ selectedNumbers: this.state.selectedNumbers.concat(clickedNumber) }
			)
		}
	},

	unselectNumber: function(clickedNumber) {
		var selectedNumbers = this.state.selectedNumbers,
			indexOfNumber = selectedNumbers.indexOf(clickedNumber);

		selectedNumbers.splice(indexOfNumber, 1);
		this.setState( {selectedNumbers: selectedNumbers} );
	},

	render: function() {
		var selectedNumbers = this.state.selectedNumbers,
			numberOfStars = this.state.numberOfStars;
		
		return (
			React.createElement("div", {id: "game"}, 
				React.createElement("h2", null, "Play Nine"), 
				React.createElement("hr", null), 
				React.createElement("div", {className: "clearfix"}, 
					React.createElement(StarsFrame, {numberOfStars: numberOfStars}), 
					React.createElement(ButtonFrame, {selectedNumbers: selectedNumbers}), 
					React.createElement(AnswerFrame, {selectedNumbers: selectedNumbers, 
								 unselectNumber: this.unselectNumber})
				), 

				React.createElement(NumbersFrame, {selectedNumbers: selectedNumbers, 
							  selectNumber: this.selectNumber})
			)
		);
	}
});

React.render(React.createElement(Game, null), document.getElementById("container"));