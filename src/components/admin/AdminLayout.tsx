import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiGrid,
  FiClock,
  FiFileText,
  FiBriefcase,
  FiMessageSquare,
  FiLinkedin,
  FiImage,
  FiLogOut,
  FiExternalLink,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import './admin.css';
export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(false);
    };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', esc);
    };
  }, [menu]);
  const links = [
    ['Overview', '/admin', FiGrid],
    ['Articles', '/admin/blogs', FiFileText],
    ['Projects', '/admin/projects', FiBriefcase],
    ['Experience', '/admin/experience', FiClock],
    ['Media library', '/admin/media', FiImage],
    ['Comments', '/admin/comments', FiMessageSquare],
    ['LinkedIn', '/admin/linkedin', FiLinkedin],
  ] as const;
  return (
    <div className="admin-shell">
      <header className="admin-mobile-header">
        <button
          type="button"
          aria-label={menu ? 'Close admin menu' : 'Open admin menu'}
          aria-expanded={menu}
          aria-controls="admin-navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
        <span>Portfolio studio</span>
        <Link to="/" aria-label="View portfolio">
          <FiExternalLink size={19} />
        </Link>
      </header>
      {menu && (
        <button
          className="admin-nav-backdrop"
          aria-label="Close admin navigation"
          onClick={() => setMenu(false)}
        />
      )}
      <aside className={`admin-sidebar ${menu ? 'admin-sidebar-open' : ''}`}>
        <Link to="/admin" className="admin-brand">
          <span>SG</span>
          <div>
            Portfolio studio<small>Content management</small>
          </div>
        </Link>
        <p className="admin-nav-label">Workspace</p>
        <nav id="admin-navigation" aria-label="Admin navigation">
          {links.map(([label, path, Icon]) => (
            <NavLink key={path} to={path} end={path === '/admin'}>
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <p>
            {user?.name || 'Administrator'}
            <small>Portfolio administrator</small>
          </p>
          <Link to="/" target="_blank" rel="noopener noreferrer">
            <FiExternalLink size={16} />
            View portfolio
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <FiLogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
      <main className="admin-workspace">{children}</main>
    </div>
  );
}
