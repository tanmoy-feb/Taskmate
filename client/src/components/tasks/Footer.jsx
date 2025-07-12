import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
        {/* Left: Copyright */}
        <div className="text-left w-full md:w-auto">
          © 2025 <span className="font-semibold">Tanmoy Kayal</span>. All rights reserved.
        </div>

        {/* Right: Social Icons */}
        <div className="flex justify-end gap-3 text-xl w-full md:w-auto">
          <a
            href="https://github.com/tanmoy-feb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/tanmoykayal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:tanmoykayal2005@gmail.com"
            className="hover:text-red-400 transition"
            title="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
