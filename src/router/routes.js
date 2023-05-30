import { Roles } from '../enums/Roles';
import ExerciseFormPage from "../pages/Exercise/CreationForm";
import ExercisePage from "../pages/Exercise";
import ExercisesPage from "../pages/Exercises";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
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
  {
    path: "/exercises/new",
    element: <ExerciseFormPage />,
    auth: true,
    roleLevel: Roles.teacher,
  },
  {
    path: "/exercises/:exerciseId",
    element: <ExercisePage />,
    auth: true,
  },
];

export default routes;
