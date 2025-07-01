import React, { useState, useRef } from "react";

// Mock icons since we don't have the actual WebIcons
const WebIcons = {
  scheduleBot: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 8V4H8'/%3E%3Crect width='16' height='12' x='4' y='8' rx='2'/%3E%3Cpath d='M2 14h2'/%3E%3Cpath d='M20 14h2'/%3E%3Cpath d='M15 13v2'/%3E%3Cpath d='M9 13v2'/%3E%3C/svg%3E",
  scheduleSend: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m22 2-7 20-4-9-9-4Z'/%3E%3Cpath d='M22 2 11 13'/%3E%3C/svg%3E"
};

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

  const dateColumns = ["2025-06-01", "2025-06-02", "2025-06-03", "2025-06-04", "2025-06-05", "2025-06-06", "2025-06-07"];

  const getShiftColor = (shift) => {
    if (shift.includes("08:00")) return "#669bbc";
    if (shift.includes("10:00")) return "#f4a261";
    if (shift.includes("14:00")) return "#89c2d9";
    if (shift.includes("16:00")) return "#9d4edd";
    return "#a3a3a3";
  };

  const tableRef = useRef();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!tableRef.current) return;

    setExporting(true);
    
    try {
      // Create a canvas to capture the table
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Get table element and its computed styles
      const table = tableRef.current;
      const tableRect = table.getBoundingClientRect();
      
      // Set canvas size with higher resolution for better quality
      const scale = 2;
      canvas.width = Math.max(1200, tableRect.width) * scale;
      canvas.height = Math.max(800, tableRect.height + 100) * scale;
      ctx.scale(scale, scale);
      
      // Fill white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
      
      // Add title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('Employee Schedule - June 2025', 20, 30);
      
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial';
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
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      };
      
      // Draw header
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(20, startY, nameColumnWidth, headerHeight);
      dateColumns.forEach((_, index) => {
        ctx.fillRect(20 + nameColumnWidth + (index * cellWidth), startY, cellWidth, headerHeight);
      });
      
      // Header borders
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, startY, nameColumnWidth, headerHeight);
      dateColumns.forEach((_, index) => {
        ctx.strokeRect(20 + nameColumnWidth + (index * cellWidth), startY, cellWidth, headerHeight);
      });
      
      // Header text
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Name', 30, startY + 25);
      
      dateColumns.forEach((date, index) => {
        const x = 20 + nameColumnWidth + (index * cellWidth);
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });
        ctx.textAlign = 'center';
        ctx.fillText(formattedDate, x + cellWidth/2, startY + 25);
      });
      
      // Draw employee rows
      employeeSchedules.forEach((emp, empIndex) => {
        const y = startY + headerHeight + (empIndex * rowHeight);
        
        // Row background (alternating)
        ctx.fillStyle = empIndex % 2 === 0 ? '#ffffff' : '#f9fafb';
        ctx.fillRect(20, y, nameColumnWidth + (dateColumns.length * cellWidth), rowHeight);
        
        // Name cell border
        ctx.strokeStyle = '#d1d5db';
        ctx.strokeRect(20, y, nameColumnWidth, rowHeight);
        
        // Employee name
        ctx.fillStyle = '#1f2937';
        ctx.font = '500 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(emp.name, 30, y + 28);
        
        // Shift cells
        dateColumns.forEach((date, dateIndex) => {
          const x = 20 + nameColumnWidth + (dateIndex * cellWidth);
          
          // Cell border
          ctx.strokeRect(x, y, cellWidth, rowHeight);
          
          const shifts = emp.shifts[date] || [];
          shifts.forEach((shift, shiftIndex) => {
            const shiftY = y + 12 + (shiftIndex * 22);
            const badgeWidth = 100;
            const badgeHeight = 18;
            const badgeX = x + (cellWidth - badgeWidth) / 2;
            
            // Get shift color
            const shiftColor = getShiftColor(shift);
            const rgb = hexToRgb(shiftColor);
            
            // Draw colored badge background
            ctx.fillStyle = shiftColor;
            ctx.fillRect(badgeX, shiftY, badgeWidth, badgeHeight);
            
            // Badge border radius effect (simplified)
            ctx.fillRect(badgeX + 1, shiftY - 1, badgeWidth - 2, 1);
            ctx.fillRect(badgeX + 1, shiftY + badgeHeight, badgeWidth - 2, 1);
            ctx.fillRect(badgeX - 1, shiftY + 1, 1, badgeHeight - 2);
            ctx.fillRect(badgeX + badgeWidth, shiftY + 1, 1, badgeHeight - 2);
            
            // Shift text
            ctx.fillStyle = 'white';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(shift, badgeX + badgeWidth/2, shiftY + 13);
          });
        });
      });
      
      // Load jsPDF and convert canvas to PDF
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      document.head.appendChild(script);

      script.onload = () => {
        try {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
          });

          // Convert canvas to image and add to PDF
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 277; // A4 landscape width in mm minus margins
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
          
          // Save the PDF
          doc.save('employee-schedule.pdf');
          
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

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', height: '100vh', display: 'flex', padding: '32px 20px', gap: '16px', backgroundColor: '#f9fafb' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Schedule Settings</h1>
        <div style={{ width: '100%', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <img style={{ width: '32px', height: '32px' }} src={WebIcons.scheduleBot} alt="bot" />
          <p style={{ fontWeight: '600', color: '#374151' }}>ChatBot</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto', border: '1px solid #d1d5db', borderRadius: '16px', padding: '16px', backgroundColor: 'white', marginBottom: '16px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            {messages.map((msg) =>
              msg.type === "text" ? (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === "user" ? 'flex-end' : 'flex-start',
                    alignSelf: msg.sender === "user" ? 'flex-end' : 'flex-start',
                    marginBottom: '12px'
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{msg.time}</div>
                  <div
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      maxWidth: '384px',
                      whiteSpace: 'pre-line',
                      backgroundColor: msg.sender === "user" ? '#2563eb' : '#e5e7eb',
                      color: msg.sender === "user" ? 'white' : 'black'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', marginBottom: '12px', alignItems: 'flex-start', borderRadius: '8px', overflowX: 'auto' }}
                  onClick={() => setShowFullTable(true)}
                >
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{msg.time}</div>
                  <table style={{ minWidth: '300px', fontSize: '12px', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f3f4f6' }}>
                        <th style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                        {dateColumns.slice(0, 3).map((date) => (
                          <th key={date} style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: '600' }}>
                            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </th>
                        ))}
                        <th style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: '600' }}>...</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeSchedules.map((emp) => (
                        <tr key={emp.name}>
                          <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: '500' }}>{emp.name}</td>
                          {dateColumns.slice(0, 3).map((date) => (
                            <td key={date} style={{ border: '1px solid #d1d5db', padding: '8px' }}>
                              {(emp.shifts[date] || []).map((shift, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    backgroundColor: getShiftColor(shift),
                                    color: "white",
                                    padding: "4px 6px",
                                    borderRadius: "4px",
                                    marginBottom: "2px",
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    textAlign: "center"
                                  }}
                                >
                                  {shift}
                                </div>
                              ))}
                            </td>
                          ))}
                          <td style={{ border: '1px solid #d1d5db', padding: '8px', color: '#6b7280' }}>+{dateColumns.length - 3} more</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '2px solid #d1d5db', borderRadius: '8px', padding: '12px', backgroundColor: 'white' }}>
            <input
              type="text"
              placeholder="Enter your message"
              style={{ flexGrow: 1, outline: 'none', color: '#374151', border: 'none' }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} style={{ padding: '4px', background: 'none', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              <img src={WebIcons.scheduleSend} alt="send" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div style={{ width: 'auto', minWidth: '180px', maxWidth: '320px', borderLeft: '1px solid #d1d5db', paddingLeft: '16px', overflowY: 'auto' }}>
        <h3 style={{ fontWeight: '600', color: '#374151', marginBottom: '12px' }}>Employees</h3>
        {["Helena", "Oscar", "Daniel", "Mark"].map((name) => (
          <div key={name} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'white', fontWeight: '600' }}>
              {name.charAt(0)}
            </div>
            <span style={{ fontSize: '16px', color: '#374151' }}>{name}</span>
          </div>
        ))}
      </div>

      {/* Expanded Table Overlay */}
      {showFullTable && (
        <div style={{ position: 'fixed', inset: 0, padding: '16px', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '24px', width: '100%', maxWidth: '1152px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Full Schedule</h2>
              <button
                onClick={() => setShowFullTable(false)}
                style={{ fontSize: '20px', fontWeight: 'bold', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => setIsEditable(!isEditable)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid',
                  fontWeight: '500',
                  cursor: 'pointer',
                  backgroundColor: isEditable ? '#10b981' : 'white',
                  color: isEditable ? 'white' : '#3b82f6',
                  borderColor: isEditable ? '#10b981' : '#3b82f6'
                }}
              >
                {isEditable ? "Save" : "Edit"}
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                style={{
                  border: '1px solid #f59e0b',
                  color: exporting ? '#9ca3af' : '#f59e0b',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: exporting ? 'not-allowed' : 'pointer',
                  backgroundColor: 'white',
                  borderColor: exporting ? '#d1d5db' : '#f59e0b'
                }}
              >
                {exporting ? "Generating PDF..." : "📄 Export to PDF"}
              </button>
            </div>

            <div style={{ overflowX: 'auto', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <table
                ref={tableRef}
                style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}
              >
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <th style={{ border: '1px solid #d1d5db', padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                    {dateColumns.map((date) => (
                      <th key={date} style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: '600', color: '#374151', textAlign: 'center' }}>
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employeeSchedules.map((emp, empIndex) => (
                    <tr key={emp.name} style={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                      <td style={{ border: '1px solid #d1d5db', padding: '12px', fontWeight: '500', color: '#1f2937' }}>{emp.name}</td>
                      {dateColumns.map((date) => (
                        <td key={date} style={{ border: '1px solid #d1d5db', padding: '12px' }}>
                          {(emp.shifts[date] || []).map((shift, idx) =>
                            isEditable ? (
                              <input
                                key={idx}
                                type="text"
                                value={shift}
                                style={{ width: '100%', border: '1px solid #d1d5db', padding: '4px 8px', borderRadius: '4px', color: '#1f2937', marginBottom: '4px' }}
                                onChange={(e) => {
                                  const updated = [...employeeSchedules];
                                  updated[empIndex].shifts[date][idx] = e.target.value;
                                  setEmployeeSchedules(updated);
                                }}
                              />
                            ) : (
                              <div
                                key={idx}
                                style={{
                                  backgroundColor: getShiftColor(shift),
                                  color: "white",
                                  padding: "6px 8px",
                                  borderRadius: "6px",
                                  marginBottom: "4px",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  textAlign: "center"
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