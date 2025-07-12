import { useEffect, useState } from "react";
import { getTasks } from "../../api/taskApi";
import TaskItem from "./TaskItem";

const ITEMS_PER_PAGE = 5;

const TaskList = ({ refreshTrigger, searchText }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setCurrentPage(1); // Reset to first page on refresh
    } catch (err) {
      setError("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (error)
    return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="mt-4">
      {filteredTasks.length === 0 ? (
        <p className="text-gray-400 text-center">No tasks found.</p>
      ) : (
        <>
          {paginatedTasks.map((task) => (
            <TaskItem key={task._id} task={task} onTaskUpdated={fetchTasks} />
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <button
              onClick={handlePrev}
              className={`bg-slate-600 px-4 py-1 rounded hover:bg-slate-500 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              className={`bg-slate-600 px-4 py-1 rounded hover:bg-slate-500 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
