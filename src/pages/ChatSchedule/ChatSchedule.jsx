import React, { useState, useRef, useEffect } from "react";
import WebIcons from "../../assets/images";
import getCaretCoordinates from "textarea-caret";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { getToken } from "../../utils/helper";

const ChatSchedule = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [showFullTable, setShowFullTable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [MentionBoxPosition, setMentionBoxPosition] = useState({});
  const [showMentionBox, setShowMentionBox] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const token = getToken(import.meta.env.VITE_ACCESS_TOKEN_KEY);
  const [employeeList, setEmployeeList] = useState([]);
  const [currentDateColumns, setCurrentDateColumns] = useState([]);
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
      text: "Create a New Schedule for July:\n• Sifat: 160 hours, no Sundays, only morning shifts.\n• Rifat: Part-time, weekends only.\n• Jubayel: Full month, evening shifts preferred.",
      type: "text",
    },
    {
      id: 2,
      sender: "bot",
      time: "8:15 AM",
      text: "I'll create the schedule for July 2025. Let me process your request...",
      type: "text",
    },
  ]);

  // Default date columns (fallback)
  const defaultDateColumns = [
    "2025-07-01",
    "2025-07-02",
    "2025-07-03",
    "2025-07-04",
    "2025-07-05",
    "2025-07-06",
    "2025-07-07",
  ];

  // Initialize currentDateColumns
  useEffect(() => {
    if (currentDateColumns.length === 0) {
      setCurrentDateColumns(defaultDateColumns);
    }
  }, []);

  const getShiftColor = (shift) => {
    if (shift.includes("08:00") || shift.includes("8:00")) return "#669bbc";
    if (shift.includes("10:00")) return "#f4a261";
    if (shift.includes("14:00")) return "#89c2d9";
    if (shift.includes("16:00")) return "#9d4edd";
    return "#a3a3a3";
  };

  const tableRef = useRef(null);
  const inputRef = useRef(null);
  const chatDiv = useRef(null);

  // Helper function to convert date format from "01:07:2025" to "2025-07-01"
  const convertDateFormat = (apiDate) => {
    try {
      const [day, month, year] = apiDate.split(":");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } catch (error) {
      console.error("Date conversion error:", error);
      return apiDate; // return original if conversion fails
    }
  };

  // Helper function to generate date columns based on API response
  const generateDateColumns = (scheduleData) => {
    if (scheduleData && scheduleData.length > 0 && scheduleData[0].time) {
      const dates = scheduleData[0].time.map((timeEntry) =>
        convertDateFormat(timeEntry.date)
      );
      return [...new Set(dates)].sort(); // Remove duplicates and sort
    }
    return defaultDateColumns;
  };

  const handleExport = async () => {
    if (!tableRef.current) return;
    setExporting(true);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const table = tableRef.current;
      const tableRect = table.getBoundingClientRect();

      const scale = 2;
      canvas.width = Math.max(1200, tableRect.width) * scale;
      canvas.height = Math.max(800, tableRect.height + 100) * scale;
      ctx.scale(scale, scale);

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 20px Arial";
      ctx.fillText("Employee Schedule", 20, 30);

      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.fillText(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50);

      const startY = 70;
      const cellWidth = 120;
      const nameColumnWidth = 100;
      const headerHeight = 40;
      const rowHeight = 50;

      // Draw header
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(20, startY, nameColumnWidth, headerHeight);
      currentDateColumns.forEach((_, index) => {
        ctx.fillRect(
          20 + nameColumnWidth + index * cellWidth,
          startY,
          cellWidth,
          headerHeight
        );
      });

      ctx.strokeStyle = "#d1d5db";
      ctx.lineWidth = 1;
      ctx.strokeRect(20, startY, nameColumnWidth, headerHeight);
      currentDateColumns.forEach((_, index) => {
        ctx.strokeRect(
          20 + nameColumnWidth + index * cellWidth,
          startY,
          cellWidth,
          headerHeight
        );
      });

      ctx.fillStyle = "#374151";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "left";
      ctx.fillText("Name", 30, startY + 25);

      currentDateColumns.forEach((date, index) => {
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

        ctx.fillStyle = empIndex % 2 === 0 ? "#ffffff" : "#f9fafb";
        ctx.fillRect(
          20,
          y,
          nameColumnWidth + currentDateColumns.length * cellWidth,
          rowHeight
        );

        ctx.strokeStyle = "#d1d5db";
        ctx.strokeRect(20, y, nameColumnWidth, rowHeight);

        ctx.fillStyle = "#1f2937";
        ctx.font = "500 14px Arial";
        ctx.textAlign = "left";
        ctx.fillText(emp.name, 30, y + 28);

        currentDateColumns.forEach((date, dateIndex) => {
          const x = 20 + nameColumnWidth + dateIndex * cellWidth;
          ctx.strokeRect(x, y, cellWidth, rowHeight);

          const shifts = emp.shifts && emp.shifts[date] ? emp.shifts[date] : [];
          shifts.forEach((shift, shiftIndex) => {
            const shiftY = y + 12 + shiftIndex * 22;
            const badgeWidth = 100;
            const badgeHeight = 18;
            const badgeX = x + (cellWidth - badgeWidth) / 2;

            const shiftColor = getShiftColor(shift);
            ctx.fillStyle = shiftColor;
            ctx.fillRect(badgeX, shiftY, badgeWidth, badgeHeight);

            ctx.fillStyle = "white";
            ctx.font = "bold 11px Arial";
            ctx.textAlign = "center";
            ctx.fillText(shift, badgeX + badgeWidth / 2, shiftY + 13);
          });
        });
      });

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

          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 277;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
          doc.save("employee-schedule.pdf");
          setExporting(false);
        } catch (error) {
          console.error("PDF generation error:", error);
          toast.error("PDF export failed. Please try again.");
          setExporting(false);
        }
      };

      script.onerror = () => {
        toast.error(
          "Failed to load PDF library. Please check your internet connection."
        );
        setExporting(false);
      };
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Export failed. Please try again.");
      setExporting(false);
    }
  };

  const handleChatScroll = () => {
    if (chatDiv.current) {
      chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
    }
  };

  // API call function
  const makeApiCall = async (messageText) => {
    console.log("Sending message:", messageText);
    try {
      const res = await baseApi.post(
        ENDPOINTS.CREATE_SCHEDULE,
        {
          schedule_request: messageText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Full API Response:", res.data);

      if (res.data && res.data.data && res.data.data.schedule) {
        const scheduleData = res.data.data.schedule;

        // Update employee list for mentions
        const employeeNames = [...new Set(scheduleData.map((emp) => emp.name))];
        setEmployeeList(employeeNames);

        // Process schedule data
        const processedSchedules = [];
        const employeeMap = new Map();

        scheduleData.forEach((empData) => {
          if (!empData.name || !empData.time) return;

          // Create shifts object from time array
          const shifts = {};
          empData.time.forEach((timeEntry) => {
            if (timeEntry.date && timeEntry.shift) {
              const formattedDate = convertDateFormat(timeEntry.date);
              if (timeEntry.shift !== "off") {
                if (!shifts[formattedDate]) {
                  shifts[formattedDate] = [];
                }
                shifts[formattedDate].push(timeEntry.shift);
              }
            }
          });

          // Handle duplicate employees by merging shifts
          if (employeeMap.has(empData.name)) {
            const existingShifts = employeeMap.get(empData.name);
            Object.keys(shifts).forEach((date) => {
              if (existingShifts[date]) {
                existingShifts[date] = [
                  ...existingShifts[date],
                  ...shifts[date],
                ];
              } else {
                existingShifts[date] = shifts[date];
              }
            });
          } else {
            employeeMap.set(empData.name, shifts);
          }
        });

        // Convert map to array
        employeeMap.forEach((shifts, name) => {
          processedSchedules.push({
            name: name,
            shifts: shifts,
          });
        });

        console.log("Processed Schedules:", processedSchedules);

        // Update state
        setEmployeeSchedules(processedSchedules);

        // Update date columns based on API response
        const newDateColumns = generateDateColumns(scheduleData);
        setCurrentDateColumns(newDateColumns);
        console.log("Date columns:", newDateColumns);

        // Add bot response messages
        const botMessage = {
          id: Date.now() + 1,
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: `Schedule updated successfully for ${
            employeeNames.length
          } employee(s): ${employeeNames.join(", ")}.`,
          type: "text",
        };

        const tableMessage = {
          id: Date.now() + 2,
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "table",
        };

        setMessages((prev) => [...prev, botMessage, tableMessage]);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;

      console.error("API Error:", error);
      console.log("Error Response:", error.response?.data || error.message);
      toast.error(`API Error: ${errorMessage}`);

      // Add error message to chat
      const errorMsg = {
        id: Date.now(),
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: `Sorry, there was an error processing your request: ${errorMessage}`,
        type: "text",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  useEffect(() => {
    handleChatScroll();
  }, [messages]);

  const handleSend = async () => {
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

    const messageText = input.trim();
    setInput("");

    // Make API call with the input text
    await makeApiCall(messageText);
  };

  const handleKeyPress = (e) => {
    // function for 'ctrl' + 'space' key
    if (e.ctrlKey && e.key === " ") {
      setShowMentionBox(true);
      return;
    }

    if (showMentionBox) {
      // function for 'arrow down' key
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev + 1) % filterEmployees.length
        );
        return;
      }

      // function for 'arrow up' key
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === null
            ? filterEmployees.length - 1
            : (prev - 1 + filterEmployees.length) % filterEmployees.length
        );
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex !== null && filterEmployees[selectedIndex]) {
          const selectedName = filterEmployees[selectedIndex];
          const cursorPosition = inputRef.current?.selectionEnd || 0;
          const textBeforeCursor = input.slice(0, cursorPosition);
          const lastAtIndex = textBeforeCursor.lastIndexOf("@");

          if (lastAtIndex !== -1) {
            const beforeAt = input.slice(0, lastAtIndex);
            const afterAt = input.slice(cursorPosition);
            const newInput = beforeAt + selectedName + " " + afterAt;
            setInput(newInput);
            setShowMentionBox(false);
            setSelectedIndex(null);
          }
        }
        return;
      }
    } else {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
        handleChatScroll();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowMentionBox(false);
        setSelectedIndex(null);
      }
      if (e.key === "/") {
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;

    const cursorLastPosition = inputRef.current.selectionEnd;
    const textBefore = input.slice(0, cursorLastPosition);
    const lastAt = textBefore.lastIndexOf("@");

    if (lastAt !== -1) {
      const mentionText = textBefore.slice(lastAt + 1);
      setShowMentionBox(true);

      try {
        const coords = getCaretCoordinates(inputRef.current, lastAt);
        setMentionBoxPosition({
          top: coords.top,
          left: coords.left,
        });
      } catch (error) {
        console.error("Caret coordinates error:", error);
      }

      const filtered = employeeList.filter((emp) =>
        emp.toLowerCase().startsWith(mentionText.toLowerCase())
      );
      setFilterEmployees(filtered);
      setSelectedIndex(filtered.length > 0 ? 0 : null);
    } else {
      setShowMentionBox(false);
      setSelectedIndex(null);
    }
  }, [employeeList, input]);

  return (
    <div className="font-sans min-h-[90vh] md:h-screen flex flex-col md:flex-row p-4 lg:p-8 gap-3 bg-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <div className="flex gap-3 items-center mb-4 border-b border-gray-300 pb-3 mt-6 md:mt-0">
          <img className="w-8 h-8" src={WebIcons.scheduleBot} alt="bot" />
          <p className="font-medium text-textClr text-xl md:text-2xl">
            {t("chat.title")}
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
                    {console.log(msg.id)}
                    <div className="text-xs text-gray-500 mb-1">{msg.time}</div>

                    {/* Table Container - Responsive */}
                    <div className="w-full max-w-full">
                      <div className="bg-white border rounded-lg shadow-sm p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {t("chat.schedulePreview") || "Schedule Preview"}
                          </span>
                          <button
                            onClick={() => setShowFullTable(true)}
                            className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            {t("chat.viewFullTable") || "View Full Table"}
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
                                {currentDateColumns
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
                                  {currentDateColumns
                                    .slice(0, window.innerWidth < 768 ? 2 : 3)
                                    .map((date) => (
                                      <td
                                        key={date}
                                        className="border border-gray-300 p-2"
                                      >
                                        {(emp.shifts && emp.shifts[date]
                                          ? emp.shifts[date]
                                          : []
                                        ).map((shift, idx) => (
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
                                        ))}
                                      </td>
                                    ))}
                                  <td className="border border-gray-300 p-2 text-gray-500 text-center">
                                    +
                                    {Math.max(
                                      0,
                                      currentDateColumns.length -
                                        (window.innerWidth < 768 ? 2 : 3)
                                    )}
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
              placeholder={
                t("chat.messagePlaceholder") || "Type your message..."
              }
              className="flex-grow outline-none text-gray-700 border-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            {showMentionBox && filterEmployees.length > 0 && (
              <div
                className="absolute bottom-full mb-2 w-full overflow-y-auto bg-white shadow-lg border border-gray-300 rounded-md z-50"
                style={{
                  minWidth: 150,
                  maxWidth: 300,
                  maxHeight: 200,
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
                    onClick={() => {
                      const cursorPosition =
                        inputRef.current?.selectionEnd || 0;
                      const textBeforeCursor = input.slice(0, cursorPosition);
                      const lastAtIndex = textBeforeCursor.lastIndexOf("@");

                      if (lastAtIndex !== -1) {
                        const beforeAt = input.slice(0, lastAtIndex);
                        const afterAt = input.slice(cursorPosition);
                        const newInput = beforeAt + emp + " " + afterAt;
                        setInput(newInput);
                        setShowMentionBox(false);
                        setSelectedIndex(null);
                      }
                    }}
                  >
                    {emp}
                  </p>
                ))}
              </div>
            )}

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
          {t("chat.selectedEmployee") || "Employees"}
        </h3>
        <div className="flex flex-col gap-2 lg:gap-3">
          {employeeList.slice(0, 4).map((name) => (
            <div
              key={name}
              className="flex gap-3 items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 flex-shrink-0"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white font-semibold">
                {name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm lg:text-base text-textClr whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
          {employeeList.length === 0 && (
            <div className="text-sm text-gray-500">No employees loaded yet</div>
          )}
        </div>
      </div>

      {/* Full Table Modal */}
      {showFullTable && (
        <div className="fixed inset-0 p-4 bg-gray-400 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-7xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {t("chat.fullSch") || "Full Schedule"}
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
                {isEditable
                  ? t("chat.save") || "Save"
                  : t("chat.edit") || "Edit"}
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
                {exporting
                  ? "Generating PDF..."
                  : `📄${t("chat.exportPDF") || "Export PDF"}`}
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
                    {currentDateColumns.map((date) => (
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
                      {currentDateColumns.map((date) => (
                        <td key={date} className="border border-gray-300 p-3">
                          {(emp.shifts && emp.shifts[date]
                            ? emp.shifts[date]
                            : []
                          ).map((shift, idx) =>
                            isEditable ? (
                              <input
                                key={idx}
                                type="text"
                                value={shift}
                                className="w-full border border-gray-300 p-1 rounded text-gray-900 mb-1 text-sm"
                                onChange={(e) => {
                                  const updated = [...employeeSchedules];
                                  if (updated[empIndex].shifts[date]) {
                                    updated[empIndex].shifts[date][idx] =
                                      e.target.value;
                                    setEmployeeSchedules(updated);
                                  }
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
