import React, { Component } from "react";
import Prepender from "./prepender";

class NumForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);// This binding is necessary to make `this` work in the callback
  }
  //Functions in javaScript are objects so they have objects and methods.
  //Above is done to get access to the Counter object in function.
  //We will be able to update "state" property.
  //Solution to bind event handlers to "This"
  //There is another way of doing this:
  //   handleIncrement() {
  //     console.log("Increment clicked", this);
  //   }
  ///////////////////////////////////////////////////////////
  handleChange(event) {
    this.props.onInputChange(event.target.value);
  }

  render() {
    const { id, lab, plHold, prep, mess, readonly } = this.props.form;
    const inp = this.props.inp;

    return (
      <form>
        <label className="w-100">{lab}</label>
        <div className="input-group">
          {prep !== "" && <Prepender prep={prep} />}
          <input
            type="text"
            placeholder={plHold}
            className="form-control"
            value={inp}
            onChange={this.handleChange}
            readOnly={readonly}
          />
          {/* <input type="submit" value="Wyślij" /> */}
        </div>
        <small className="form-text text-muted">{mess}</small>
      </form>
    );
  }
}

export default NumForm;
