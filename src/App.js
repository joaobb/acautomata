import { QueryClient, QueryClientProvider } from "react-query";
import { Route, useRoutes } from "react-router-dom";
import AutomataBuilder from "./components/Builder";
import "./styles.css";
import Router from "./router";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router />
      </div>
    </QueryClientProvider>
  );
}
