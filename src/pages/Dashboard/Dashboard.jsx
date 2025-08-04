import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  ArrowLeft,
  Edit,
  Save,
  FileDown,
  AwardIcon,
} from "lucide-react";
import ManageSchedule from "./ManageSchedule";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { getToken } from "../../utils/helper";

const Dashboard = ({ setShowDashboard, selectedMonth, selectedYear }) => {
  const { t } = useTranslation();
  const [employeeSchedules, setEmployeeSchedules] = useState([]);
  // Employee Schedule array -> obj
  // {
  //     name: "Mark",
  //     shifts: {
  //       "2025-05-01": ["08:00-14:00"],
  //       "2025-05-02": ["08:00-14:00"],
  //       "2025-05-03": ["08:00-14:00"],
  //       "2025-05-04": ["14:00-21:00"],
  //     }
  //   }
  const token = getToken(import.meta.env.VITE_ACCESS_TOKEN_KEY);
  const [isEditable, setIsEditable] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showManageSchedule, setShowManageSchedule] = useState(false);
  const [selected, setSelected] = useState("Weekly"); // weekly or monthly state { weekly , monthly }
  const [open, setOpen] = useState(false);
  const [monthName, setMonthName] = useState(
    selectedMonth?.label?.toLowerCase() || "may"
  );
  const [previousMonthName, setPreviousMonthName] = useState(monthName);
  const [showMonthName, setShowMonthName] = useState(false);

  const tableRef = useRef();

  const [dateColumns] = useState(
    Array.from({ length: 31 }, (_, i) => {
      const date = new Date(2025, 4, 2 + i);
      return date.toISOString().split("T")[0];
    })
  );

  const options = [{ value: "Weekly" }, { value: "Monthly" }]; // {weekly or monthly}

  const months = [
    { value: "january" },
    { value: "february" },
    { value: "march" },
    { value: "april" },
    { value: "may" },
    { value: "june" },
    { value: "july" },
    { value: "august" },
    { value: "september" },
    { value: "october" },
    { value: "november" },
    { value: "december" },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const getShiftColor = (shift) => {
    if (shift.includes("08:00")) return "#71A3B7";
    if (shift.includes("10:00")) return "#97CBFD";
    if (shift.includes("14:00")) return "#A68BFB";
    if (shift.includes("16:00")) return "#F59F67";
    if (shift.includes("off")) return "#d1d5dc";
    return "#a3a3a3";
  };

  const getShiftColorClass = (shift) => {
    if (shift.includes("08:00")) return "bg-[#71A3B7]"; // #71A3B7
    if (shift.includes("10:00")) return "bg-[#97CBFD]"; // #97CBFD
    if (shift.includes("14:00")) return "bg-[#A68BFB]"; // #A68BFB
    if (shift.includes("16:00")) return "bg-[#F59F67]"; // #F59F67
    return "bg-gray-400";
  };

  const onChange = async () => {
    try {
      console.log(monthName); // Log current month name
      const res = await baseApi.get(
        ENDPOINTS.VIEW_SCHEDULE(selectedYear, monthName, selected),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Process the response and update state
      if (res.data.data) {
        // Transform the response data into the desired structure

        // -----------------------------------------------------------
        // const newRes = res?.data?.data?.schedules.map((emp) => ({
        //   id: emp.employee_id,
        //   name: emp.employee_name,
        //   email: emp.employee_email,
        //   view_type: emp.view_type,
        //   month: emp.month,
        //   year: emp.year,
        //   week: emp.week,
        //   shifts: emp.schedule_data.reduce((acc, schedule) => {
        //     const formattedDate = schedule.date; // the date from API like "01:08:2025"
        //     if (!acc[formattedDate]) {
        //       acc[formattedDate] = []; // Initialize an empty array if this date is not yet present
        //     }
        //     acc[formattedDate].push(schedule.shift); // Add the shift to the array for this date
        //     return acc;
        //   }, {}),
        // }));
        // -----------------------------------------------------------

        // Log the formatted response to check the output
        const resData = res?.data?.data;

        const scheduleData = resData.map((emp) => ({
          name: emp.employee.name,
          shifts: emp.schedule.reduce((acc, schedule) => {
            const date = schedule.date; // Keep the date in its original format
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(schedule.shift); // Add shift to the corresponding date
            return acc; // Return the accumulator
          }, {}),
        }));

        console.log(scheduleData);
        setEmployeeSchedules(scheduleData);

        // console.log(scheduleData);

        // Now you can use newRes to set your state for employeeSchedules or do other necessary operations
        // setEmployeeSchedules(newRes); // Assuming you want to store this in state
      }
      console.log(res.data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        error.message;
      toast.error(`Fetch Error: ${errorMessage}`);
      console.log(error);
    }
  };

  const updateSchedule = async () => {
    try {
      const aiRequestId = 7; // Example ai_request_id, replace it as needed

      // Prepare the schedule data to send to the API
      const schedulesData = employeeSchedules.map((emp) => ({
        employee_id: emp.id, // Assuming employee has an 'id' field
        schedule_data: Object.entries(emp.shifts).map(([date, shifts]) => ({
          date,
          shift: shifts[0], // Assuming only one shift per date, adjust accordingly if multiple shifts
        })),
      }));

      const updateData = {
        ai_request_id: aiRequestId,
        schedules: schedulesData,
      };

      // Call the API to update the schedule
      const response = await baseApi.post(
        ENDPOINTS.UPDATE_SCHEDULE,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      if (response.status === 200) {
        toast.success("Schedule updated successfully!");
      } else {
        toast.error("Failed to update the schedule.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        error.message;

      toast.error(`Error: ${errorMessage}`);
      console.error(error);
    }
  };

  const handleExport = async () => {
    if (!tableRef.current) return;

    setExporting(true);

    try {
      // Create a canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Optimized dimensions with reduced padding
      const nameColumnWidth = 120;
      const cellWidth = 110;
      const totalColumns = dateColumns.length;
      const headerHeight = 50;
      const rowHeight = 50;
      const topMargin = 80;
      const sideMargin = 15;

      const totalWidth =
        sideMargin * 2 + nameColumnWidth + totalColumns * cellWidth;
      const totalHeight =
        topMargin + headerHeight + employeeSchedules.length * rowHeight + 20;

      // Set canvas size with proper scaling
      const scale = 2;
      canvas.width = totalWidth * scale;
      canvas.height = totalHeight * scale;
      ctx.scale(scale, scale);

      // Fill white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      // Add compact title
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 20px Arial";
      ctx.fillText("Employee Schedule Dashboard", sideMargin, 25);

      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.fillText(
        `Period: 01.05 - 31.05 (${selected} View) | Generated: ${new Date().toLocaleDateString()}`,
        sideMargin,
        45
      );

      // Draw table starting position
      const startY = topMargin;

      // Draw table border and headers with UI-like styling
      ctx.strokeStyle = "#D1D5DB";
      ctx.lineWidth = 1;

      // Draw header background
      ctx.fillStyle = "#F9FAFB";
      ctx.fillRect(
        sideMargin,
        startY,
        nameColumnWidth + totalColumns * cellWidth,
        headerHeight
      );

      // Draw header borders
      ctx.strokeRect(
        sideMargin,
        startY,
        nameColumnWidth + totalColumns * cellWidth,
        headerHeight
      );

      // Header vertical lines
      ctx.strokeRect(sideMargin, startY, nameColumnWidth, headerHeight);
      dateColumns.forEach((_, index) => {
        const x = sideMargin + nameColumnWidth + index * cellWidth;
        ctx.strokeRect(x, startY, cellWidth, headerHeight);
      });

      // Header text - Name column
      ctx.fillStyle = "#374151";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "left";
      ctx.fillText("Employee", sideMargin + 8, startY + 32);

      // Header text - Date columns (matching UI format)
      ctx.textAlign = "center";
      dateColumns.forEach((date, index) => {
        const x = sideMargin + nameColumnWidth + index * cellWidth;
        const formattedDate = formatDate(date);

        ctx.fillStyle = "#374151";
        ctx.font = "bold 12px Arial";
        ctx.fillText(formattedDate, x + cellWidth / 2, startY + 32);
      });

      // Draw employee rows
      employeeSchedules.forEach((emp, empIndex) => {
        const y = startY + headerHeight + empIndex * rowHeight;

        // Row background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          sideMargin,
          y,
          nameColumnWidth + dateColumns.length * cellWidth,
          rowHeight
        );

        // Row borders
        ctx.strokeStyle = "#D1D5DB";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          sideMargin,
          y,
          nameColumnWidth + dateColumns.length * cellWidth,
          rowHeight
        );

        // Name cell
        ctx.strokeRect(sideMargin, y, nameColumnWidth, rowHeight);

        // Employee name and hours
        ctx.fillStyle = "#1f2937";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "left";
        ctx.fillText(emp.name, sideMargin + 8, y + 25);

        ctx.fillStyle = "#6b7280";
        ctx.font = "10px Arial";
        ctx.fillText(emp.totalHours, sideMargin + 8, y + 42);

        // Draw shift cells for ALL dates
        dateColumns.forEach((date, dateIndex) => {
          const x = sideMargin + nameColumnWidth + dateIndex * cellWidth;

          // Cell border
          ctx.strokeRect(x, y, cellWidth, rowHeight);

          const shifts = emp.shifts[date] || [];
          shifts.forEach((shift, shiftIndex) => {
            const shiftY = y + 10 + shiftIndex * 25;
            const badgeWidth = cellWidth - 12;
            const badgeHeight = 22;
            const badgeX = x + 6;

            // Shift background color with rounded corners effect
            const shiftColor = getShiftColor(shift);
            ctx.fillStyle = shiftColor;

            // Draw rounded rectangle
            const radius = 8;
            ctx.beginPath();
            ctx.moveTo(badgeX + radius, shiftY);
            ctx.lineTo(badgeX + badgeWidth - radius, shiftY);
            ctx.quadraticCurveTo(
              badgeX + badgeWidth,
              shiftY,
              badgeX + badgeWidth,
              shiftY + radius
            );
            ctx.lineTo(badgeX + badgeWidth, shiftY + badgeHeight - radius);
            ctx.quadraticCurveTo(
              badgeX + badgeWidth,
              shiftY + badgeHeight,
              badgeX + badgeWidth - radius,
              shiftY + badgeHeight
            );
            ctx.lineTo(badgeX + radius, shiftY + badgeHeight);
            ctx.quadraticCurveTo(
              badgeX,
              shiftY + badgeHeight,
              badgeX,
              shiftY + badgeHeight - radius
            );
            ctx.lineTo(badgeX, shiftY + radius);
            ctx.quadraticCurveTo(badgeX, shiftY, badgeX + radius, shiftY);
            ctx.closePath();
            ctx.fill();

            // Shift text
            ctx.fillStyle = "white";
            ctx.font = "bold 10px Arial";
            ctx.textAlign = "center";
            ctx.fillText(shift, badgeX + badgeWidth / 2, shiftY + 15);
          });
        });
      });

      // Load jsPDF and generate
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
            format: "a3",
          });

          const imgData = canvas.toDataURL("image/png");
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          // Optimize PDF margins
          const pdfMargin = 5;
          const availableWidth = pageWidth - pdfMargin * 2;
          const availableHeight = pageHeight - pdfMargin * 2;

          const imgWidth = availableWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let finalWidth = imgWidth;
          let finalHeight = imgHeight;

          if (imgHeight > availableHeight) {
            finalHeight = availableHeight;
            finalWidth = (canvas.width * finalHeight) / canvas.height;
          }

          doc.addImage(
            imgData,
            "PNG",
            pdfMargin,
            pdfMargin,
            finalWidth,
            finalHeight
          );

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

  if (showManageSchedule) {
    return <ManageSchedule setShowManageSchedule={setShowManageSchedule} />;
  }

  const HandleSave = async () => {
    await updateSchedule(); // Call the update schedule function
    setIsEditable(false); // Disable edit mode after saving
  };

  // auto Call
  useEffect(() => {
    onChange();
  }, []);

  useEffect(() => {
    if (monthName !== previousMonthName) {
      // If month changed, call the onChange function
      onChange();
      setPreviousMonthName(monthName); // Update previous month to current month
    }
  }, [monthName, selected]); // Re-run when monthName or selected view type changes

  return (
    <div className="w-full p-4 font-Inter">
      {/* Header */}
      <div className="w-full flex justify-end my-4">
        <button
          onClick={() => setShowManageSchedule(true)}
          className="flex gap-x-2.5 items-center border px-5 py-2 border-blue-400 cursor-pointer hover:bg-blue-50"
        >
          <Calendar className="w-5 h-5" />
          {t("dashboard.manage&createSch")}
        </button>
      </div>

      <hr className="text-gray-300 mb-4" />

      <div className="flex flex-col lg:flex-row justify-between flex-wrap">
        <h2
          onClick={() => {
            setShowDashboard(false);
          }}
          className="flex pb-10 items-center gap-2 text-lg lg:text-2xl font-semibold cursor-pointer hover:text-blue-600"
        >
          <ArrowLeft className="w-6 h-6" />
          {t("dashboard.prevGeneratedSch")}
        </h2>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-2 font-semibold items-start justify-start mb-3">
          <div className="flex gap-2 items-center flex-wrap mb-2.5 lg:mb-0">
            {/* Month selector */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => {
                  setShowMonthName(!showMonthName);
                }}
                className="w-[130px] flex items-center border border-blue-500 px-5 py-2 outline-blue-400 gap-2 cursor-pointer hover:bg-blue-50"
              >
                <Calendar className="w-4 h-4" />
                {t(
                  `months.${
                    monthName.charAt(0).toUpperCase() + monthName.slice(1)
                  }`
                )}
              </button>
              {showMonthName && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg">
                  {months.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setMonthName(option.value);
                        setShowMonthName(false);
                        console.log(option.value);
                      }}
                      className="flex items-center w-max px-2 py-2 hover:bg-gray-100 gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <p className="font-medium text-gray-700 capitalize">
                        {t(
                          `months.${
                            option.value.charAt(0).toUpperCase() +
                            option.value.slice(1)
                          }`
                        )}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Weekly/Monthly selector */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center border border-blue-500 px-5 py-2 outline-blue-400 gap-2 cursor-pointer hover:bg-blue-50"
              >
                <Calendar className="w-4 h-4" />
                <p>{t(`dashboard.${selected.toLowerCase()}`)}</p>
              </button>

              {open && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelected(option.value);
                        setOpen(false);
                        onChange();
                      }}
                      className="flex items-center w-full px-3 py-2 hover:bg-gray-100 gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      {t(`dashboard.${option.value.toLowerCase()}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <button
              onClick={() => setIsEditable(true)}
              className={`flex gap-2 items-center cursor-pointer justify-center border px-3 py-2 border-blue-500 hover:bg-blue-50 ${
                isEditable ? "bg-blue-100" : ""
              }`}
            >
              <Edit className="w-4 h-4" />
              <p className="font-medium text-gray-700">{t("dashboard.edit")}</p>
            </button>

            <button
              onClick={() => {
                setIsEditable(false);
                // HandleSave();
              }}
              className="flex gap-2 items-center cursor-pointer md:justify-center border px-3 py-2 border-blue-500 hover:bg-green-50"
            >
              <Save className="w-4 h-4" />
              <p className=" font-medium text-gray-700">
                {t("dashboard.save")}
              </p>
            </button>

            <button
              onClick={handleExport}
              disabled={exporting}
              className={`flex gap-2 items-center cursor-pointer justify-center border px-3 py-2 border-blue-500 ${
                exporting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-yellow-50"
              }`}
            >
              <FileDown className="w-4 h-4" />
              <p className=" font-medium text-gray-700">
                {/* {exporting ? "Generating PDF..." : "Export to PDF"} */}
                {exporting
                  ? t("dashboard.generatingPdf")
                  : t("dashboard.exportPdf")}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className="w-full min-w-[900px] border border-gray-400 rounded-xl"
        >
          <thead>
            <tr className="border border-gray-400">
              <th className="border border-gray-400 px-2 py-2 text-left min-w-[140px]">
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
                  className="border border-gray-400 text-center text-base font-semibold px-2 py-4 min-w-[120px]"
                >
                  {formatDate(date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employeeSchedules.map((employee) => (
              <tr key={employee.name} className="border border-gray-400">
                <td className="border border-gray-400 px-2 py-2 whitespace-nowrap text-[14px] font-semibold text-left min-w-[140px]">
                  {employee.name}
                  <div className="text-xs text-gray-500">
                    {employee.totalHours}
                  </div>
                </td>
                {dateColumns.map((date) => (
                  <td
                    key={date}
                    className="border border-gray-400 text-center px-2 py-2 min-w-[120px]"
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
