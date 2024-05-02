import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
import Routes from "../client/Routes";

export default (req, store, context) => {
  // The StaticRouter - is responsible for matching the current URL and rendering the appropriate components based on the route configuration.
  // The context object - is provided to the StaticRouter to capture any redirects or other information related to the routing process.
  //
  // Store - When your React application is rendered on the server side, it generates HTML that includes the initial state of your Redux store.
  // This initial state is sent to the client as part of the HTML response. When the client receives this HTML, it hydrates the initial state into the Redux store on the client side.
  // This ensures that the client-side Redux store starts with the same state as the server-side store, providing a consistent application state between the server and the client.
  //
  // If your application requires initial data from the server to render properly on the client side (for example, user data, product information, etc.),
  // you may still need some form of server-side data fetching and management, even if you're not using Redux on the server.
  // In such cases, you might use alternative methods like fetching data in your component lifecycle methods (componentDidMount, useEffect)
  // or using server-side APIs to fetch data during the server-side rendering process.

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // Helmet allows you to dynamically set meta tags, titles, and other elements of the document head based on the state of your React components.
  const helmet = Helmet.renderStatic();

  // The window.INITIAL_STATE variable is often used in server-side rendering (SSR) setups with Redux to pass the initial state from the server to the client.
  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
