/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                       imports                                                      */
/* ------------------------------------------------------------------------------------------------------------------ */
// eslint-disable-next-line
import React, { Component } from "react";
import Selector from "./selector";
import NumForm from "./numform";

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                  rounding function                                                 */
/* ------------------------------------------------------------------------------------------------------------------ */
/*round value to appropriate count of significant digits based on absolute error*/
function rnSig(val, absErr) {
  const t = Math.ceil(Math.log10(0.5 / absErr)); //calc number of fractional significant digits based on absolute error
  const ord = Math.floor(Math.log10(val)); //calc order of magnitude of the number
  // const sig = ord + t + 1; //calc number of significant digits by adding t to order of magnitude of the number
  /* initiate variables ----------------------------------------------------------------------------------------------- */
  let valSci = val,
    errSci = absErr,
    valStr = val,
    valStrSci = val,
    errStr = absErr,
    errStrSci = absErr,
    errDigits = 0;
  /* calculate base of scientific notation ---------------------------------------------------------------------------- */
  valSci = valSci / 10 ** ord;
  errSci = errSci / 10 ** ord;
  /* rounded value in decimal notation -------------------------------------------------------------------------------- */
  valStr = Math.round(valStr / 10 ** -t) * 10 ** -t;
  /* rounded value in scientific notation ----------------------------------------------------------------------------- */
  valStrSci = Math.round(valSci / 10 ** -(t + ord)) * 10 ** -(t + ord);
  /* rounded error in decimal notation -------------------------------------------------------------------------------- */
  errStr = Math.round(errStr / 10 ** -(t + 0)) * 10 ** -(t + 0);
  /* rounded error in scientific notation ----------------------------------------------------------------------------- */
  errStrSci =
    Math.round(errStrSci / 10 ** -(t + ord + 0)) * 10 ** -(t + ord + 0);
  /* where abs. error in decimal range, add "0" to match decimal places of the error ---------------------------------- */
  if (t >= 0) {
    valStr = valStr.toFixed(t + 0);
    errStr = errStr.toFixed(t + 0);
  }
  if (t + ord >= 0) {
    // valStrSci = valStrSci.toFixed(t + ord + 0);
    // errStrSci = errSci.toFixed(t + ord + 0);
    valStrSci = valStrSci.toFixed(t + ord + 0);
    errStrSci = errSci.toFixed(t + ord + 0);
  }

  // console.log(
  //   "ord: " +
  //     ord +
  //     "; t: " +
  //     t +
  //     "; sig: " +
  //     sig +
  //     "; val: " +
  //     valStr +
  //     "; err: " +
  //     errStr
  // );

  /* return object with formatted values ------------------------------------------------------------------------------ */
  return {
    valStr: valStr,
    errStr: errStr,
    valStrSci: valStrSci,
    errStrSci: errStrSci,
    ord: ord === Infinity ? 0 : ord,
    t: t === Infinity ? 0 : t,
    errDigits: errDigits,
  };
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                  verify user input                                                 */
/* ------------------------------------------------------------------------------------------------------------------ */
function CheckNumberInput(inp) {
  /* change all commas to dots ---------------------------------------------------------------------------------------- */
  inp = inp.replace(/,/g, ".");
  /* return number // return NaN if there is more than 1 decimal separators ----------------------------------------------------------- */
  if ((inp.match(/\./g) || []).length > 1) {
    return NaN;
  } else {
    inp = parseFloat(inp);
    return inp;
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                              number-string constructor                                             */
/* ------------------------------------------------------------------------------------------------------------------ */
function ConstructString(val, err, errType, sign, notation) {
  /* convert user ipnut to float -------------------------------------------------------------------------------------- */
  val = CheckNumberInput(val);
  err = CheckNumberInput(err);

  /* check if inputs can be read as numbers --------------------------------------------------------------------------- */
  if (isNaN(val) || isNaN(err)) {
    return "Please specify number and error: i.e. 1234 and 0.04";
  }

  /* initiate variables ----------------------------------------------------------------------------------------------- */
  let absErr = 0,
    resString = "";

  /* calculate relative and absolute error ---------------------------------------------------------------------------- */
  if (errType === "Rel.") {
    absErr = val * err;
  } else {
    absErr = err;
  }

  /* check for absErr greater than a number and if absErr is not 0 ---------------------------------------------------- */
  if (absErr <= 0 || absErr > val) {
    return "Number shall be greater than its absolute error!";
  } else {
    /* read data from object returned by function rnSig ----------------------------------------------------------------- */
    const num = rnSig(val, absErr);
    const valStr = num.valStr,
      valStrSci = num.valStrSci,
      errStr = num.errStr,
      errStrSci = num.errStrSci,
      ord = num.ord,
      t = num.t;
    let errDigits = (errStr / 10 ** Math.floor(Math.log10(errStr))).toFixed(0);

    /* construct number representation based on user-selected settings -------------------------------------------------- */
    if (notation === "Sci.") {
      if (sign === "±") {
        resString =
          "(" +
          valStrSci +
          sign +
          errStrSci +
          ")e" +
          (ord >= 0 ? "+" : "") +
          ord;
      } else {
        resString =
          valStrSci + "(" + errDigits + ")e" + (ord >= 0 ? "+" : "") + ord;
      }
    } else {
      //absolute error in form of string of least significant digits
      if (sign === "±") {
        resString = valStr + sign + errStr;
      } else {
        if (t <= 0) {
          errDigits = errStr;
        }
        resString = valStr + "(" + errDigits + ")";
      }
    }
    return resString;
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                              main calculator component                                             */
/* ------------------------------------------------------------------------------------------------------------------ */
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      err: "",
      errType: "Rel.",
      notation: "Std.",
      sign: "±",
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
        {
          id: 2,
          lab: "Error:",
          plHold: "i.e. 3E-2 or 0.03",
          prep: "±",
          mess: "",
          readonly: 0,
        },
        {
          id: 3,
          lab: "Formatted number:",
          plHold: "",
          prep: "",
          mess: "",
          readonly: 1,
        }, //inValue: "",
      ],
    };
  }

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                   event handlers                                                   */
  /* ------------------------------------------------------------------------------------------------------------------ */
  handleValChange = (val) => {
    this.setState({ val });
  };

  handleErrChange = (err) => {
    this.setState({ err });
  };

  handleErrTypeChange = (errType) => {
    this.setState({ errType });
  };

  handleSignChange = (sign) => {
    this.setState({ sign });
  };

  handleNotationChange = (notation) => {
    this.setState({ notation });
  };

  handleResultChange = (str) => {
    this.setState({ str });
  };

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                    render method                                                   */
  /* ------------------------------------------------------------------------------------------------------------------ */
  render() {
    const val = this.state.val;
    const err = this.state.err;
    const errType = this.state.errType;
    const sign = this.state.sign;
    const notation = this.state.notation;
    const str = ConstructString(val, err, errType, sign, notation);
    return (
      //IMPORTANT! Bulma's grid system is used to compy with Wordpress theme. Bootstrap is used for styling components.
      <div>
        <div className="columns">
          <div className="column is-12 has-text-justified is-hidden-mobile">
            <p>
              This tool formats a given number so that it is rounded to an
              appropriate count of significant digits based on the given
              uncertainty of the value. If you are interested in how the
              calculator works, please visit the{" "}
              <a href="https://mmielcarek.com/en/mat/rounding_numbers">
                {" "}
                blog.
              </a>
            </p>
          </div>
          {/* <div className="column has-text-right">
            <button onClick={this.handleCalc} className="btn btn-warning w-100">
              Clear input
            </button>
          </div> */}
        </div>
        <div className="columns">
          <div className="column is-6">
            {/*} INPUT - NUMBER --------------------------------------------------------------------------------------------------- */}
            <NumForm
              key={0}
              form={this.state.forms[0]}
              onInputChange={this.handleValChange}
              inp={val}
            ></NumForm>
          </div>
          {/* INPUT - ERROR ---------------------------------------------------------------------------------------------------- */}
          <div className="column">
            <NumForm
              key={1}
              form={this.state.forms[1]}
              onInputChange={this.handleErrChange}
              inp={err}
            ></NumForm>
          </div>
          <div className="column">
            {/*} SELECTOR - ERR --------------------------------------------------------------------------------------------------- */}
            <Selector
              key={0}
              selector={this.state.selectors[0]}
              onSelectionChange={this.handleErrTypeChange}
            ></Selector>
          </div>
        </div>
        <div className="columns">
          {/*} INPUT - FORM. NUMBER --------------------------------------------------------------------------------------------- */}
          <div className="column is-6">
            <NumForm
              key={2}
              form={this.state.forms[2]}
              onSelectionChange={this.handleResultChange}
              inp={str}
            ></NumForm>
          </div>
          <div className="column">
            {/*} SELECTOR - NUM NOTATION ------------------------------------------------------------------------------------------ */}
            <Selector
              key={1}
              selector={this.state.selectors[1]}
              onSelectionChange={this.handleNotationChange}
            ></Selector>
          </div>
          <div className="column">
            {/*} SELECTORS - ERR NOTATION ----------------------------------------------------------------------------------------- */}
            <Selector
              key={2}
              selector={this.state.selectors[2]}
              onSelectionChange={this.handleSignChange}
            ></Selector>
          </div>
        </div>
        {/* DELETE BTN ------------------------------------------------------------------------------------------------------- */}
        <hr className="w-100" />
      </div>
    );
  }
}

export default Calculator;
