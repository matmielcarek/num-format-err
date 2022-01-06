import React, { Component } from "react";
import Selector from "./selector";
import NumForm from "./numform";

function rnSig(val, absErr) { //round value to appropriate count of significant digits based on absolute error
  const t = Math.floor(Math.log10(0.5 / absErr)); //calc number of fractional significant digits based on absolute error
  const ord = Math.floor(Math.log10(val)) //calc order of magnitude of the number
  const sig = ord + t + 1; //calc number of significant digits by adding t to order of magnitude of the number
  console.log(sig)
  //initiate variables
  let valSci = val,
    errSci = absErr,
    valStr = val,
    valStrSci = val,
    errStr = absErr,
    errStrSci = absErr
  //calculate base of scientific notation
  valSci = (valSci / (10 ** ord))
  errSci = (errSci / (10 ** ord))
  //rounded value in decimal notation
  valStr = Math.round(valStr / (10 ** (-t))) * (10 ** (-t));
  //rounded value in scientific notation
  valStrSci = Math.round(valSci / (10 ** (-t - ord))) * (10 ** (-t - ord));
  valStrSci = valStrSci.toFixed(t + ord + 1);
  //rounded error in decimal notation
  errStr = Math.round(errStr / (10 ** -(t + 1))) * (10 ** -(t + 1));
  //rounded error in scientific notation
  errStrSci = errSci.toFixed(t + ord + 1);
  //where abs. error in decimal range, add "0" to match decimal places of the error
  if (t >= 0) { // where
    valStr = valStr.toFixed(t + 1);
    errStr = errStr.toFixed(t + 1);
  }
  //return object with formatted values
  return {
    valStr: valStr,
    errStr: errStr,
    valStrSci: valStrSci,
    errStrSci: errStrSci,
    ord: ord === Infinity ? 0 : ord
  };
}

