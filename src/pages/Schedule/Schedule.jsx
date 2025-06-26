import React, { useState } from "react";
import WebIcons from "../../assets/images";
import scheduleImage from "../../assets/Screenshot 2025-06-26 012150.png"; // example image

const Schedule = () => {
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
      text: "our schedule for June 2025 has been updated.",
      type: "text",
    },
    {
      id: 3,
      sender: "bot",
      time: "8:15 AM",
      type: "image",
      imageUrl: scheduleImage,
    },
    {
      id: 4,
      sender: "bot",
      time: "8:15 AM",
      text: "Should I send this to all employees via email?",
      type: "text",
    },
  ]);

  const [employeeList, setEmployeeList] = useState([
    {
      name: "Helena",
      img: "string",
    },
    {
      name: "Oscar",
      img: "string",
    },
    {
      name: "Daniel",
      img: "string",
    },
    {
      name: "Demo",
      img: "string",
    },
  ]);

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

    setMessages((prev) => [newMessage, ...prev]);
    setInput("");
  };

  return (
    <div className="font-Roboto h-screen flex p-4 gap-4">
      {/* Schedule Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <h1 className="text-xl md:text-3xl font-bold mb-4">
          Schedule Settings
        </h1>

        {/* Chat Header */}
        <div className="w-full flex justify-between px-3 items-center mb-4">
          <div className="flex gap-3 items-center">
            <img className="w-8 h-8" src={WebIcons.scheduleBot} alt="bot" />
            <p className="font-semibold">ChatBot</p>
          </div>
          <div className="flex gap-4">
            <img className="w-5 h-5" src={WebIcons.scheduleCall} alt="call" />
            <img className="w-5 h-5" src={WebIcons.scheduleVideo} alt="video" />
          </div>
        </div>

        {/* Chat Box and Input */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Messages */}
          <div className="flex flex-col flex-grow overflow-y-auto border border-gray-300 rounded-2xl p-4 bg-white mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user"
                    ? "items-end self-end"
                    : "items-start self-start"
                } mb-3`}
              >
                <div className="text-xs text-gray-500">{msg.time}</div>
                {msg.type === "text" ? (
                  <div
                    className={`p-3 rounded-lg max-w-md whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                ) : (
                  <img
                    src={msg.imageUrl}
                    alt="chat-img"
                    className="w-full max-w-xs rounded-lg shadow"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 border-2 border-gray-300 rounded-lg px-4 py-4">
            <input
              type="text"
              placeholder="Enter your message"
              className="flex-grow outline-none border-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <img
                src={WebIcons.scheduleSend}
                alt="send"
                className="w-5 h-5 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Employee List Section */}
      <div className="w-auto min-w-[180px] max-w-xs border-l pl-4 overflow-y-auto">
        {/* <h2 className="text-lg font-semibold mb-3">Employees</h2> */}
        {employeeList.map((employee) => (
          <div key={employee.name} className="flex gap-3 items-center mb-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm text-white">
              {employee.name.charAt(0)}
            </div>
            <span className="text-base">{employee.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
