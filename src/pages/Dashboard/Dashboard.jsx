import React, { useState, useRef } from "react";

// Mock WebIcons since we don't have the actual implementation
const WebIcons = {
  scheduleCalender:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='4' rx='2' ry='2'/%3E%3Cline x1='16' x2='16' y1='2' y2='6'/%3E%3Cline x1='8' x2='8' y1='2' y2='6'/%3E%3Cline x1='3' x2='21' y1='10' y2='10'/%3E%3C/svg%3E",
  scheduleBack:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m12 19-7-7 7-7'/%3E%3Cpath d='M19 12H5'/%3E%3C/svg%3E",
  scheduleEdit:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'/%3E%3C/svg%3E",
  scheduleSave:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'/%3E%3Cpolyline points='17,21 17,13 7,13 7,21'/%3E%3Cpolyline points='7,3 7,8 15,8'/%3E%3C/svg%3E",
  scheduleExport:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14,2 14,8 20,8'/%3E%3Cline x1='16' x2='8' y1='13' y2='13'/%3E%3Cline x1='16' x2='8' y1='17' y2='17'/%3E%3Cpolyline points='10,9 9,9 8,9'/%3E%3C/svg%3E",
};

const Dashboard = ({
  selectedMonth = "May 2025",
  setShowDashboard = () => {},
}) => {
  const [employeeSchedules, setEmployeeSchedules] = useState([
    // Your original two
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
    // Add 20 more employees below
    ...Array.from({ length: 20 }, (_, i) => ({
      name: `Employee ${i + 3}`,
      totalHours: `${140 + (i % 5) * 5} hr 0 min`,
      shifts: {
        "2025-05-01": ["08:00-14:00"],
        "2025-05-02": ["10:00-18:00"],
        "2025-05-03": ["14:00-21:00"],
        "2025-05-04": ["16:00-23:00"],
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
    })),
  ]);

  const [isEditable, setIsEditable] = useState(false);
  const [showManageSchedule, setShowManageSchedule] = useState(false);
  const [exporting, setExporting] = useState(false);

  const tableRef = useRef();

  const [dateColumns] = useState(
    Array.from({ length: 30 }, (_, i) => {
      const date = new Date(2025, 4, 2 + i);
      return date.toISOString().split("T")[0];
    })
  );

  const shOptionsCss =
    "flex gap-2 items-center cursor-pointer justify-center border px-3 py-2 border-blue-500";

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const getShiftColor = (shift) => {
    if (shift.includes("08:00")) return "#669bbc";
    if (shift.includes("10:00")) return "#f4a261";
    if (shift.includes("14:00")) return "#89c2d9";
    if (shift.includes("16:00")) return "#9d4edd";
    return "#a3a3a3";
  };

  const getShiftColorClass = (shift) => {
    if (shift.includes("08:00")) return "bg-[#669bbc]";
    if (shift.includes("10:00")) return "bg-[#f4a261]";
    if (shift.includes("14:00")) return "bg-[#89c2d9]";
    if (shift.includes("16:00")) return "bg-[#9d4edd]";
    return "bg-gray-400";
  };

  // Custom select state
  const [selected, setSelected] = useState("Weekly");
  const [open, setOpen] = useState(false);
  const [monthName, setMonthName] = useState("january");
  const [showMonthName, setShowMonthName] = useState(false);

  const options = [
    { value: "Weekly", icon: WebIcons.scheduleCalender },
    { value: "Monthly", icon: WebIcons.scheduleCalender },
  ];

  const months = [
    { value: "january", icon: WebIcons.scheduleCalender },
    { value: "february", icon: WebIcons.scheduleCalender },
    { value: "march", icon: WebIcons.scheduleCalender },
    { value: "april", icon: WebIcons.scheduleCalender },
    { value: "may", icon: WebIcons.scheduleCalender },
    { value: "june", icon: WebIcons.scheduleCalender },
    { value: "july", icon: WebIcons.scheduleCalender },
    { value: "august", icon: WebIcons.scheduleCalender },
    { value: "september", icon: WebIcons.scheduleCalender },
    { value: "october", icon: WebIcons.scheduleCalender },
    { value: "november", icon: WebIcons.scheduleCalender },
    { value: "december", icon: WebIcons.scheduleCalender },
  ];

  const handleExport = async () => {
    if (!tableRef.current) return;

    setExporting(true);

    try {
      // Create a canvas to capture the table
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Get table element and its computed styles
      const table = tableRef.current;
      const tableRect = table.getBoundingClientRect();

      // Set canvas size with higher resolution for better quality
      const scale = 2;
      canvas.width = Math.max(1400, tableRect.width) * scale;
      canvas.height = Math.max(1000, tableRect.height + 150) * scale;
      ctx.scale(scale, scale);

      // Fill white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

      // Add title
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 24px Arial";
      ctx.fillText("Employee Schedule Dashboard", 20, 35);

      ctx.fillStyle = "#6b7280";
      ctx.font = "14px Arial";
      ctx.fillText(`Period: 01.05 - 07.05 (${selected} View)`, 20, 60);
      ctx.fillText(`Generated on: ${new Date().toLocaleDateString()}`, 20, 80);

      // Draw table
      const startY = 100;
      const cellWidth = 150;
      const nameColumnWidth = 120;
      const headerHeight = 50;
      const rowHeight = 80;

      // Helper function to convert hex to RGB
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
          : null;
      };

      // Draw header row
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(20, startY, nameColumnWidth, headerHeight);
      dateColumns.forEach((_, index) => {
        ctx.fillRect(
          20 + nameColumnWidth + index * cellWidth,
          startY,
          cellWidth,
          headerHeight
        );
      });

      // Header borders
      ctx.strokeStyle = "#AAAAAA";
      ctx.lineWidth = 1;
      ctx.strokeRect(20, startY, nameColumnWidth, headerHeight);
      dateColumns.forEach((_, index) => {
        ctx.strokeRect(
          20 + nameColumnWidth + index * cellWidth,
          startY,
          cellWidth,
          headerHeight
        );
      });

      // Header text - Time Period
      ctx.fillStyle = "#374151";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "left";
      ctx.fillText("01.05 - 07.05", 25, startY + 30);

      // Header text - Dates
      dateColumns.forEach((date, index) => {
        const x = 20 + nameColumnWidth + index * cellWidth;
        const formattedDate = formatDate(date);
        ctx.textAlign = "center";
        ctx.fillText(formattedDate, x + cellWidth / 2, startY + 30);
      });

      // Draw employee rows
      employeeSchedules.forEach((emp, empIndex) => {
        const y = startY + headerHeight + empIndex * rowHeight;

        // Row background (alternating)
        ctx.fillStyle = empIndex % 2 === 0 ? "#ffffff" : "#f9fafb";
        ctx.fillRect(
          20,
          y,
          nameColumnWidth + dateColumns.length * cellWidth,
          rowHeight
        );

        // Name cell border
        ctx.strokeStyle = "#AAAAAA";
        ctx.strokeRect(20, y, nameColumnWidth, rowHeight);

        // Employee name and hours
        ctx.fillStyle = "#1f2937";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "left";
        ctx.fillText(emp.name, 25, y + 25);

        ctx.fillStyle = "#6b7280";
        ctx.font = "12px Arial";
        ctx.fillText(emp.totalHours, 25, y + 45);

        // Shift cells
        dateColumns.forEach((date, dateIndex) => {
          const x = 20 + nameColumnWidth + dateIndex * cellWidth;

          // Cell border
          ctx.strokeRect(x, y, cellWidth, rowHeight);

          const shifts = emp.shifts[date] || [];
          shifts.forEach((shift, shiftIndex) => {
            const shiftY = y + 15 + shiftIndex * 30;
            const badgeWidth = 120;
            const badgeHeight = 25;
            const badgeX = x + (cellWidth - badgeWidth) / 2;

            // Get shift color
            const shiftColor = getShiftColor(shift);

            // Draw colored badge background
            ctx.fillStyle = shiftColor;
            ctx.fillRect(badgeX, shiftY, badgeWidth, badgeHeight);

            // Badge border radius effect (simplified)
            ctx.fillRect(badgeX + 2, shiftY - 1, badgeWidth - 4, 1);
            ctx.fillRect(badgeX + 2, shiftY + badgeHeight, badgeWidth - 4, 1);
            ctx.fillRect(badgeX - 1, shiftY + 2, 1, badgeHeight - 4);
            ctx.fillRect(badgeX + badgeWidth, shiftY + 2, 1, badgeHeight - 4);

            // Shift text
            ctx.fillStyle = "white";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(shift, badgeX + badgeWidth / 2, shiftY + 16);
          });
        });
      });

      // Load jsPDF and convert canvas to PDF
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      document.head.appendChild(script);

      script.onload = () => {
        try {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
          });

          // Convert canvas to image and add to PDF
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 277; // A4 landscape width in mm minus margins
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          doc.addImage(
            imgData,
            "PNG",
            10,
            10,
            imgWidth,
            Math.min(imgHeight, 180)
          );

          // Save the PDF
          doc.save(
            `employee-schedule-dashboard-${
              new Date().toISOString().split("T")[0]
            }.pdf`
          );

          setExporting(false);
        } catch (error) {
          console.error("PDF generation error:", error);
          alert("PDF export failed. Please try again.");
          setExporting(false);
        }
      };

      script.onerror = () => {
        alert(
          "Failed to load PDF library. Please check your internet connection."
        );
        setExporting(false);
      };
    } catch (error) {
      console.error("Export error:", error);
      alert("Export failed. Please try again.");
      setExporting(false);
    }
  };

  const handelSchedule = () => {
    setShowManageSchedule(true);
  };

  if (showManageSchedule) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Manage Schedule Component</h2>
        <button
          onClick={() => setShowManageSchedule(false)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full p-4 font-sans cursor-pointer">
      {/* Header */}
      <div className="w-full flex justify-end my-4">
        <button
          onClick={handelSchedule}
          className="flex gap-x-2.5 items-center border px-5 py-2 border-blue-400 cursor-pointer hover:bg-blue-50"
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
          className="flex pb-10 items-center gap-2 text-sm lg:text-2xl font-semibold cursor-pointer hover:text-blue-600"
        >
          <img src={WebIcons.scheduleBack} alt="" />
          Previously generated schedules
        </h2>
        {/* month name */}
        <div className="flex gap-2 font-semibold items-center mb-3">
          <div className="relative inline-block text-left">
            <button
              onClick={() => {
                setShowMonthName(!showMonthName);
              }}
              className="w-[130px] flex items-center border border-blue-500 px-5 py-2 outline-blue-400 gap-2 cursor-pointer hover:bg-blue-50"
            >
              <img
                src={options.find((o) => o.value === selected).icon}
                alt="ico"
                className="w-4"
              />
              <p>{monthName}</p>
            </button>
            {showMonthName && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg">
                {months.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setMonthName(option.value);
                      setShowMonthName(false);
                    }}
                    className="flex items-center w-full px-2 py-2 hover:bg-gray-100 gap-2 cursor-pointer"
                  >
                    <img src={option.icon} alt="ico" className="w-4" />
                    <p className="font-medium text-gray-700">{option.value}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Custom Select */} {/* weekly */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center border border-blue-500 px-5 py-2 outline-blue-400 gap-2 cursor-pointer hover:bg-blue-50"
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
                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100 gap-2 cursor-pointer"
                  >
                    <img src={option.icon} alt="ico" className="w-4" />
                    <p className="font-medium text-gray-700">{option.value}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsEditable(true);
            }}
            className={`${shOptionsCss} hover:bg-blue-50 ${
              isEditable ? "bg-blue-100" : ""
            }`}
          >
            <img src={WebIcons.scheduleEdit} alt="edit ico" />
            <p className="hidden lg:block font-medium text-gray-700">Edit</p>
          </button>
          <button
            onClick={() => {
              setIsEditable(false);
            }}
            className={`${shOptionsCss} hover:bg-green-50`}
          >
            <img src={WebIcons.scheduleSave} alt="save ico" />
            <p className="hidden lg:block font-medium text-gray-700">Save</p>
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className={`${shOptionsCss} ${
              exporting ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-50"
            }`}
          >
            <img src={WebIcons.scheduleExport} alt="" />
            <p className="hidden lg:block font-medium text-gray-700">
              {exporting ? "Generating PDF..." : "Export to PDF"}
            </p>
          </button>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className="w-full min-w-[900px] border border-[#AAAAAA] rounded-xl"
        >
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
                      <div key={idx} className="mb-1">
                        {isEditable ? (
                          <input
                            type="text"
                            value={shift}
                            className="w-full border border-gray-500 px-1 py-1 rounded bg-white text-black text-sm"
                            onChange={(e) => {
                              const newSchedules = [...employeeSchedules];
                              const employeeIndex = employeeSchedules.findIndex(
                                (e) => e.name === employee.name
                              );
                              newSchedules[employeeIndex].shifts[date][idx] =
                                e.target.value;
                              setEmployeeSchedules(newSchedules);
                            }}
                          />
                        ) : (
                          <div
                            className={`text-sm text-white font-medium rounded-[10px] px-2 py-2 h-[54px] flex items-center justify-center ${getShiftColorClass(
                              shift
                            )}`}
                          >
                            {shift}
                          </div>
                        )}
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
  );
};

export default Dashboard;
