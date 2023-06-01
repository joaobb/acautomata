import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import BaseLogo from "./Base/Logo";

const navigation = [
  { name: "Sandbox", href: "/", current: true },
  { name: "Exercícios", href: "/exercises", current: false },
  { name: "Turmas", href: "/classrooms", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  function signOut() {
    auth.logout(() => navigate("/"));
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <BaseLogo className="block h-fulltext-lg px-2 py-0 text-amber-100 lg:hidden" />
                  <BaseLogo className="hidden h-full text-lg px-2 py-0 text-amber-100 lg:block" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={(navData) =>
                          classNames(
                            navData.isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )
                        }
                        end
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {auth.user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon className="h-8 w-8 rounded-full text-gray-200" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <span
                            onClick={(ev) => ev.preventDefault()}
                            className={
                              "w-full block px-4 py-1 text-sm text-gray-700 border-b select-none border-gray-200"
                            }
                          >
                            Olá,{" "}
                            <span className={"font-medium"}>
                              {auth.user.email}
                            </span>
                          </span>
                        </Menu.Item>

                        {/*<Menu.Item>*/}
                        {/*  {({ active }) => (*/}
                        {/*    <Link*/}
                        {/*      to="/profile"*/}
                        {/*      className={classNames(*/}
                        {/*        active ? "bg-gray-100" : "",*/}
                        {/*        "block px-4 py-2 text-sm text-gray-700"*/}
                        {/*      )}*/}
                        {/*    >*/}
                        {/*      Perfil*/}
                        {/*    </Link>*/}
                        {/*  )}*/}
                        {/*</Menu.Item>*/}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={signOut}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "w-full text-left block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sair
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className={"flex gap-2"}>
                    <Link to={"/login"}>
                      <Button color={"light"} className={"mr-4"}>
                        Entrar
                      </Button>
                    </Link>

                    <Link to={"/register"}>
                      <Button variant={"outline"}>Cadastrar-se</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
