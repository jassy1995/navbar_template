import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Navbar from "../Navbar";

import "../../App.css";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <FaUser />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />,
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const closeAfterClick = () => {
    if (windowSize.innerWidth <= 768) setIsOpen(false);
  };
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <div className="flex mt-24">
        <motion.div
          animate={{
            width: isOpen
              ? "200px"
              : !isOpen && windowSize.innerWidth >= 768
              ? "45px"
              : "0",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className="bg-blue-500 text-white overflow-y-hidden border border-l-0 border-t-2 border-blue-500 h-[100vh] fixed  top-30 left-0"
        >
          {window.innerWidth >= 768 && (
            <div className="flex items-center justify-between pl-3 pr-2">
              <AnimatePresence>
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="text-lg leading-1"
                  >
                    Logo
                  </motion.h1>
                )}
              </AnimatePresence>

              <div className="w-8">
                <FaBars onClick={toggle} />
              </div>
            </div>
          )}

          <div
            className="flex items-center pl-3 mr-0 h-5 p-5 space-x-2"
            onClick={() => setIsOpen(true)}
          >
            <div>
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  className="border-none bg-white rounded-full text-sm leading-5 ml-5px outline-none text-slate-500"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="flex flex-col mt-4 space-y-2">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    closeAfterClick={closeAfterClick}
                  />
                );
              }

              return (
                <NavLink
                  onClick={closeAfterClick}
                  to={route.path}
                  key={index}
                  className="link  hover:border-r-1 hover:border-white hover:bg-blue-900"
                  activeclassname="active"
                >
                  <div className="flex items-center space-x-2">
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="whitespace-nowrap text-md"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main
          className={
            isOpen
              ? "px-2 md:ml-52 md:p-2 md:pt-1"
              : "px-2 md:ml-12 md:p-2 md:pt-1"
          }
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;
