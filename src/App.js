import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./router";
import "./styles.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="App">
        <Router />
      </div>
    </QueryClientProvider>
  );
}
