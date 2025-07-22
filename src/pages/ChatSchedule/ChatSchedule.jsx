import React, { useState, useRef, useEffect, use } from "react";
import WebIcons from "../../assets/images";
import getCaretCoordinates from "textarea-caret";

const ChatSchedule = () => {
  const [input, setInput] = useState("");
  const [showFullTable, setShowFullTable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [exporting, setExporting] = useState(false);
  // const [lastAt, setLastAt] = useState(0);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [MentionBoxPosition, setMentionBoxPosition] = useState({});
  const [showMentionBox, setShowMentionBox] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
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
  const dateColumns = [
    "2025-06-01",
    "2025-06-02",
    "2025-06-03",
    "2025-06-04",
    "2025-06-05",
    "2025-06-06",
    "2025-06-07",
  ];
  const employeList = ["sifat", "rifat", "jubayel", "jannat", "rafi", "joshim"];
  const getShiftColor = (shift) => {
    if (shift.includes("08:00")) return "#669bbc";
    if (shift.includes("10:00")) return "#f4a261";
    if (shift.includes("14:00")) return "#89c2d9";
    if (shift.includes("16:00")) return "#9d4edd";
    return "#a3a3a3";
  };

  const tableRef = useRef(null);
  const inputRef = useRef(null);
  const chatDiv = useRef(null);

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
  const handleChatScroll = () => {
    chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
  };

  useEffect(() => {
    handleChatScroll()
  }, [messages]);

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

  // On Enter call handleSend function..
  const handleKeyPress = (e) => {
    setInput(e.target.value);

    // function for 'ctrl' + 'space' key
    if (e.ctrlKey && e.key === " ") {
      setShowMentionBox(true);
    }

    if (showMentionBox) {
      // function for 'arrow down' key
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filterEmployees.length);
        console.log(selectedIndex);
      }

      // function for 'arrow up ' key
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filterEmployees.length) % filterEmployees.length
        );
        console.log(selectedIndex);
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const selectedName = filterEmployees[selectedIndex];
        const cursorPosition = inputRef.current.selectionEnd;
        const textBeforeCursor = input.slice(0, cursorPosition);
        // const textAfterCursor = input.slice(cursorPosition);

        // Find the last '@' before the cursor
        const lastAtIndex = textBeforeCursor.lastIndexOf("@");

        // If no '@' found
        if (lastAtIndex == -1) return;

        // split the input into parts

        const beforAt = input.slice(0, lastAtIndex);
        const afterAt = input.slice(cursorPosition);

        // combine with selected name
        const newInput = beforAt + selectedName + " " + afterAt;
        setInput(newInput);
      }
    } else {
      if (e.key === "Enter") {
        handleSend();
        handleChatScroll();
      }
    }
  };

  useEffect(() => {
    const cursorLastPosition = inputRef.current.selectionEnd;
    const textBefore = input.slice(0, cursorLastPosition);
    const lastAt = textBefore.lastIndexOf("@");

    // hide the mention box when ' Esc ' key press
    document.addEventListener("keydown", (e) => {
      // function for 'Esc' key
      if (e.key === "Escape") {
        setShowMentionBox(false);
      }
      // function for '/' key
      if (e.key === "/") {
        inputRef.current.focus();
      }
    });

    if (lastAt !== -1) {
      const mentionText = textBefore.slice(lastAt + 1);

      // show mention box
      setShowMentionBox(true);

      // get coordinates
      const coords = getCaretCoordinates(inputRef.current, lastAt);
      setMentionBoxPosition({
        top: coords.top,
        left: coords.left,
      });

      // Filter employee list
      const filtered = employeList.filter((emp) => {
        return emp.toLowerCase().startsWith(mentionText.toLowerCase());
      });
      setFilterEmployees(filtered);
    } else {
      setShowMentionBox(false);
    }
  }, [input]);

  return (
    <div className="font-sans h-screen flex flex-col md:flex-row p-4 lg:p-8 gap-3 bg-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex gap-3 items-center mb-4 border-b border-gray-300 pb-3">
          <img className="w-8 h-8" src={WebIcons.scheduleBot} alt="bot" />
          <p className="font-medium text-textClr text-xl md:text-2xl">
            ChatBot
          </p>
        </div>

        {/* Chat Container - Fixed height structure */}
        <div className="flex flex-col flex-grow min-h-0">
          {/* Messages Area - Scrollable */}
          <div
            ref={chatDiv}
            className="flex-1 overflow-y-auto p-4 rounded-lg mb-4 min-h-0"
          >
            <div className="space-y-4">
              {messages.map((msg) =>
                msg.type === "text" ? (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="text-xs text-gray-500 mb-1">{msg.time}</div>
                    <div
                      className={`p-3 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-black shadow-sm border"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex flex-col items-start">
                    <div className="text-xs text-gray-500 mb-1">{msg.time}</div>

                    {/* Table Container - Responsive */}
                    <div className="w-full max-w-full">
                      <div className="bg-white border rounded-lg shadow-sm p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Schedule Preview
                          </span>
                          <button
                            onClick={() => setShowFullTable(true)}
                            className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            View Full Table
                          </button>
                        </div>

                        {/* Responsive table wrapper */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left font-semibold min-w-16">
                                  Name
                                </th>
                                {dateColumns
                                  .slice(0, window.innerWidth < 768 ? 2 : 3)
                                  .map((date) => (
                                    <th
                                      key={date}
                                      className="border border-gray-300 p-2 font-semibold min-w-20"
                                    >
                                      {new Date(date).toLocaleDateString(
                                        "en-US",
                                        {
                                          month: "short",
                                          day: "numeric",
                                        }
                                      )}
                                    </th>
                                  ))}
                                <th className="border border-gray-300 p-2 font-semibold min-w-12">
                                  ...
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {employeeSchedules.map((emp) => (
                                <tr key={emp.name} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-2 font-medium">
                                    {emp.name}
                                  </td>
                                  {dateColumns
                                    .slice(0, window.innerWidth < 768 ? 2 : 3)
                                    .map((date) => (
                                      <td
                                        key={date}
                                        className="border border-gray-300 p-2"
                                      >
                                        {(emp.shifts[date] || []).map(
                                          (shift, idx) => (
                                            <div
                                              key={idx}
                                              className="text-white p-1 rounded mb-1 text-xs font-semibold text-center"
                                              style={{
                                                backgroundColor:
                                                  getShiftColor(shift),
                                              }}
                                            >
                                              {shift}
                                            </div>
                                          )
                                        )}
                                      </td>
                                    ))}
                                  <td className="border border-gray-300 p-2 text-gray-500 text-center">
                                    +
                                    {dateColumns.length -
                                      (window.innerWidth < 768 ? 2 : 3)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="relative flex items-center gap-3 border-2 border-gray-300 rounded-lg p-3 bg-white">
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter your message"
              className="flex-grow outline-none text-gray-700 border-none"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={handleKeyPress}
            />

            <div
              className={`absolute ${
                showMentionBox ? "visible" : "hidden"
              } bottom-full mb-2 w-full overflow-y-auto bg-white shadow-lg border border-gray-300 rounded-md z-50`}
              style={{
                // left: MentionBoxPosition.left,
                minWidth: 150,
                maxWidth: 300,
              }}
            >
              {filterEmployees.map((emp, index) => (
                <p
                  key={index}
                  className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                    index === selectedIndex
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {emp}
                </p>
              ))}
            </div>

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
      <div className="hidden md:block max-w-[170px] p-2 border-l border-gray-300 pt-4 lg:pt-0 lg:pl-4">
        <h3 className="font-semibold text-textClr font-Roboto mb-3">
          Selected Employees
        </h3>
        <div className="flex flex-col gap-2 lg:gap-3">
          {["Helena", "Oscar", "Daniel", "Mark"].map((name) => (
            <div
              key={name}
              className="flex gap-3 items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 flex-shrink-0"
            >
              <div className="w-8 h-8  bg-blue-500 rounded-full flex items-center justify-center text-sm text-white font-semibold">
                {name.charAt(0)}
              </div>
              <span className="text-sm lg:text-base text-textClr whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Full Table Modal */}
      {showFullTable && (
        <div className="fixed inset-0 p-4 bg-gray-400 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-7xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Full Schedule
              </h2>
              <button
                onClick={() => setShowFullTable(false)}
                className="text-xl font-bold text-gray-500 bg-none border-none cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
              >
                ✕
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
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
                className="w-full border-collapse bg-white min-w-max"
              >
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700 min-w-24">
                      Name
                    </th>
                    {dateColumns.map((date) => (
                      <th
                        key={date}
                        className="border border-gray-300 p-3 font-semibold text-gray-700 text-center min-w-32"
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
                                className="w-full border border-gray-300 p-1 rounded text-gray-900 mb-1 text-sm"
                                onChange={(e) => {
                                  const updated = [...employeeSchedules];
                                  updated[empIndex].shifts[date][idx] =
                                    e.target.value;
                                  setEmployeeSchedules(updated);
                                }}
                              />
                            ) : (
                              <div
                                key={idx}
                                className="text-white p-1.5 rounded mb-1 text-sm font-semibold text-center"
                                style={{
                                  backgroundColor: getShiftColor(shift),
                                }}
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