function ConstructString(val, err, errType, sign, notation) {
  //check if inputs can be read as numbers
  if (isNaN(parseFloat(val)) || isNaN(parseFloat(err))) {
    return "Please specify number and error: i.e. 1234 and 0.04."
  }

  //convert user ipnut to float
  val = parseFloat(val)
  err = parseFloat(err)
  let absErr = 0,
    resString = "";

  //calculate relative and absolute error
  if (errType === "Rel.") {
    absErr = val * err;
  }
  else {
    absErr = err;
  }

  //check for absErr greater than a number and if absErr is not 0
  if (absErr > 0 && absErr < val) {
    //read data from object returned by function rnSig
    const num = rnSig(val, absErr);
    const
      valStr = num.valStr,
      valStrSci = num.valStrSci,
      errStr = num.errStr,
      errStrSci = num.errStrSci,
      errDigits = (errStr / (10 ** Math.floor(Math.log10(errStr)))).toFixed(0), //absolute error in form of string of least significant digits
      ord = num.ord

    //construct number representation based on user-selected settings
    if (sign === "±") {
      if (notation === "Sci.") {

        resString = "(" + valStrSci + sign + errStrSci + ")" + "e" + (ord >= 0 ? "+" : "") + ord
      }
      else {
        resString = valStr + sign + errStr
      }
    }
    else {
      if (notation === "Sci.") {
        resString = valStrSci + "(" + errDigits + ")" + "e" + (ord >= 0 ? "+" : "") + ord
      }
      else {
        resString = valStr + "(" + errDigits + ")"
      }
    }
    return resString
  }
  else {
    return "Number shall be greater than its absolute error!"
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    // this.handleValChange = this.handleValChange.bind(this); // used arrow functions instead
    // this.handleErrChange = this.handleErrChange.bind(this); // used arrow functions instead
    this.state = {
      val: "", err: "", errType: "Rel.", notation: "Std.", sign: "±",
      selectors: [
        { id: 1, lab: "Error type:", opt1: "Rel.", opt2: "Abs." },
        { id: 2, lab: "Number notation:", opt1: "Std.", opt2: "Sci." },
        {
          id: 3,
          lab: "Error notation:",
          opt1: "±",
          opt2: "()",
        },
      ],
      forms: [
        {
          id: 1,
          lab: "Number to format:",
          plHold: "i.e. 1.23E+3 or 1230",
          prep: "",
          mess: "Use dot [.] or comma [,] as a decimal separator.",
          readonly: 0,
        },
        { id: 2, lab: "Error:", plHold: "i.e. 3E-2 or 0.03", prep: "±", mess: "", readonly: 0, },
        { id: 3, lab: "Formatted number:", plHold: "", prep: "", mess: "", readonly: 1, }, //inValue: "",
      ],
    };
  }

  handleValChange = (val) => {
    this.setState({ val });
    // this.setState({ str });
  }

  handleErrChange = (err) => {
    this.setState({ err });
    // this.setState({ str });
  }

  handleErrTypeChange = (errType) => {
    this.setState({ errType });
  }

  handleSignChange = (sign) => {
    this.setState({ sign });
  }

  handleNotationChange = (notation) => {
    this.setState({ notation });
  }

  handleResultChange = (str) => {
    this.setState({ str });
  }

  // Render method
  render() {
    const val = this.state.val;
    const err = this.state.err;
    const errType = this.state.errType;
    const sign = this.state.sign;
    const notation = this.state.notation;
    const str = ConstructString(val, err, errType, sign, notation)
    return (
      //IMPORTANT! Bulma's grid system is used to compy with Wordpress theme. Bootstrap is used for styling components.
      <div>
        <div className="columns">
          <div className="column is-9 has-text-justified is-hidden-mobile">
            <p>
              This tool formats a given number so that it is rounded to
              an appropriate count of significant digits based on the given
              uncertainty of the value. If you are interested in the formal
              and mathematical background, please visit the <a href="https://mmielcarek.com/en/mat/rounding_numbers"> blog.</a>
            </p>
          </div>
          <div className="column has-text-right">
            <button
              onClick={this.handleCalc} //onDelete is a property of Counter component called in Counters component.
              // Here only the property onDelete of the counter, defined in counters component is called - <raising event handlers>
              // The reference must be given as an arrow function, as we need to pass an id of the counter to be deleted.
              // If instead of "this.props.counter.id" we would add 1, always counter of id 1 would be deleted.
              className="btn btn-warning w-100"
            >
              Clear input
            </button>
          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            {/*---------------------------------------------------------------------INPUT - NUMBER*/}
            <NumForm key={0} form={this.state.forms[0]} onInputChange={this.handleValChange} inp={val}></NumForm>
          </div>
          {/*---------------------------------------------------------------------INPUT - ERROR*/}
          <div className="column">
            <NumForm key={1} form={this.state.forms[1]} onInputChange={this.handleErrChange} inp={err}></NumForm>
          </div>
          <div className="column">
            {/*---------------------------------------------------------------------SELECTOR - ERR*/}
            <Selector key={0} selector={this.state.selectors[0]} onSelectionChange={this.handleErrTypeChange}></Selector>
          </div>
        </div>
        <div className="columns">
          {/*---------------------------------------------------------------------INPUT - FORM. NUMBER*/}
          <div className="column is-6">
            <NumForm key={2} form={this.state.forms[2]} onSelectionChange={this.handleResultChange} inp={str}></NumForm>
          </div>
          <div className="column">
            {/*---------------------------------------------------------------------SELECTOR - NUM NOTATION*/}
            <Selector key={1} selector={this.state.selectors[1]} onSelectionChange={this.handleNotationChange}></Selector>
            {/* {this.state.selectors.map((selector) => (
              <Selector key={selector.id} selector={selector}></Selector>
            ))} */}
          </div>
          <div className="column">
            {/*---------------------------------------------------------------------SELECTORS - ERR NOTATION*/}
            <Selector key={2} selector={this.state.selectors[2]} onSelectionChange={this.handleSignChange}></Selector>
          </div>
        </div>
        {/* <div className="columns">
          <div className="column is-6">
            <BoilingVerdict
              celsius={parseFloat(val)} />
          </div>
        </div> */}

        {/*---------------------------------------------------------------------DELETE BTN*/}
        <hr className="w-100" />
      </div >
    );
  }

  // Method to change button classes on click to make it a selector.
  changeButtonClass() {
    let classes = "btn btn-sm btn-";
    classes += this.props.counter.value === 0 ? "primary" : "secondary"; // If counter value is 0 add "Warning", else add "primary".
    return classes;
  }

  // Method to format counter based on value.
  formatCount() {
    // Object destructuring - picking a single property of an object and store it in a const.
    const { value: value } = this.props.counter;
    return value === 0 ? "Zero" : value; // Instead of plain text "Zero" it is also possible to return a JSX expression: <h1>Zero</h1>.
    // Constant (const) can also store JSX expression. const x = <h1>Zero</h1>
  }

  ///////////////////////////////////////////////////////////
  //   //[USAGE OF <componentDidMount>]
  //   // Called after component is rendered into the DOM. Place to call data form the server.
  //   componentDidMount() {
  // //Ajax Call
  //     this.setState({data from the server})
  //   }
}

export default Calculator;
