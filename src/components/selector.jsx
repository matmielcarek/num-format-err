import React, { Component } from "react";

class Selector extends React.Component {
  constructor() {
    super();
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    // console.log(event.target.id);
    this.props.onSelectionChange(event.target.id);
  }

  render() {
    const { id, lab, opt1, opt2 } = this.props.selector;
    // console.log(lab + id);
    return (
      <div>
        <span>{lab} </span>
        {/* <div className="w-100 btn-group btn-block" onChange={() => {
          this.props.onErrTypeChange(this.props.id); // This is here instead of the local state. Parent controls the component.
        }}> */}
        <div className="w-100 btn-group btn-block" onChange={this.onChangeValue}>
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
