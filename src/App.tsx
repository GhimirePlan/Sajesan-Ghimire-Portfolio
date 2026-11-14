import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import { lazy, Suspense, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import useSeo from './hooks/useSeo';
import type { ReactNode } from 'react';
import HomePage from './pages/HomePage';
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const BlogList = lazy(() => import('./pages/admin/BlogList'));
const ProjectList = lazy(() => import('./pages/admin/ProjectList'));
const ProjectEditor = lazy(() => import('./pages/admin/ProjectEditor'));
const MediaLibrary = lazy(() => import('./pages/admin/MediaLibrary'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));
const CommentList = lazy(() => import('./pages/admin/CommentList'));
const ExperienceList = lazy(() => import('./pages/admin/ExperienceList'));
const LinkedInList = lazy(() => import('./pages/admin/LinkedInList'));
function RouteScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.append(robots); }
    if (pathname === '/login' || pathname.startsWith('/admin')) robots.content = 'noindex, nofollow';
    // Wait until route content mounts and any project dialog releases its scroll lock.
    let observer: MutationObserver | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const frame = requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo(0, 0);
        return;
      }
      const scrollToTarget = () => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) return false;
        target.scrollIntoView({ block: 'start' });
        return true;
      };
      if (scrollToTarget()) return;
      observer = new MutationObserver(() => {
        if (scrollToTarget()) observer?.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = setTimeout(() => observer?.disconnect(), 5000);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  const { pathname } = useLocation();
  useSeo({ title: 'Page not found | Sajesan Ghimire', description: 'The requested page could not be found.', path: pathname, noindex: true });
  return <main className="p-8 pt-28"><h1>Page not found</h1><a href="/">Return home</a></main>;
}

function AdminRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return user?.isAdmin && user?.token ? <>{children}</> : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <RouteScroll />
          <Suspense
            fallback={
              <div role="status" className="p-8">
                Loading…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />

              {/* Admin Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/blogs"
                element={
                  <AdminRoute>
                    <BlogList />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/blogs/create"
                element={
                  <AdminRoute>
                    <BlogEditor />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/blogs/edit/:id"
                element={
                  <AdminRoute>
                    <BlogEditor />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <AdminRoute>
                    <ProjectList />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/projects/create"
                element={
                  <AdminRoute>
                    <ProjectEditor />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/projects/edit/:id"
                element={
                  <AdminRoute>
                    <ProjectEditor />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/media"
                element={
                  <AdminRoute>
                    <MediaLibrary />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/comments"
                element={
                  <AdminRoute>
                    <CommentList />
                  </AdminRoute>
                }
              />
              <Route path="/admin/experience" element={<AdminRoute><ExperienceList /></AdminRoute>} />
              <Route
                path="/admin/linkedin"
                element={
                  <AdminRoute>
                    <LinkedInList />
                  </AdminRoute>
                }
              />
              <Route
                path="*"
                element={
                  <NotFound />
                }
              />
            </Routes>
          </Suspense>
          <ToastContainer theme="dark" position="bottom-right" />
        </BrowserRouter>
      </MotionConfig>
    </ErrorBoundary>
  );
};

export default App;
