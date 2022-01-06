import React from 'react'; // Object imported from React module
import ReactDOM from 'react-dom'; // Object imported from React module
// import './index.css'; // Import basic css
import App from './App'; // Import main (root) component
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'; // Importing bootstrap css
import 'bulma/css/bulma.css'; // Importing bootstrap css


ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//[INTRO]

// Base of React library are COMPONENTS - separate pieces of user interface - reusable, independent, isolated.
// App - root component, then child components.
// React is only a library, not framework as Angular. It only renders the elements, but no ready components are available.
// One still need to use bootstrap or other framework to create UI.

//[COMPONENT]

// Component is a JavaScript class that has some STATE and RENDER METHOD.
// State is data that we want to display when the component is rendered.
// Render method derscribes what the UI should look like. Output of the render method is "virtual" DOM - lightweight, in memory, cheap to create.
// React compares virtual DOM with old version of the virtual DOM and changes only the DOM elements that were changed.
// In components we use JSX, that is compiled by Babel to plain js (React) code.

//[START]

// To create basic React app - in directory: <create-react-app app-name> - it includes:
//-> Development Server
//-> Webpack
//-> Babel - JS compiler - from JSX (JavaScript XML) to plain JS
//-> Other tools
// To start the server: <npm start>

//[SHORTCUTS]

//->imrc - import react component
//->cc - create class

//[THIS]

// "This" behaves differently, depending on where it is called it can reference different objects.
// If "This" is called as part of a method in an object, "This" will return reference to that object.
// If function is called as standalone function, without object reference, "This" by default returns reference to window object.

//[RAISING EVENTS]

// The component that owns a piece od the state, should be the one modifying it.
// List of counters is part of counters component. Adding and removin shall be done by counters component.
// But, the state is private to the component! So, Counter shall raise the event and counters component will handle this event.
// Pass a reference to a method owned by counters component in the counter component via props.
// In Counters component, where we render counter, we add a prop (event) (i.e. "onDelete={this.handleDelete)".
// In Counter component we refer to a prop: "this.props.onDelete".
