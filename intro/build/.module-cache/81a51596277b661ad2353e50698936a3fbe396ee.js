var ButtonComponent = React.createClass({displayName: "ButtonComponent",
  localHandleClick: function() {
    this.props.localHandleClick(this.props.increment);
  },
  // only required property
  render: function() {
    return (
        React.createElement("button", {onClick: this.localHandleClick}, "+", this.props.increment)
      )
  }
});

var ResultComponent = React.createClass({displayName: "ResultComponent",
  render: function() {
    return (
      React.createElement("div", null, this.props.localCounter)
    )
  }
});

var MainComponent = React.createClass({displayName: "MainComponent",
  getInitialState: function() {
    return { counter: 0 };
  },
  
  handleClick: function(increment) {
    this.setState({ counter: this.state.counter + increment });
  },
  
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(ButtonComponent, {localHandleClick: this.handleClick, increment: 1}), 
        React.createElement(ButtonComponent, {localHandleClick: this.handleClick, increment: 5}), 
        React.createElement(ButtonComponent, {localHandleClick: this.handleClick, increment: 10}), 
        React.createElement(ButtonComponent, {localHandleClick: this.handleClick, increment: 100}), 
        React.createElement(ResultComponent, {localCounter: this.state.counter})
      )
    )
  }
});

React.render(React.createElement(MainComponent, null), document.getElementById("root"));