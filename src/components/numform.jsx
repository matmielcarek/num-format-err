/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                       imports                                                      */
/* ------------------------------------------------------------------------------------------------------------------ */
// eslint-disable-next-line
import React, { Component } from "react";
import Prepender from "./prepender";
/* ------------------------------------------------------------------------------------------------------------------ */
/*                                               main NumForm component                                               */
/* ------------------------------------------------------------------------------------------------------------------ */
class NumForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this); // This binding is necessary to make `this` work in the callback
  }
  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                   event handlets                                                   */
  /* ------------------------------------------------------------------------------------------------------------------ */
  handleChange(event) {
    this.props.onInputChange(event.target.value);
  }
  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                   render function                                                  */
  /* ------------------------------------------------------------------------------------------------------------------ */
  render() {
    const { lab, plHold, prep, mess, readonly } = this.props.form;
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
