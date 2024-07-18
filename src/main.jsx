import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { PokemonApp } from "./PokemonApp.jsx";
import { TodosApp } from "./TodosApp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      {/* <PokemonApp/> */}
      <TodosApp/>
    </Provider>
  </React.StrictMode>
);
