import React from "react";

const ScheduleTable = ({ employeeSchedules, dateColumns }) => {
  const getShiftColor = (shift) => {
    if (shift.includes("08:00")) return "bg-[#669bbc]";
    if (shift.includes("10:00")) return "bg-[#f4a261]";
    if (shift.includes("14:00")) return "bg-[#89c2d9]";
    if (shift.includes("16:00")) return "bg-[#9d4edd]";
    return "bg-gray-400";
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
  };

  return (
    <div className="overflow-x-scroll w-full">
      <table className="w-full min-w-[600px] border border-[#AAAAAA] rounded-xl">
        <thead>
          <tr>
            <th className="border px-2 py-2 text-left">Name</th>
            {dateColumns.map((date) => (
              <th key={date} className="border text-center px-2 py-2 min-w-[80px]">
                {formatDate(date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employeeSchedules.map((employee) => (
            <tr key={employee.name}>
              <td className="border px-2 py-1 text-sm font-semibold">{employee.name}</td>
              {dateColumns.map((date) => (
                <td key={date} className="border px-2 py-1">
                  {(employee.shifts[date] || []).map((shift, idx) => (
                    <div
                      key={idx}
                      className={`text-xs text-white font-medium rounded px-1 py-1 ${getShiftColor(shift)}`}
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
  );
};

export default ScheduleTable;
