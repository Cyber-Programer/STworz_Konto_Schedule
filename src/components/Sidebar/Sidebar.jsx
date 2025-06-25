import React, { useState } from "react";
import WebIcons from "../../assets/images";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import pp from "../../assets/pp.png";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const icons = {
    Dashboard: "IoHomeOutline",
    Employees: "FaUserFriends",
    Schedule: "MdOutlineSchedule",
    Export: "TbFileExport",
  };
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", ico: IoHomeOutline },
    { name: "Employees", path: "/employee", ico: FaUserFriends },
    { name: "Schedule", path: "/schedule", ico: MdOutlineSchedule },
    { name: "Export", path: "/export", ico: TbFileExport },
    // { name: }
  ];
  const navigate = useNavigate()

  return (
    <div className="p-10 w-[400px] flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <img src={WebIcons.logo} alt="" className="w-40 " />
        {/* Navigation elements */}
        <div className="flex flex-col gap-3">
          {menuItems.map((e) => {
            const isSelected = selectedNav === e.name;
            return (
              <div
                onClick={() => {
                  setSelectedNav(e.name);
                  navigate(e.path)
                  
                }}
                className={`flex gap-3 w-full ${
                  isSelected ? "bg-Primary" : "background-white"
                } ${
                  isSelected ? "text-white" : "text-black"
                } p-2 items-center font-semibold text-lg cursor-pointer`}
              >
                <e.ico className="text-2xl " />
                {e.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* profile */}
      <div className="flex flex-col gap-7">
        <div className="flex gap-5">
          <img src={pp} alt="img" />
          <div>
            <h2>John Kabir</h2>
            <p>askf@gmail.com</p>
          </div>
        </div>
        <button className="capitalize w-full font-semibold text-lg text-Primary hover:bg-Primary hover:text-white border-2 py-2 rounded-lg border-Primary">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
