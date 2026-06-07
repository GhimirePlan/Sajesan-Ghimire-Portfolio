import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  HiOutlineViewGrid, 
  HiOutlineDocumentText, 
  HiOutlineChatAlt2, 
  HiOutlineLogout,
  HiOutlineHome
} from 'react-icons/hi';
import { BsLinkedin } from 'react-icons/bs';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <HiOutlineViewGrid size={24} /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <HiOutlineDocumentText size={24} /> },
    { name: 'Comments', path: '/admin/comments', icon: <HiOutlineChatAlt2 size={24} /> },
    { name: 'LinkedIn', path: '/admin/linkedin', icon: <BsLinkedin size={22} /> },
  ];

  return (
    <div className="flex min-h-screen bg-primary text-white">
      {/* Sidebar */}
      <div className="w-64 bg-tertiary border-r border-white/10 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#915EFF]">Admin Panel</h1>
        </div>

        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path
                      ? 'bg-[#915EFF] text-white'
                      : 'text-secondary hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-4 px-4 py-3 text-secondary hover:bg-white/5 hover:text-white rounded-xl transition-all"
          >
            <HiOutlineHome size={24} />
            <span className="font-medium">Go to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all w-full text-left"
          >
            <HiOutlineLogout size={24} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
