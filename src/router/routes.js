import ExercisesListPage from "../pages/ExercisesList";
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
    element: <ExercisesListPage />,
    auth: true,
  },
];

export default routes;
