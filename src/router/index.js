import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";

import RequireAuth from "../components/Router/RequireAuth";

import { AuthProvider } from "../hooks/useAuth";

import NotFoundPage from "../pages/NotFound";

import routes from "./routes";

function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}

const Router = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />} errorElement={<div>404</div>}>
          {routes.map((route) => (
            <Route
              {...route}
              key={route.path}
              element={
                route.auth ? (
                  <RequireAuth roleLevel={route.roleLevel}>
                    {route.element}
                  </RequireAuth>
                ) : (
                  route.element
                )
              }
            />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default Router;
