import { FaBars } from "react-icons/fa";
import DropDown from "./DropDown";
function Navbar({ toggle }) {
  return (
    <>
      <nav className="bg-blue-500  py-6 px-3 fixed top-0 left-0 right-0 mb-10">
        <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
          <div className="md:hidden">
            <button
              className="false flex items-center justify-center gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-full w-12 h-12 p-0  place-items-center text-sm leading-relaxed bg-transparent  undefined"
              onClick={toggle}
            >
              <span className="text-white text-2xl">
                <FaBars />
              </span>
            </button>
          </div>
          <div className="flex justify-end items-center w-full md:justify-between">
            <h4 className="uppercase text-white text-sm tracking-wider mt-1 hidden md:block">
              DASHBOARD
            </h4>
            <div className="flex items-end">
              <DropDown />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
