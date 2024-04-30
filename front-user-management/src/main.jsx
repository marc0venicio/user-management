import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Root from "./root";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, compose, legacy_createStore } from "redux";
import { rootReducer } from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const store = legacy_createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
    // It helps to use the Redux extension in the browser.
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <Root />
        <ToastContainer></ToastContainer>
      </Provider>
    </BrowserRouter>
  </>
);
