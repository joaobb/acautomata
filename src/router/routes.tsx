import { Roles } from "../enums/Roles";
import ClassroomsPage from "../pages/Classrooms";
import ClassroomExercisesPage from "../pages/Classrooms/Exercises";
import ExercisePage from "../pages/Exercise";
import ExerciseFormPage from "../pages/Exercise/CreationForm";
import ExercisesPage from "../pages/Exercises";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import SandboxPage from "../pages/Sandbox";
import React from "react";

const routes: {
  path: string;
  element: React.ReactNode;
  auth?: boolean;
  roleLevel?: string;
}[] = [
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
    auth: true,
    element: <ExercisesPage />,
  },
  {
    path: "/exercises/new",
    auth: true,
    roleLevel: Roles.teacher,
    element: <ExerciseFormPage />,
  },
  {
    path: "/exercises/:exerciseId",
    auth: true,
    element: <ExercisePage />,
  },
  {
    path: "/classrooms",
    auth: true,
    element: <ClassroomsPage />,
  },
  {
    path: "/classrooms/:classroomId/exercises",
    auth: true,
    roleLevel: Roles.teacher,
    element: <ClassroomExercisesPage />,
  },
];

export default routes;
