import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-purple-200 to-blue-300">
      <div className="flex flex-col md:flex-row w-full max-w-6xl min-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Illustration */}
        <div
          className="w-full md:w-1/2 h-[300px] md:h-auto bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/login-illustration.png')" }}
        />

        {/* Auth Form */}
        <div className="w-full md:w-1/2 bg-white/30 backdrop-blur-lg p-8 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet /> {/* ✅ THIS IS CRITICAL */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
