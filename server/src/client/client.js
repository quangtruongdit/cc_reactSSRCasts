// Startup point for the client side application
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import axios from "axios";
import Routes from "./Routes";
import reducers from "./reducers";

const axiosInstance = axios.create({
  baseURL: "/api",
});

// The window.INITIAL_STATE variable is often used in server-side rendering (SSR) setups with Redux
// to pass the initial state from the server to the client.
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance)) //Inject API service as an argument to action creators
);

// ReactDOM.hydrate() is a method provided by React DOM that is used to hydrate a container that already contains server-rendered HTML.
// When you render a React component on the server side using renderToString() (or renderToStaticMarkup()), you generate HTML markup for that component and its children. This HTML markup is sent to the client as part of the initial response. However, the HTML is not interactive because it lacks the necessary event listeners and JavaScript behavior that React normally attaches to the rendered components on the client side.
// ReactDOM.hydrate() is used on the client side to take over the server-rendered content and attach event listeners, initialize state, and make the HTML interactive. It compares the server-rendered markup with the existing DOM content and makes the necessary updates to transform the static HTML into a fully functional React application.

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
