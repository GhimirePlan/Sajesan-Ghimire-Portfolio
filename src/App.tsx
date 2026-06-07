import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { HomePage, ProjectsPage, BlogPost } from "./pages";
import LoginPage from "./pages/admin/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import CommentList from "./pages/admin/CommentList";
import LinkedInList from "./pages/admin/LinkedInList";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          
          {/* Admin Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/blogs" element={<BlogList />} />
          <Route path="/admin/blogs/create" element={<BlogEditor />} />
          <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />
          <Route path="/admin/comments" element={<CommentList />} />
          <Route path="/admin/linkedin" element={<LinkedInList />} />
        </Routes>
        <ToastContainer theme="dark" position="bottom-right" />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
