import React from "react";
import { ImQuotesLeft } from "react-icons/im";
import { IoBookmarks } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  //================== Get Count From Redux ================
  let count = useSelector((state) => state.quotes.count);
  return (
    <div className="flex items-center justify-between gap-8 py-4 fixed bottom-0 md:top-0 left-0 bg-black bg-opacity-30  h-fit z-30 w-screen px-2">
      <h3 className="text-4xl">Quotes</h3>
      <div className="flex gap-8">
        {/*================== Link To Home Page ================ */}
        <NavLink
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
          to={"/"}
        >
          <ImQuotesLeft size={40} />
        </NavLink>
        {/*================== Link To saved-quotes Page ================ */}
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 relative" : "relative"
          }
          to={"/saved-quotes"}
        >
          <IoBookmarks size={40} />

          <div className="absolute bottom-0 right-0  z-[100] text-white flex justify-center items-center font-extrabold text-xl w-6 h-6 bg-red-600 rounded-full font-mono">
            {count}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
