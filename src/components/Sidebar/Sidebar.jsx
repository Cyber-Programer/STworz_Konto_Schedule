import React, { useState } from "react";
import WebIcons from "../../assets/images";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import pp from "../../assets/pp.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [selectedNav, setSelectedNav] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", ico: IoHomeOutline },
    { name: "Employees", path: "/employee", ico: FaUserFriends },
    { name: "Schedule Setting", path: "/schedule", ico: MdOutlineSchedule },
    { name: "Export", path: "/export", ico: TbFileExport },
    { name: "Premium", path: "/premium", ico: MdOutlineWorkspacePremium },
  ];

  const navigate = useNavigate();

  return (
    <div
      className={`fixed sm:static top-0 left-0 h-full w-[260px] bg-white z-50 shadow-md transform transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 p-6 flex flex-col justify-between border-r border-textClr/20`}
    >
      {/* Close button (mobile only) */}
      {/* <button
        className="sm:hidden absolute top-4 right-4 text-2xl"
        onClick={toggleSidebar}
      >
        ✕
      </button> */}

      {/* Logo + Nav */}
      <div className="flex flex-col gap-10">
        <img src={WebIcons.logo} alt="Logo" className="w-32" />

        <div className="flex flex-col gap-3">
          {menuItems.map((e) => {
            const isSelected = selectedNav === e.name;
            return (
              <div
                key={e.name}
                onClick={() => {
                  setSelectedNav(e.name);
                  navigate(e.path);
                  toggleSidebar(); // Close on mobile click
                }}
                className={`flex items-center gap-3 text-lg font-semibold p-2 rounded-lg cursor-pointer transition
                  ${
                    isSelected
                      ? "bg-Primary text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
              >
                <e.ico className="text-2xl" />
                {e.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Profile */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <img src={pp} alt="Profile" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="font-semibold">John Kabir</h2>
            <p className="text-sm text-gray-500">askf@gmail.com</p>
          </div>
        </div>
        <button className="w-full py-2 border-2 border-Primary text-Primary hover:bg-Primary hover:text-white rounded-lg font-semibold text-lg">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
