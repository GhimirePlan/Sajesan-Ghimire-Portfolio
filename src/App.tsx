import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import { lazy, Suspense, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import type { ReactNode } from 'react';
import HomePage from './pages/HomePage';
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const BlogList = lazy(() => import('./pages/admin/BlogList'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));
const CommentList = lazy(() => import('./pages/admin/CommentList'));
const LinkedInList = lazy(() => import('./pages/admin/LinkedInList'));
function RouteScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
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
                path="/admin/comments"
                element={
                  <AdminRoute>
                    <CommentList />
                  </AdminRoute>
                }
              />
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
                  <div className="p-8">
                    Page not found. <a href="/">Return home</a>
                  </div>
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
