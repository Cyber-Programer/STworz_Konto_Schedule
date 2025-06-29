import React, { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import WebIcons from "../../assets/images";

const initialData = [
  { id: "FIG-121", title: "The maximum working time in a month is 180 hours" },
  { id: "FIG-122", title: "We are closed on Sundays" },
  { id: "FIG-123", title: "During the holiday period (July and August), the maximum shift length is 6 hours" },
  { id: "FIG-124", title: "Standard workweek is 40 hours, with possible overtime" },
  { id: "FIG-125", title: "Employees are entitled to short breaks (15 mins) and longer breaks for shifts over 6 hours" },
  { id: "FIG-126", title: "During the holiday period (July and August), the maximum shift length is 6 hours" },
  { id: "FIG-127", title: "Shifts usually last 8 hours, but can be shorter or longer" },
  { id: "FIG-128", title: "Flexible work hours or remote work may be offered in some roles" },
  { id: "FIG-129", title: "Employees earn paid vacation time annually" },
  { id: "FIG-130", title: "Employees may rotate between day, evening, or night shifts" },
];

const PrinciplesTable = () => {
  const [search, setSearch] = useState("");
  const [openActionId, setOpenActionId] = useState(null);
  const [principles, setPrinciples] = useState(initialData);

  const filteredData = principles.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActionMenu = (id) => {
    setOpenActionId(openActionId === id ? null : id);
  };

  const handleEdit = (id) => {
    const updatedTitle = prompt("Edit rule title:");
    if (updatedTitle) {
      setPrinciples((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, title: updatedTitle } : item
        )
      );
      setOpenActionId(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      setPrinciples((prev) => prev.filter((item) => item.id !== id));
      setOpenActionId(null);
    }
  };

  return (
    <div className="max-w-8xl  p-6 mt-10 bg-white shadow rounded-md font-Roboto ">
      <h2 className="text-xl font-semibold text-textClr mb-4">Principles</h2>

      <div className="flex items-center justify-between mb-4">
        {/* Search Input with Icon */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search rules..."
            className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Static Edit Button */}
        {/* <div className="flex gap-2 ml-4">
          <button className="p-2 rounded hover:bg-gray-100 flex items-center">
            <img src={WebIcons.scheduleEdit} alt="edit icon" className="w-4 h-4" />
            <p className="ml-2">Edit</p>
          </button>
        </div> */}
      </div>

      {/* Table */}
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left  font-medium">
            <th className="py-2 px-2 w-24 text-[#828282]">Task</th>
            <th className="py-2 px-2 text-textClr font-medium ">Title</th>
            <th className="py-2 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="border-t border-[#E0E0E0] hover:bg-gray-50 relative text-sm">
              <td className="py-2 px-2 text-[#828282]">{item.id}</td>
              <td className="py-2 px-2">{item.title}</td>
              <td className="py-2 px-2 relative">
                <button onClick={() => toggleActionMenu(item.id)}>
                  <MoreVertical className="text-gray-500" size={18} />
                  
                </button>

                {openActionId === item.id && (
                  <div className="absolute right-2 mt-2 bg-white border border-gray-200 rounded shadow w-28 z-10">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrinciplesTable;

