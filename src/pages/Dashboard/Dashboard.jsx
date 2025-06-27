import React, { useState } from "react";
import WebIcons from "../../assets/images";

const Dashboard = () => {
  const shOptionsCss =
    "flex gap-2 items-center justify-center border px-3 border-Primary";

  const [dateColumns] = useState(
    Array.from({ length: 8 }, (_, i) => {
      const date = new Date(2025, 4, 1 + i); // May is month index 4
      return date.toISOString().split("T")[0];
    })
  );

  const [employeeSchedules] = useState([
    {
      name: "Mark",
      totalHours: "40 hr 10 min",
      shifts: {
        "2025-05-01": ["08:00-14:00"],
        "2025-05-02": ["08:00-14:00"],
        "2025-05-03": ["08:00-14:00"],
        "2025-05-04": ["08:00-14:00"],
        "2025-05-05": ["14:00-21:00"],
        "2025-05-06": ["08:00-14:00"],
        "2025-05-07": ["16:00-23:00"],
      },
    },
    {
      name: "Oscar",
      totalHours: "56 hr 0 min",
      shifts: {
        "2025-05-01": ["08:00-14:00"],
        "2025-05-02": ["16:00-23:00"],
        "2025-05-03": ["08:00-14:00"],
        "2025-05-04": ["16:00-23:00"],
        "2025-05-05": ["10:00-18:00"],
        "2025-05-06": ["14:00-21:00"],
        "2025-05-07": ["08:00-14:00"],
      },
    },
    // Add more employee objects here similarly
  ]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const getShiftColor = (shift) => {
    if (shift.includes("08:00")) return "bg-[#669bbc]"; // morning
    if (shift.includes("10:00")) return "bg-[#f4a261]"; // mid
    if (shift.includes("14:00")) return "bg-[#89c2d9]"; // late morning
    if (shift.includes("16:00")) return "bg-[#9d4edd]"; // evening
    return "bg-gray-400";
  };

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 w-10/12 mx-auto">
        <h2 className="text-2xl font-semibold">Welcome to Grafik Master</h2>
        <button className="flex gap-2 items-center border px-5 py-2 border-blue-400">
          <img className="w-5" src={WebIcons.scheduleCalender} alt="" />
          Manage & Create Schedule
        </button>
      </div>
      <hr className="text-gray-300" />
      <div className="flex justify-between p-10">
        <h2 className="text-sm lg:text-xl font-semibold">
          Previously generated schedules
        </h2>
        <div className="flex gap-2 font-semibold">
          <select
            name=""
            id="wm"
            className="border border-Primary px-5 outline-blue-400"
          >
            <option value="Weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button className={shOptionsCss}>
            <img src={WebIcons.scheduleEdit} alt="edit ico" />
            Edit
          </button>
          <button className={shOptionsCss}>
            <img src={WebIcons.scheduleSave} alt="save ico" />
            Save
          </button>
          <button className={shOptionsCss}>
            <img src={WebIcons.scheduleExport} alt="" />
            Export to PDF
          </button>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="overflow-x-auto">
        <table className="border border-gray-400 ">
          <tr>
            <th>
              {/* Date Selection  */}
              <select
                name="timeSelect"
                id="timeSelect"
                className="font-normal border-0 outline-0"
              >
                <option value="01.05 - 07.05">01.05 - 07.05</option>
                <option value="08.05 - 14.05">08.05 - 14.05</option>
                <option value="15.05 - 21.05">15.05 - 21.05</option>
                <option value="22.05 - 28.05">22.05 - 28.05</option>
                <option value="28.05 - 31.05">28.05 - 31.05</option>
              </select>
{/* to be continued... */}
            </th>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
