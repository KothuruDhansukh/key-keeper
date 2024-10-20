import React from "react";

const navbar = () => {
  return (
    <nav className="bg-slate-800 ">
      <div className="flex justify-between items-center px-4 py-5 h-14 mycontainer">
        <div className="logo font-bold text-white">
          <span className="text-lime-400">&lt; Key</span>
          Keeper
          <span className="text-lime-400">/ &gt;</span>
        </div>
        <ul>
          <li className="flex gap-4 text-white">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact Us
            </a>
          </li>
        </ul>
        <button className="text-white flex justify-around bg-slate-800 hover:bg-black items-center border ring-1 rounded-full p-1">
            <img className="invert " width={30} src="/icons/githublogo.png" alt="" srcset="" />
            <p>Github</p>
        </button>
      </div>
    </nav>
  );
};

export default navbar;
