import React, { useState } from "react";
import WebIcons from "../../assets/images";
import SubscriptionPlan from "../../components/Subscription/SubscriptionPlan";
import ManageSchedule from "./ManageSchedule";

const Dashboard = ({ selectedMonth, setShowDashboard }) => {
  const [employeeSchedules] = useState([
    {
      name: "Mark",
      totalHours: "160 hr 0 min",
      shifts: {
        "2025-05-01": ["08:00-14:00"],
        "2025-05-02": ["08:00-14:00"],
        "2025-05-03": ["08:00-14:00"],
        "2025-05-04": ["14:00-21:00"],
        "2025-05-05": ["14:00-21:00"],
        "2025-05-06": ["08:00-14:00"],
        "2025-05-07": ["16:00-23:00"],
        "2025-05-08": ["08:00-14:00"],
        "2025-05-09": ["10:00-18:00"],
        "2025-05-10": ["14:00-21:00"],
        "2025-05-11": ["16:00-23:00"],
        "2025-05-12": ["08:00-14:00"],
        "2025-05-13": ["08:00-14:00"],
        "2025-05-14": ["10:00-18:00"],
        "2025-05-15": ["14:00-21:00"],
        "2025-05-16": ["16:00-23:00"],
        "2025-05-17": ["08:00-14:00"],
        "2025-05-18": ["10:00-18:00"],
        "2025-05-19": ["14:00-21:00"],
        "2025-05-20": ["16:00-23:00"],
        "2025-05-21": ["08:00-14:00"],
        "2025-05-22": ["10:00-18:00"],
        "2025-05-23": ["14:00-21:00"],
        "2025-05-24": ["16:00-23:00"],
        "2025-05-25": ["08:00-14:00"],
        "2025-05-26": ["10:00-18:00"],
        "2025-05-27": ["14:00-21:00"],
        "2025-05-28": ["16:00-23:00"],
        "2025-05-29": ["08:00-14:00"],
        "2025-05-30": ["10:00-18:00"],
      },
    },
    {
      name: "Oscar",
      totalHours: "155 hr 0 min",
      shifts: {
        "2025-05-01": ["10:00-18:00"],
        "2025-05-02": ["14:00-21:00"],
        "2025-05-03": ["16:00-23:00"],
        "2025-05-04": ["08:00-14:00"],
        "2025-05-05": ["08:00-14:00"],
        "2025-05-06": ["10:00-18:00"],
        "2025-05-07": ["14:00-21:00"],
        "2025-05-08": ["16:00-23:00"],
        "2025-05-09": ["08:00-14:00"],
        "2025-05-10": ["10:00-18:00"],
        "2025-05-11": ["14:00-21:00"],
        "2025-05-12": ["16:00-23:00"],
        "2025-05-13": ["08:00-14:00"],
        "2025-05-14": ["10:00-18:00"],
        "2025-05-15": ["14:00-21:00"],
        "2025-05-16": ["16:00-23:00"],
        "2025-05-17": ["08:00-14:00"],
        "2025-05-18": ["10:00-18:00"],
        "2025-05-19": ["14:00-21:00"],
        "2025-05-20": ["16:00-23:00"],
        "2025-05-21": ["08:00-14:00"],
        "2025-05-22": ["10:00-18:00"],
        "2025-05-23": ["14:00-21:00"],
        "2025-05-24": ["16:00-23:00"],
        "2025-05-25": ["08:00-14:00"],
        "2025-05-26": ["10:00-18:00"],
        "2025-05-27": ["14:00-21:00"],
        "2025-05-28": ["16:00-23:00"],
        "2025-05-29": ["08:00-14:00"],
        "2025-05-30": ["10:00-18:00"],
      },
    },
  ]);

  const [showManageSchedule, setShowManageSchedule] = useState(false);

  const [dateColumns] = useState(
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date(2025, 4, 2 + i);
      return date.toISOString().split("T")[0];
    })
  );

  const shOptionsCss =
    "flex gap-2 items-center justify-center border px-3 py-2 border-Primary";

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  };

  console.log("You select month: ", selectedMonth);

  const getShiftColor = (shift) => {
    if (shift.includes("08:00")) return "bg-[#669bbc]";
    if (shift.includes("10:00")) return "bg-[#f4a261]";
    if (shift.includes("14:00")) return "bg-[#89c2d9]";
    if (shift.includes("16:00")) return "bg-[#9d4edd]";
    return "bg-gray-400";
  };

  // ⭐ Custom select state
  const [selected, setSelected] = useState("Weekly");
  const [open, setOpen] = useState(false);

  const options = [
    { value: "Weekly", icon: WebIcons.scheduleCalender },
    { value: "Monthly", icon: WebIcons.scheduleCalender },
  ];

  const handelSchedule = () => {
    setShowManageSchedule(true); // ✅ fixed
  };

  if (showManageSchedule) {
    return <ManageSchedule setShowManageSchedule={setShowManageSchedule} />;
  }

  return (
    <>
      <div className="w-full p-4 font-Roboto">
        {/* Header */}
        <div className="w-full flex justify-end  my-4 ">
          {/* <h2 className="text-[2rem] font-semibold font-Roboto text-textClr leading-9.5">
            Welcome to <br className="hidden md:block" /> Grafik Master
          </h2> */}
          <button
            onClick={handelSchedule}
            className="flex gap-x-2.5 items-center border px-5 py-2 border-blue-400 cursor-pointer"
          >
            <img className="w-5" src={WebIcons.scheduleCalender} alt="" />
            Manage & Create Schedule
          </button>
        </div>

        <hr className="text-gray-300 mb-4" />

        <div className="flex justify-between">
          <h2
            onClick={() => {
              setShowDashboard(false);
            }}
            className="flex pb-10 items-center gap-2 text-sm lg:text-2xl font-semibold cursor-pointer"
          >
            <img src={WebIcons.scheduleBack} alt="" />
            Previously generated schedules
          </h2>
          <div className="flex gap-2 font-semibold items-center mb-3">
            {/* ⭐ Custom Select */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center border border-Primary px-5 py-2 outline-blue-400 gap-2"
              >
                <img
                  src={options.find((o) => o.value === selected).icon}
                  alt="ico"
                  className="w-4"
                />
                <p>{selected}</p>
              </button>

              {open && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelected(option.value);
                        setOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 hover:bg-gray-100 gap-2"
                    >
                      <img src={option.icon} alt="ico" className="w-4" />
                      <p className="font-Inter font-medium text-textClr">
                        {option.value}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className={shOptionsCss}>
              <img src={WebIcons.scheduleEdit} alt="edit ico" />
              <p className="hidden lg:block font-Inter font-medium text-textClr">
                Edit
              </p>
            </button>
            <button className={shOptionsCss}>
              <img src={WebIcons.scheduleSave} alt="save ico" />
              <p className="hidden lg:block font-Inter font-medium text-textClr">
                Save
              </p>
            </button>
            <button className={shOptionsCss}>
              <img src={WebIcons.scheduleExport} alt="" />
              <p className="hidden lg:block font-Inter font-medium text-textClr">
                Export to PDF
              </p>
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-scroll ">
          <table className="w-full min-w-[900px] border border-[#AAAAAA] rounded-xl">
            <thead>
              <tr className="border border-[#AAAAAA]">
                <th className="border border-[#AAAAAA] px-4 py-2 text-left min-w-[140px]">
                  <select
                    name="timeSelect"
                    id="timeSelect"
                    className="font-normal border border-gray-300 outline-none px-3 py-2 w-full"
                  >
                    <option value="01.05 - 07.05">01.05 - 07.05</option>
                    <option value="08.05 - 14.05">08.05 - 14.05</option>
                    <option value="15.05 - 21.05">15.05 - 21.05</option>
                    <option value="22.05 - 28.05">22.05 - 28.05</option>
                    <option value="28.05 - 31.05">28.05 - 31.05</option>
                  </select>
                </th>
                {dateColumns.map((date) => (
                  <th
                    key={date}
                    className="border border-[#AAAAAA] text-center text-base font-semibold px-2 py-4 min-w-[120px]"
                  >
                    {formatDate(date)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeeSchedules.map((employee) => (
                <tr key={employee.name} className="border border-[#AAAAAA]">
                  <td className="border border-[#AAAAAA] px-2 py-2 whitespace-nowrap text-[14px] font-semibold text-left min-w-[140px]">
                    {employee.name}
                    <div className="text-xs text-gray-500">
                      {employee.totalHours}
                    </div>
                  </td>
                  {dateColumns.map((date) => (
                    <td
                      key={date}
                      className="border border-[#AAAAAA] text-center px-2 py-2 min-w-[120px]"
                    >
                      {(employee.shifts[date] || []).map((shift, idx) => (
                        <div
                          key={idx}
                          className={`text-sm text-white font-medium rounded-[10px] px-2 py-2 ${getShiftColor(
                            shift
                          )}`}
                        >
                          {shift}
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
