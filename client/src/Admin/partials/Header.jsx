import React, { useEffect, useState } from "react";

import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import ThemeToggle from "../components/ThemeToggle";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { useLocation, NavLink } from "react-router-dom";

function Header() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token.length > 0 && token !== undefined) {
      setUserData(token);
    } else {
      console.log("there is no id");
    }
    // let userData = localStorage.getItem("token");
    // if (userData !== null && userData !== undefined) {
    //   let userDataObject = JSON.parse(userData);
    //   setUserData(userDataObject);
    //   console.log(userData);
    //   console.log('hello world')
    // } else {
    //   console.log("there is no id")
    // }
  }, []);

  const { pathname } = location;

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  return (
    <header
      className={`sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30 sm:flex sm:items-center sm:justify-between`}
    >
      <div className="relative ">
        <div className="flex items-center justify-between h-16 -mb-px ">
          {/* Header: Left side */}
          <div className="flex px-4 sm:px-6 lg:px-8">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden sm:mr-2"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {sidebarOpen && (
            <div className="absolute top-0 w-1/2 min-h-screen px-4 pt-6 bg-slate-900 sm:px-6 lg:px-8">
              <button
                className="text-slate-500 hover:text-slate-600 lg:hidden sm:mr-2"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="5" width="16" height="2" />
                  <rect x="4" y="11" width="16" height="2" />
                  <rect x="4" y="17" width="16" height="2" />
                </svg>
              </button>
              {/* Links */}
              <div className="space-y-8">
                {/* Pages group */}
                <div className="">
                  <ul className="mt-3">
                    {/* Dashboard */}
                   
                    {/* E-Commerce */}
                    <SidebarLinkGroup
                      activecondition={pathname.includes("ecommerce")}
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <a
                              href="#0"
                              className={`block text-slate-200 truncate transition duration-150 ${
                                pathname.includes("ecommerce")
                                  ? "hover:text-slate-200"
                                  : "hover:text-white"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <svg
                                    className="w-6 h-6 shrink-0"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("ecommerce")
                                          ? "text-indigo-300"
                                          : "text-slate-400"
                                      }`}
                                      d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("ecommerce")
                                          ? "text-indigo-600"
                                          : "text-slate-700"
                                      }`}
                                      d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("ecommerce")
                                          ? "text-indigo-500"
                                          : "text-slate-600"
                                      }`}
                                      d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                                    />
                                  </svg>
                                  <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Users
                                  </span>
                                </div>
                                {/* Icon */}
                                <div className="flex ml-2 shrink-0">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "rotate-180"
                                    }`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                {/* {
                            userData.userRole === "admin" && (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/dashboard/alladmin"
                                  className={({ isActive }) =>
                                    'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                                  }
                                >
                                  <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Admin
                                  </span>
                                </NavLink>
                              </li>

                            )
                          }
                          {(userData.userRole == "admin" || userData.userRole == "hr") &&
                            < li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/dashboard/allhr"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                  HR
                                </span>
                              </NavLink>
                            </li>
                          } */}
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/users"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                      Users
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                    <SidebarLinkGroup
                      activecondition={pathname.includes("ecommerce")}
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <a
                              href="#0"
                              className={`block text-slate-200 truncate transition duration-150 ${
                                pathname.includes("ecommerce")
                                  ? "hover:text-slate-200"
                                  : "hover:text-white"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <svg
                                    className="w-6 h-6 shrink-0"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("ecommerce")
                                          ? "text-indigo-300"
                                          : "text-slate-400"
                                      }`}
                                      d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("ecommerce")
                                          ? "text-indigo-600"
                                          : "text-slate-700"
                                      }`}
                                      d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("ecommerce")
                                          ? "text-indigo-500"
                                          : "text-slate-600"
                                      }`}
                                      d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                                    />
                                  </svg>
                                  <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Registration
                                  </span>
                                </div>
                                {/* Icon */}
                                <div className="flex ml-2 shrink-0">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "rotate-180"
                                    }`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/registrations"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                      Registration
                                    </span>
                                  </NavLink>
                                </li>
                                
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                    <SidebarLinkGroup activecondition={pathname.includes('ecommerce')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname.includes('ecommerce') ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${pathname.includes('ecommerce') ? 'text-indigo-300' : 'text-slate-400'}`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('ecommerce') ? 'text-indigo-600' : 'text-slate-700'}`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current ${pathname.includes('ecommerce') ? 'text-indigo-500' : 'text-slate-600'}`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                              />
                            </svg>
                            <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                              Faculty Registrations
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex ml-2 shrink-0">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/dashboard/faculty-registration"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                All Faculties
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
                    {/* Community */}
                    <SidebarLinkGroup
                      activecondition={pathname.includes("community")}
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <a
                              href="#0"
                              className={`block text-slate-200 truncate transition duration-150 ${
                                pathname.includes("community")
                                  ? "hover:text-slate-200"
                                  : "hover:text-white"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <svg
                                    className="w-6 h-6 shrink-0"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("community")
                                          ? "text-indigo-500"
                                          : "text-slate-600"
                                      }`}
                                      d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("community")
                                          ? "text-indigo-300"
                                          : "text-slate-400"
                                      }`}
                                      d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                                    />
                                  </svg>
                                  <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Exams
                                  </span>
                                </div>
                                {/* Icon */}
                                <div className="flex ml-2 shrink-0">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "rotate-180"
                                    }`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/questions"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                      Questions
                                    </span>
                                  </NavLink>
                                </li>
                                <li className="mb-1 last:mb-0">
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/dashboard/list"
                                      className={({ isActive }) =>
                                        "block transition duration-150 truncate " +
                                        (isActive
                                          ? "text-indigo-500"
                                          : "text-slate-400 hover:text-slate-200")
                                      }
                                    >
                                      <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                        List
                                      </span>
                                    </NavLink>
                                  </li>

                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/dashboard/answers"
                                      className={({ isActive }) =>
                                        "block transition duration-150 truncate " +
                                        (isActive
                                          ? "text-indigo-500"
                                          : "text-slate-400 hover:text-slate-200")
                                      }
                                    >
                                      <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                        Answer
                                      </span>
                                    </NavLink>
                                  </li>
                                  </li>
                                  
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                    {/* Job Board */}
                    {/* <SidebarLinkGroup
                      activecondition={pathname.includes("job")}
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment> */}
                            {/* <a
                              href="#0"
                              className={`block text-slate-200 truncate transition duration-150 ${
                                pathname.includes("job")
                                  ? "hover:text-slate-200"
                                  : "hover:text-white"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <svg
                                    className="w-6 h-6 shrink-0"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("job")
                                          ? "text-indigo-600"
                                          : "text-slate-700"
                                      }`}
                                      d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("job")
                                          ? "text-indigo-500"
                                          : "text-slate-600"
                                      }`}
                                      d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("job")
                                          ? "text-indigo-300"
                                          : "text-slate-400"
                                      }`}
                                      d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z"
                                    />
                                  </svg>
                                  <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Result
                                  </span>
                                </div>
                                 Icon 
                                <div className="flex ml-2 shrink-0">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "rotate-180"
                                    }`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            // </a> */}
                            {/* <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/contact"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                      Add Result
                                    </span>
                                  </NavLink>
                                </li>
                                
                              </ul>
                            </div> */}
                          {/* </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup> */}
                    {/* Tasks */}
                    <SidebarLinkGroup
                      activecondition={pathname.includes("tasks")}
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <a
                              href="#0"
                              className={`block text-slate-200 truncate transition duration-150 ${
                                pathname.includes("tasks")
                                  ? "hover:text-slate-200"
                                  : "hover:text-white"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <svg
                                    className="w-6 h-6 shrink-0"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("tasks")
                                          ? "text-indigo-500"
                                          : "text-slate-600"
                                      }`}
                                      d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("tasks")
                                          ? "text-indigo-500"
                                          : "text-slate-600"
                                      }`}
                                      d="M1 1h22v23H1z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("tasks")
                                          ? "text-indigo-300"
                                          : "text-slate-400"
                                      }`}
                                      d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                                    />
                                  </svg>
                                  <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                  Dynamic Pages
                                  </span>
                                </div>
                                {/* Icon */}
                                <div className="flex ml-2 shrink-0">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "rotate-180"
                                    }`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/home"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Home
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/why"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    About
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/why"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Why IPEC
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/testimonials"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Testimonials
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/result"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Result
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/courses"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Courses
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/contact"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Contact
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                    <SidebarLinkGroup
                      activecondition={pathname.includes("tasks")}
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <a
                              href="#0"
                              className={`block text-slate-200 truncate transition duration-150 ${
                                pathname.includes("tasks")
                                  ? "hover:text-slate-200"
                                  : "hover:text-white"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <svg
                                    className="w-6 h-6 shrink-0"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("tasks")
                                          ? "text-indigo-500"
                                          : "text-slate-600"
                                      }`}
                                      d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("tasks")
                                          ? "text-indigo-500"
                                          : "text-slate-600"
                                      }`}
                                      d="M1 1h22v23H1z"
                                    />
                                    <path
                                      className={`fill-current ${
                                        pathname.includes("tasks")
                                          ? "text-indigo-300"
                                          : "text-slate-400"
                                      }`}
                                      d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                                    />
                                  </svg>
                                  <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                  Download
                                  </span>
                                </div>
                                {/* Icon */}
                                <div className="flex ml-2 shrink-0">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "rotate-180"
                                    }`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/downloads/sample-paper"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Sample Paper
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/downloads/engineering-brochure"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Enginnering Brochure
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/downloads/medical-brochure"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Medical Brochure
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to="/dashboard/downloads/syllabus"
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " +
                                      (isActive
                                        ? "text-indigo-500"
                                        : "text-slate-400 hover:text-slate-200")
                                    }
                                  >
                                    <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    Syllabus
                                    </span>
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                    
                  </ul>
                </div>
                {/* More group */}
              </div>
            </div>
          )}

          {/* Header: Right side */}
          <div className="flex items-center">
            {/* Search Modal */}
            <SearchModal
              isOpen={searchModalOpen}
              onClose={() => setSearchModalOpen(false)}
            />

            {/* Notifications */}
            {/* <Notifications />

            {/* Help */}
            {/* <Help />

            {/* User Menu */}
            {/* <UserMenu /> */}

            {/* Theme Toggle */}
            {/* <ThemeToggle
              darkMode={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
