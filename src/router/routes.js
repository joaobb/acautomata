import ExercisesPage from "../pages/Exercises";
import LoginPage from "../pages/Login";
import SandboxPage from "../pages/Sandbox";

const routes = [
  {
    path: "/",
    element: <SandboxPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/exercises",
    element: <ExercisesPage />,
    auth: true,
  },
];

export default routes;
