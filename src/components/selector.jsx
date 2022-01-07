/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                       imports                                                      */
/* ------------------------------------------------------------------------------------------------------------------ */
// eslint-disable-next-line
import React, { Component } from "react";
/* ------------------------------------------------------------------------------------------------------------------ */
/*                                               main Selector component                                              */
/* ------------------------------------------------------------------------------------------------------------------ */
class Selector extends React.Component {
  constructor() {
    super();
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                   event handlers                                                   */
  /* ------------------------------------------------------------------------------------------------------------------ */
  onChangeValue(event) {
    this.props.onSelectionChange(event.target.id);
  }
  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                   render function                                                  */
  /* ------------------------------------------------------------------------------------------------------------------ */
  render() {
    const { lab, opt1, opt2 } = this.props.selector;
    return (
      <div>
        <span>{lab} </span>
        <div
          className="w-100 btn-group btn-block"
          onChange={this.onChangeValue}
        >
          <input
            type="radio"
            name={lab}
            className="btn-check"
            id={opt1}
            autoComplete="off"
            defaultChecked
          />
          <label className="btn btn-block btn-outline-primary" htmlFor={opt1}>
            {opt1}
          </label>
          <input
            type="radio"
            name={lab}
            className="btn-check"
            id={opt2}
            autoComplete="off"
          />
          <label className="btn btn-block btn-outline-primary" htmlFor={opt2}>
            {opt2}
          </label>
        </div>
      </div>
    );
  }
}

export default Selector;
