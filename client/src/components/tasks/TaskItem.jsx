import { useState } from "react";
import { deleteTask, updateTask } from "../../api/taskApi";
import EditTaskModal from "./EditTaskModal";

// Icons
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";

const TaskItem = ({ task, onTaskUpdated }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [localStatus, setLocalStatus] = useState(task.status); // local state

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      setShowDeleteConfirm(false);
      onTaskUpdated();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const toggleStatus = async () => {
    const newStatus = localStatus === "pending" ? "completed" : "pending";
    setLocalStatus(newStatus); // Optimistically update status

    try {
      setStatusUpdating(true);
      await updateTask(task._id, { status: newStatus });
      onTaskUpdated(); // Still refresh to keep things in sync
    } catch (err) {
      console.error("Failed to toggle status", err);
      setLocalStatus(localStatus); // Revert on failure
    } finally {
      setStatusUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-slate-700 text-white shadow p-4 rounded mb-4 relative">
      <h4 className="text-lg font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-300 mb-1">{task.description}</p>

      {/* Due Date */}
      <div className="flex items-center text-sm text-gray-400 mb-2">
        <FaCalendarAlt className="mr-2" />
        <span>{formatDate(task.dueDate)}</span>
      </div>

      {/* Status Pill */}
      <div className="flex items-center justify-between">
        <button
          disabled={statusUpdating}
          onClick={toggleStatus}
          className={`text-sm font-semibold px-3 py-1 rounded-full transition ${
            localStatus === "completed"
              ? "bg-green-600 text-white border border-green-500 hover:shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]"
              : "bg-orange-500 text-white border border-orange-400 hover:shadow-[0_0_8px_2px_rgba(251,146,60,0.7)]"
          }`}
        >
          {localStatus}
        </button>

        {/* Actions */}
        <div className="flex gap-3 text-xl">
          <button
            onClick={() => setShowEditModal(true)}
            title="Edit"
            className="text-green-300 hover:text-green-200"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            title="Delete"
            className="text-red-400 hover:text-red-300"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Box */}
      {showDeleteConfirm && (
        <div className="absolute right-4 bottom-4 flex gap-2 mt-2">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="bg-gray-500 hover:bg-gray-400 text-white px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onTaskUpdated={onTaskUpdated}
        />
      )}
    </div>
  );
};

export default TaskItem;
