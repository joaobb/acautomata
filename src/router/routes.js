import ExercisesPage from "../pages/Exercises";
import LoginPage from "../pages/Login";
import RegisterPage from '../pages/Register';
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
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/exercises",
    element: <ExercisesPage />,
    auth: true,
  },
];

export default routes;
