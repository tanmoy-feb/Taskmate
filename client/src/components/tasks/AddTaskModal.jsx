import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const AddTaskModal = ({ onClose, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, description, status, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 backdrop-blur-lg">
      <div className="bg-[#2c2f4a]/90 p-6 rounded-xl w-full max-w-md shadow-2xl relative text-white border border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-300 text-2xl hover:text-white transition"
          title="Close"
        >
          <RxCrossCircled />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Add Task</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task Title"
            className="p-3 rounded bg-slate-700 text-white placeholder:text-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            className="p-3 rounded bg-slate-700 text-white placeholder:text-gray-300"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="p-3 rounded bg-slate-700 text-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            className="p-3 rounded bg-slate-700 text-white"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
