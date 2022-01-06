import React, { Component } from "react";

class Prepender extends React.Component {
  render() {
    return (
      <div className="input-group-prepend">
        <span className="input-group-text">{this.props.prep}</span>
      </div>
    );
  }
}

export default Prepender;
