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
		var disabled, button, correct = this.props.correct;

		switch(correct) {
			case true:
				button = (
					React.createElement("button", {className: "btn btn-success btn-lg", 
							onClick: this.props.acceptAnswer}, 
						React.createElement("span", {className: "glyphicon glyphicon-ok"})
					)
				);

				break;
			case false:
				button = (
					React.createElement("button", {className: "btn btn-danger btn-lg"}, 
						React.createElement("span", {className: "glyphicon glyphicon-remove"})
					)
				);

				break;
			default:
				disabled = (this.props.selectedNumbers.length == 0);
				button = (
					React.createElement("button", {className: "btn btn-primary btn-lg", disabled: disabled, 
							onClick: this.props.checkAnswer}, 
						"="
					)
				);
		}

		
		return (
			React.createElement("div", {id: "button-frame"}, 
				button, 
				React.createElement("br", null), React.createElement("br", null), 
				React.createElement("button", {className: "btn btn-warning btn-xs", onClick: this.props.redraw, 
						disabled: this.props.redraws === 0}, 
					React.createElement("span", {className: "glyphicon glyphicon-refresh"}), 
					" ", 
					this.props.redraws
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
			);
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
		selectedNumbers = this.props.selectedNumbers,
		usedNumbers = this.props.usedNumbers;
		
		for (var i = 1; i <= 9; i++) {
			className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
			className += " used-" + (usedNumbers.indexOf(i) >= 0);
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

var DoneFrame = React.createClass({displayName: "DoneFrame",
	render: function() {
		return (
			React.createElement("div", {className: "well text-center"}, 
				React.createElement("h2", null, this.props.doneStatus), 
				React.createElement("button", {className: "btn btn-default", 
						onClick: this.props.resetGame}, 
					"Play again"
				)
			)
		);
	}
});

var possibleCombinationSum = function(arr, n) {
	if (arr.indexOf(n) >= 0) { return true; }
	if (arr[0] > n) { return false; }
	if (arr[arr.length - 1] > n) {
		arr.pop();
		return possibleCombinationSum(arr, n);
	}

	var listSize = arr.length, combinationsCount = (1 << listSize)
	for (var i = 1; i < combinationsCount; i++) {
		var combinationSum = 0;
		for (var j=0; j < listSize; j++) {
			if (i & (1 << j)) { combinationSum += arr[j]; }
		}
		if (n === combinationSum) { return true; }
	}
	return false;
};

var Game = React.createClass({displayName: "Game",

	getInitialState: function() {
		return { 
			selectedNumbers: [],
			numberOfStars: this.randomNumber(),
			correct: null,
			usedNumbers: [],
			redraws: 5,
			doneStatus: null
		};
	},

	selectNumber: function(clickedNumber) {
		if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
			this.setState({
				selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
				correct: null 
			})
		}
	},

	unselectNumber: function(clickedNumber) {
		var selectedNumbers = this.state.selectedNumbers,
		indexOfNumber = selectedNumbers.indexOf(clickedNumber);

		selectedNumbers.splice(indexOfNumber, 1);
		this.setState( {selectedNumbers: selectedNumbers, correct: null} );
	},

	sumOfSelectedNumbers: function() {
		return this.state.selectedNumbers.reduce(function(p, n) {
			return p+n;
		}, 0);
	},

	checkAnswer: function() {
		var correct = (this.state.numberOfStars == this.sumOfSelectedNumbers());
		this.setState( {correct: correct} );
	},

	acceptAnswer: function() {
		var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			selectedNumbers: [],
			usedNumbers: usedNumbers,
			correct: null,
			numberOfStars: this.randomNumber()
		}, function() {
			this.updateDoneStatus();
		});
	},

	redraw: function() {
		if (this.state.redraws > 0) {
			this.setState({
				numberOfStars: this.randomNumber(),
				correct: null,
				selectedNumbers: [],
				redraws: this.state.redraws - 1
			}, function() {
				this.updateDoneStatus();
			});
		}
	},

	randomNumber: function() {
		return Math.floor(Math.random()*9) + 1;
	},

	updateDoneStatus: function() {
		if (this.state.usedNumbers.length === 9) {
			this.setState({ doneStatus: 'Done. Nice!'});
			return;
		}

		if ((this.state.redraws === 0) && 
			!this.possibleSolution()) {
			this.setState({ doneStatus: 'Game Over!'});
		}
	},

	possibleSolution: function() {
		var numberOfStars = this.state.numberOfStars,
		possibleNumbers = [],
		usedNumbers = this.state.usedNumbers;

		for (var i = 1; i <= 9; i++) {
			if (usedNumbers.indexOf(i) < 0) {
				possibleNumbers.push(i);
			}
		}

		return possibleCombinationSum(possibleNumbers, numberOfStars);
	},

	resetGame: function() {
		// difference between setState and replaceState
		// setState merges what you set with the current state
		// while replaceState drops the currentState and replaces
		// with what you supply.
		this.replaceState(this.getInitialState());
	},

	render: function() {
		var selectedNumbers = this.state.selectedNumbers,
		numberOfStars = this.state.numberOfStars,
		correct = this.state.correct,
		usedNumbers = this.state.usedNumbers,
		redraws = this.state.redraws,
		doneStatus = this.state.doneStatus,
		bottomFrame;

		if (doneStatus) {
			bottomFrame = React.createElement(DoneFrame, {doneStatus: doneStatus, 
									 resetGame: this.resetGame});
		} else {
			bottomFrame = React.createElement(NumbersFrame, {selectedNumbers: selectedNumbers, 
			selectNumber: this.selectNumber, 
			usedNumbers: usedNumbers});
		}

		return (
			React.createElement("div", {id: "game"}, 
				React.createElement("h2", null, "Play Nine"), 
				React.createElement("hr", null), 
				React.createElement("div", {className: "clearfix"}, 
					React.createElement(StarsFrame, {numberOfStars: numberOfStars}), 
					React.createElement(ButtonFrame, {selectedNumbers: selectedNumbers, 
								 correct: correct, 
								 checkAnswer: this.checkAnswer, 
								 acceptAnswer: this.acceptAnswer, 
								 redraw: this.redraw, 
								 redraws: redraws}), 
					React.createElement(AnswerFrame, {selectedNumbers: selectedNumbers, 
								 unselectNumber: this.unselectNumber})
				), 

				bottomFrame
			)
		);
	}
});

React.render(React.createElement(Game, null), document.getElementById("container"));