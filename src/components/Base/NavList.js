import { NavLink } from "react-router-dom";

function NavList({ routes, active }) {
  return (
    <ul className="flex items-center gap-6 w-fit bg-amber-950 px-2 py-2 rounded-md">
      {routes.map((route) => (
        <NavLink
          key={route.label}
          to={route.target}
          className={() =>
            "text-lg dark:text-gray-300 rounded-md py px-4" +
            (route.active ? " font-bold bg-orange-500 text-white" : "")
          }
        >
          {route.label}
        </NavLink>
      ))}
    </ul>
  );
}

export default NavList;
