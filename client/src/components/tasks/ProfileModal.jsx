import { FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

const ProfileModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#1e1e2f] text-white p-6 rounded-xl shadow-2xl relative w-[90%] max-w-md border border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl"
        >
          <RxCrossCircled />
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-gray-600 pb-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FaIdBadge /> Profile
            </h3>
          </div>

          <div className="text-md font-semibold">
            Welcome back, <span className="text-white">{user?.username}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaUser />
            <span>{user?.username}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaEnvelope />
            <span>{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
