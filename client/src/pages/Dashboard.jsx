import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api";
import { setUser } from "../features/auth/authSlice";
import TaskList from "../components/tasks/TaskList";
import AddTaskModal from "../components/tasks/AddTaskModal";
import { createTask } from "../api/taskApi";

// ICONS
import { FaPlus, FaRegUser, FaClock, FaSearch } from "react-icons/fa";

// Components
import ProfileDropdown from "../components/tasks/ProfileDropdown";
import ProfileModal from "../components/tasks/ProfileModal";
import Footer from "../components/tasks/Footer"; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/profile");
        dispatch(setUser({ user: data, token: localStorage.getItem("token") }));
      } catch (err) {
        console.error("Profile fetch failed");
      }
    };

    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
      setTaskRefreshTrigger((prev) => !prev);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 flex flex-col">
      <div className="text-white font-sans flex-grow">
        {/* Navbar */}
        <div className="flex justify-center pt-6 relative">
          <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-purple-300 via-purple-200 to-blue-300 text-black shadow-lg rounded-full w-[90%] max-w-7xl">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaClock className="text-red-500 text-3xl" /> Taskmate
            </h2>

            <div className="relative" ref={dropdownRef}>
              <button
                ref={profileButtonRef}
                onClick={toggleDropdown}
                className="bg-[#b789d0] px-4 py-2 rounded-full flex items-center gap-2 border border-[#b789d0] hover:shadow-[0_0_8px_2px_rgba(183,137,208,0.6)] transition"
              >
                <FaRegUser /> Profile ⮟
              </button>

              {showDropdown && (
                <ProfileDropdown
                  username={user?.username}
                  onProfileClick={() => {
                    setShowProfileModal(true);
                    setShowDropdown(false);
                  }}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="max-w-2xl mx-auto mt-10 mb-12 bg-[#2c2f4a] rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Your Tasks</h3>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition flex items-center gap-2"
            >
              <FaPlus /> Add Task
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 rounded bg-slate-700 text-white placeholder:text-gray-300"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <TaskList refreshTrigger={taskRefreshTrigger} searchText={searchText} />
        </div>

        {/* Add Task Modal */}
        {showModal && (
          <AddTaskModal
            onClose={() => setShowModal(false)}
            onAddTask={handleAddTask}
          />
        )}

        {/* Profile Modal */}
        {showProfileModal && (
          <ProfileModal user={user} onClose={() => setShowProfileModal(false)} />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
