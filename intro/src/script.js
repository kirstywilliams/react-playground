var ButtonComponent = React.createClass({
  localHandleClick: function() {
    this.props.localHandleClick(this.props.increment);
  },
  // only required property
  render: function() {
    return (
        <button onClick={this.localHandleClick}>+{this.props.increment}</button>
      )
  }
});

var ResultComponent = React.createClass({
  render: function() {
    return (
      <div>{this.props.localCounter}</div>
    )
  }
});

var MainComponent = React.createClass({
  getInitialState: function() {
    return { counter: 0 };
  },
  
  handleClick: function(increment) {
    this.setState({ counter: this.state.counter + increment });
  },
  
  render: function() {
    return (
      <div>
        <ButtonComponent localHandleClick={this.handleClick} increment={1} />
        <ButtonComponent localHandleClick={this.handleClick} increment={5} />
        <ButtonComponent localHandleClick={this.handleClick} increment={10} />
        <ButtonComponent localHandleClick={this.handleClick} increment={100} />
        <ResultComponent localCounter={this.state.counter} />
      </div>
    )
  }
});

React.render(<MainComponent />, document.getElementById("root"));