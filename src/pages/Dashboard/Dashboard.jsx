import React, { useState } from "react";

const Dashboard = () => {
  const [dateColumns, setDateColumns] = useState([
    "2025-05-01",
    "2025-05-02",
    "2025-05-03",
    "2025-05-04",
    "2025-05-05",
    "2025-05-06",
    "2025-05-07",
  ]);

  const [employeeSchedules, setEmployeeSchedules] = useState([
    {
      name: "Mark",
      totalHours: "40 hr 10 min",
      shifts: {
        "2025-05-01": ["08:00-14:00", "16:00-23:00"],
        "2025-05-02": ["08:00-14:00"],
        "2025-05-03": ["10:00-18:00"],
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
        "2025-05-04": ["08:00-14:00", "14:00-21:00"],
        "2025-05-06": ["10:00-18:00"],
      },
    },
    {
      name: "Daniel",
      totalHours: "47 hr 10 min",
      shifts: {
        "2025-05-01": ["16:00-23:00"],
        "2025-05-03": ["08:00-14:00"],
        "2025-05-05": ["10:00-18:00"],
        "2025-05-06": ["16:00-23:00"],
        "2025-05-07": ["08:00-14:00"],
      },
    },
    {
      name: "Helena",
      totalHours: "32 hr 0 min",
      shifts: {
        "2025-05-02": ["08:00-14:00"],
        "2025-05-03": ["10:00-18:00"],
        "2025-05-05": ["08:00-14:00"],
        "2025-05-06": ["10:00-18:00"],
      },
    },
    {
      name: "Jay Park",
      totalHours: "29 hr 30 min",
      shifts: {
        "2025-05-01": ["10:00-18:00"],
        "2025-05-04": ["08:00-14:00"],
        "2025-05-05": ["16:00-23:00"],
        "2025-05-07": ["10:00-18:00"],
      },
    },
  ]);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  }

  function getShiftColor(shift) {
    if (shift.includes("08:00") || shift.includes("8:00"))
      return "bg-[#669bbc]"; // morning
    if (shift.includes("10:00")) return "bg-[#f4a261]"; // mid
    if (shift.includes("16:00")) return "bg-[#9d4edd]"; // evening
    if (shift.includes("14:00")) return "bg-[#89c2d9]"; // late morning
    return "bg-gray-400"; // default
  }

  return (
    <div className="overflow-auto p-4">
      <table className="table-auto border-collapse border-gray-500">
        <thead>
          <tr>
            <th className="border px-4 py-2 whitespace-nowrap text-left">
              Employee
            </th>
            <th className="border px-4 py-2 whitespace-nowrap text-left">
              Total Hours
            </th>
            {dateColumns.map((date) => (
              <th
                key={date}
                className="border px-4 py-2 whitespace-nowrap text-sm text-center"
              >
                {formatDate(date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employeeSchedules.map((employee) => (
            <tr key={employee.name}>
              <td className="border px-4 py-2 align-top">
                <span className="font-semibold">{employee.name}</span>
              </td>
              <td className="border px-4 py-2 align-top text-sm text-gray-500 whitespace-nowrap">
                {employee.totalHours}
              </td>
              {dateColumns.map((date) => (
                <td
                  key={date}
                  className="border px-2 py-2 align-top text-center"
                >
                  <div className="flex flex-col gap-1 items-center">
                    {(employee.shifts[date] || []).map((shift, idx) => (
                      <div
                        key={idx}
                        className={`text-xs text-white rounded px-2 py-1 ${getShiftColor(
                          shift
                        )}`}
                      >
                        {shift}
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
