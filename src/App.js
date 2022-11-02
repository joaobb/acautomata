import { Route, useRoutes } from "react-router-dom";
import AutomataBuilder from "./components/Builder";
import "./styles.css";
import Router from "./router";

export default function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}
