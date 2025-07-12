import { useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const ProfileDropdown = ({ username, onProfileClick, onLogout, onClose }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.(); // Only call if onClose exists
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 bg-[#4a4e76] text-white rounded shadow-xl w-48 z-50 border border-white/10"
    >
      <div className="px-4 py-2 border-b border-gray-900 text-sm flex items-center gap-2">
        <FaUser className="text-gray-400" />
        <span>{username}</span>
      </div>
      <button
        onClick={onProfileClick}
        className="w-full flex items-center gap-2 px-4 py-2 bg-[#525573] hover:bg-[#767896] text-left text-sm"
      >
        <CgProfile /> Profile
      </button>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-2 px-4 py-2 bg-red-400 hover:bg-red-300 text-white text-sm rounded-b"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
