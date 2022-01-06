import React, { Component } from "react";
import Header from "./components/header";
import "./App.css";
// import CalculatorList from "./components/calculator_list";
import Calculator from "./components/calculator";

//Now we want to exchange data between two child components: Counters and Navbar (to display number of items)
// There is no parent-child relationship between the two
//We need to raise the state of Counters component up to App

class App extends Component {
  handleDelete = (counterId) => {
    // console.log("Delete event handled.", counterId);
    const counters = this.state.counters.filter((c) => c.id !== counterId); //We do not remove the counter from state - we only make a new array after the event.
    this.setState({ counters });
  };

  // handleReset = () => {
  //   const counters = this.state.counters.map((c) => {
  //     c.value = 0;
  //     return c;
  //   });
  //   this.setState({ counters });
  // };

  render() {
    return (
      <React.Fragment>
        {/* <NavBar totalCounters={this.state.counters.filter(c => c.value>0).length}></NavBar> */}

        {/* <main className="container">
          
        </main> */}
        <main id="primary" className="site-main">
          <section className="section">
            <div className="container is-max-widescreen py-4 ">
              <div className="columns is-multiline is-centered">
                <div className="column is-10-tablet is-9-desktop">
                  <article
                    id="post-11"
                    className="post-11 page type-page status-publish hentry"
                  >
                    <Header />

                    <div className="entry-content content mt-6">
                      <Calculator onDelete={this.handleDelete} />
                    </div>
                  </article>{" "}
                </div>
              </div>
            </div>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
