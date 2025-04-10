import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-slate-950 via-slate-700 to-gray-900 text-white px-6 py-4 shadow-lg flex items-center justify-between z-50">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wider drop-shadow-sm">🎓 NeoID</div>

      {/* Nav Links */}
      <div className="space-x-6 text-sm sm:text-base font-medium">
        <Link
          to="/"
          className="hover:text-yellow-300 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/previous"
          className="hover:text-yellow-300 transition duration-300"
        >
          Previous
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
