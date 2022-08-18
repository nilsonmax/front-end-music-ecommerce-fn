import React from "react";
// import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { StateContext } from "./context/stateContext";
//import { auth0Provider } from "@auth0/auth0-react";
// import dotenv from 'dotenv'
// dotenv.config
// axios.defaults.baseURL=process.env.REACT_APP_API || 'http://localhost:3001'
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// ReactDOM.render(
root.render(
  <Provider store={store}>
    <StateContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateContext>
  </Provider>
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
