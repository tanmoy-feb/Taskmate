import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { updateTask } from "../../api/taskApi";

const EditTaskModal = ({ task, onClose, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status || "Pending");
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split("T")[0] : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(task._id, { title, description, status, dueDate });
      onTaskUpdated();
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md bg-opacity-20 flex items-center justify-center z-50 transition-all">
      <div className="bg-[#2c2f4a] p-6 rounded-xl w-full max-w-md shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-300 text-xl hover:text-white"
        >
          <RxCrossCircled />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Task</h2>

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
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
