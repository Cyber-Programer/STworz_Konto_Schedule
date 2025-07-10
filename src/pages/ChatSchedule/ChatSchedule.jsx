import React, { useState, useRef } from "react";
import WebIcons from "../../assets/images";

// Mock icons since we don't have the actual WebIcons
// const WebIcons = {
//   scheduleBot:
//     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 8V4H8'/%3E%3Crect width='16' height='12' x='4' y='8' rx='2'/%3E%3Cpath d='M2 14h2'/%3E%3Cpath d='M20 14h2'/%3E%3Cpath d='M15 13v2'/%3E%3Cpath d='M9 13v2'/%3E%3C/svg%3E",
//   scheduleSend:
//     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m22 2-7 20-4-9-9-4Z'/%3E%3Cpath d='M22 2 11 13'/%3E%3C/svg%3E",
// };

const ChatSchedule = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user",
      time: "8:14 AM",
      text: "Create a New Schedule for June:\n• Helena: 160 hours, no Thursdays, only first shifts.\n• Oscar: Entire month off.\n• Daniel: 140 hours, only second shifts until June 15, after that, any shift.\n• Mark: 45 hours, only Friday and Saturday.",
      type: "text",
    },
    {
      id: 2,
      sender: "bot",
      time: "8:15 AM",
      text: "Our schedule for June 2025 has been updated.",
      type: "text",
    },
    {
      id: 3,
      sender: "bot",
      time: "8:15 AM",
      type: "table",
    },
    {
      id: 4,
      sender: "bot",
      time: "8:15 AM",
      text: "Should I send this to all employees via email?",
      type: "text",
    },
  ]);

  const [showFullTable, setShowFullTable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);

  const [employeeSchedules, setEmployeeSchedules] = useState([
    {
      name: "Helena",
      shifts: {
        "2025-06-01": ["08:00-14:00"],
        "2025-06-02": ["10:00-18:00"],
        "2025-06-03": ["08:00-14:00"],
        "2025-06-04": ["08:00-14:00"],
        "2025-06-05": ["08:00-14:00"],
        "2025-06-06": ["08:00-14:00"],
        "2025-06-07": ["08:00-14:00"],
      },
    },
    {
      name: "Daniel",
      shifts: {
        "2025-06-01": ["14:00-22:00"],
        "2025-06-02": ["16:00-23:00"],
        "2025-06-03": ["14:00-22:00"],
        "2025-06-04": ["14:00-22:00"],
        "2025-06-05": ["14:00-22:00"],
        "2025-06-06": ["10:00-18:00"],
        "2025-06-07": ["10:00-18:00"],
      },
    },
    {
      name: "Mark",
      shifts: {
        "2025-06-06": ["08:00-14:00"],
        "2025-06-07": ["14:00-22:00"],
      },
    },
  ]);

  const dateColumns = [
    "2025-06-01",
    "2025-06-02",
    "2025-06-03",
    "2025-06-04",
    "2025-06-05",
    "2025-06-06",
    "2025-06-07",
  ];

  const getShiftColor = (shift) => {
    if (shift.includes("08:00")) return "#669bbc";
    if (shift.includes("10:00")) return "#f4a261";
    if (shift.includes("14:00")) return "#89c2d9";
    if (shift.includes("16:00")) return "#9d4edd";
    return "#a3a3a3";
  };

  const tableRef = useRef();

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
      canvas.width = Math.max(1200, tableRect.width) * scale;
      canvas.height = Math.max(800, tableRect.height + 100) * scale;
      ctx.scale(scale, scale);

      // Fill white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

      // Add title
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 20px Arial";
      ctx.fillText("Employee Schedule - June 2025", 20, 30);

      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.fillText(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50);

      // Draw table
      const startY = 70;
      const cellWidth = 120;
      const nameColumnWidth = 100;
      const headerHeight = 40;
      const rowHeight = 50;

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

      // Draw header
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
      ctx.strokeStyle = "#d1d5db";
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

      // Header text
      ctx.fillStyle = "#374151";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "left";
      ctx.fillText("Name", 30, startY + 25);

      dateColumns.forEach((date, index) => {
        const x = 20 + nameColumnWidth + index * cellWidth;
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        ctx.textAlign = "center";
        ctx.fillText(formattedDate, x + cellWidth / 2, startY + 25);
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
        ctx.strokeStyle = "#d1d5db";
        ctx.strokeRect(20, y, nameColumnWidth, rowHeight);

        // Employee name
        ctx.fillStyle = "#1f2937";
        ctx.font = "500 14px Arial";
        ctx.textAlign = "left";
        ctx.fillText(emp.name, 30, y + 28);

        // Shift cells
        dateColumns.forEach((date, dateIndex) => {
          const x = 20 + nameColumnWidth + dateIndex * cellWidth;

          // Cell border
          ctx.strokeRect(x, y, cellWidth, rowHeight);

          const shifts = emp.shifts[date] || [];
          shifts.forEach((shift, shiftIndex) => {
            const shiftY = y + 12 + shiftIndex * 22;
            const badgeWidth = 100;
            const badgeHeight = 18;
            const badgeX = x + (cellWidth - badgeWidth) / 2;

            // Get shift color
            const shiftColor = getShiftColor(shift);

            // Draw colored badge background
            ctx.fillStyle = shiftColor;
            ctx.fillRect(badgeX, shiftY, badgeWidth, badgeHeight);

            // Badge border radius effect (simplified)
            ctx.fillRect(badgeX + 1, shiftY - 1, badgeWidth - 2, 1);
            ctx.fillRect(badgeX + 1, shiftY + badgeHeight, badgeWidth - 2, 1);
            ctx.fillRect(badgeX - 1, shiftY + 1, 1, badgeHeight - 2);
            ctx.fillRect(badgeX + badgeWidth, shiftY + 1, 1, badgeHeight - 2);

            // Shift text
            ctx.fillStyle = "white";
            ctx.font = "bold 11px Arial";
            ctx.textAlign = "center";
            ctx.fillText(shift, badgeX + badgeWidth / 2, shiftY + 13);
          });
        });
      });

      // Load jsPDF and convert canvas to PDF
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
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

          doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

          // Save the PDF
          doc.save("employee-schedule.pdf");

          setExporting(false);
        } catch (error) {
          console.error("PDF generation error:", error);
          alert("PDF export failed. Please try again.");
          setExporting(false);
        }
      };

      script.onerror = () => {
        alert("Failed to load PDF library. Please check your internet connection.");
        setExporting(false);
      };
    } catch (error) {
      console.error("Export error:", error);
      alert("Export failed. Please try again.");
      setExporting(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: input.trim(),
      type: "text",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="font-sans h-screen flex p-8 gap-4 bg-white">

 
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex gap-3 items-center mb-4 border-b border-gray-300 pb-3">
          <img className="w-8 h-8" src={WebIcons.scheduleBot} alt="bot" />
          <p className="font-medium text-textClr text-xl ">ChatBot</p>
        </div>

        {/* Chat Container */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Messages Area */}
          <div className="flex flex-col flex-grow overflow-y-auto rounded-2xl p-4 bg-white mb-4">
            {messages.map((msg) =>
              msg.type === "text" ? (
                <div
                  key={msg.id}
                  className={`flex flex-col mb-3 ${
                    msg.sender === "user" ? "items-end self-end" : "items-start self-start"
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">{msg.time}</div>
                  <div
                    className={`p-3 rounded-lg max-w-96 whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  className="cursor-pointer flex flex-col mb-3 items-start rounded-lg overflow-x-auto"
                  onClick={() => setShowFullTable(true)}
                >
                  <div className="text-xs text-gray-500 mb-1">{msg.time}</div>
                  <table className="min-w-max text-xs border border-gray-300 bg-white rounded-md border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left font-semibold">
                          Name
                        </th>
                        {dateColumns.slice(0, 3).map((date) => (
                          <th key={date} className="border border-gray-300 p-2 font-semibold">
                            {new Date(date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </th>
                        ))}
                        <th className="border border-gray-300 p-2 font-semibold">...</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeSchedules.map((emp) => (
                        <tr key={emp.name}>
                          <td className="border border-gray-300 p-2 font-medium">
                            {emp.name}
                          </td>
                          {dateColumns.slice(0, 3).map((date) => (
                            <td key={date} className="border border-gray-300 p-2">
                              {(emp.shifts[date] || []).map((shift, idx) => (
                                <div
                                  key={idx}
                                  className="text-white p-1 rounded mb-1 text-xs font-semibold text-center"
                                  style={{ backgroundColor: getShiftColor(shift) }}
                                >
                                  {shift}
                                </div>
                              ))}
                            </td>
                          ))}
                          <td className="border border-gray-300 p-2 text-gray-500">
                            +{dateColumns.length - 3} more
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-3 border-2 border-gray-300 rounded-lg p-3 bg-white">
            <input
              type="text"
              placeholder="Enter your message"
              className="flex-grow outline-none text-gray-700 border-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSend}
              className="p-1 bg-none border-none rounded cursor-pointer hover:bg-gray-100"
            >
              <img src={WebIcons.scheduleSend} alt="send" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Employee List Sidebar */}
      <div className={`w-auto min-w-44 max-w-80 border-l border-gray-300 pl-4 overflow-y-auto
    ${showEmployees ? "block" : "hidden"} md:block`}>
        <h3 className="font-semibold text-gray-700 mb-3">Employees</h3>
        {["Helena", "Oscar", "Daniel", "Mark"].map((name) => (
          <div
            key={name}
            className="flex gap-3 items-center mb-3 p-2 rounded-md cursor-pointer hover:bg-gray-100"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white font-semibold">
              {name.charAt(0)}
            </div>
            <span className="text-base text-gray-700">{name}</span>
          </div>
        ))}
      </div>

      {/* Full Table Modal */}
      {showFullTable && (
        <div className="fixed inset-0 p-4 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-7xl max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Full Schedule</h2>
              <button
                onClick={() => setShowFullTable(false)}
                className="text-xl font-bold text-gray-500 bg-none border-none cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
              >
                ✕
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setIsEditable(!isEditable)}
                className={`px-4 py-2 rounded-md border font-medium cursor-pointer ${
                  isEditable
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                }`}
              >
                {isEditable ? "Save" : "Edit"}
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                className={`px-4 py-2 rounded-md border font-medium ${
                  exporting
                    ? "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-white text-yellow-600 border-yellow-500 hover:bg-yellow-50 cursor-pointer"
                }`}
              >
                {exporting ? "Generating PDF..." : "📄 Export to PDF"}
              </button>
            </div>

            {/* Full Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-lg">
              <table
                ref={tableRef}
                className="w-full border-collapse bg-white"
              >
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                      Name
                    </th>
                    {dateColumns.map((date) => (
                      <th
                        key={date}
                        className="border border-gray-300 p-3 font-semibold text-gray-700 text-center"
                      >
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employeeSchedules.map((emp, empIndex) => (
                    <tr key={emp.name} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-medium text-gray-900">
                        {emp.name}
                      </td>
                      {dateColumns.map((date) => (
                        <td key={date} className="border border-gray-300 p-3">
                          {(emp.shifts[date] || []).map((shift, idx) =>
                            isEditable ? (
                              <input
                                key={idx}
                                type="text"
                                value={shift}
                                className="w-full border border-gray-300 p-1 rounded text-gray-900 mb-1"
                                onChange={(e) => {
                                  const updated = [...employeeSchedules];
                                  updated[empIndex].shifts[date][idx] = e.target.value;
                                  setEmployeeSchedules(updated);
                                }}
                              />
                            ) : (
                              <div
                                key={idx}
                                className="text-white p-1.5 rounded mb-1 text-sm font-semibold text-center"
                                style={{ backgroundColor: getShiftColor(shift) }}
                              >
                                {shift}
                              </div>
                            )
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSchedule;


