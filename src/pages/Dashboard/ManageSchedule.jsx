import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import WebIcons from "../../assets/images";
import TimePicker from "react-time-picker";

const ManageSchedule = ({ setShowManageSchedule }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [monthName, setMonthName] = useState("");
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (value instanceof Date && !isNaN(value)) {
      const month = value.toLocaleString("default", { month: "long" });
      setMonthName(month);
    }
  }, [value]);

  //  Fix date formatting to local date, not UTC
  const handleCalendarChange = (selectedDate) => {
    setValue(selectedDate);

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(month);

    setDate(formattedDate);
  };

  const handleDateInputChange = (e) => {
    setDate(e.target.value);

    //  Also update calendar selection when typing in input
    const [year, month, day] = e.target.value.split("-");
    const newDate = new Date(year, month - 1, day);
    setValue(newDate);
    // console.log(newDate)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const schedule = {
      name,
      date,
      time,
    };
    console.log(schedule);

    setName("");
    setDate("");
    setTime("");
    setShowManageSchedule(false);
  };

  return (
    <div className="p-4 font-Roboto cursor-pointer">
      <h1
        onClick={() => {
          setShowManageSchedule(false);
        }}
        className="cursor-pointer  flex gap-10 items-center text-[2rem] text-textClr font-semibold leading-5.5"
      >
        <img src={WebIcons.scheduleBack} alt="" />
        Manage Schedule
      </h1>
      {/* Calendar section */}
      <div className="mt-12.5">
        <h1 className="text-2xl">{monthName}</h1>
        <div className="py-2 max-w-[660px]">
          <Calendar
            onChange={handleCalendarChange}
            value={value}
            className="w-full"
          />
        </div>
      </div>

      {/* Create schedule section */}
      <div className="bg-gray-150 border-[1px] border-[#B3B3B3] max-w-[660px] mt-7 rounded-[10px]">
        <form onSubmit={handleSubmit} className="p-5 w-full">
          <h1 className="text-2xl font-semibold text-textClr leading-5.5">
            Create Schedule
          </h1>
          <div className="mt-5.5">
            <label className="block mb-1 leading-5.5 text-xl text-textClr">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              className="w-full border-[1px] border-[#E0E0E0] px-4 py-2 outline-none rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-5.5 flex w-full flex-col md:flex-row justify-between gap-2">
            <div className="w-full">
              <label className="block mb-1 leading-5.5 text-lg text-textClr">
                Date of Schedule
              </label>
              <input
                type="date"
                value={date}
                className="w-full border-[1px] border-[#E0E0E0] px-4 py-2 outline-none rounded"
                onChange={handleDateInputChange}
                required
              />
            </div>
            <div className="">
              <label className="block mb-1 leading-5.5 text-sm text-gray-600">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={time}
                className="w-full border-[1px] border-[#E0E0E0] px-4 py-2 outline-none rounded"
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="">
              <label className="block mb-1 leading-5.5 text-sm text-gray-600">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={endTime}
                className="w-full border-[1px] border-[#E0E0E0] px-4 py-2 outline-none rounded"
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          {console.log(time)}
          <button className="mt-5.5 cursor-pointer w-max px rounded-md text-white bg-Primary p-4 ">
            Add New Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageSchedule;
