import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { config } from '../../constants/config';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${config.apiBaseUrl}/api/blogs`);
      setBlogs(data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
        await axios.delete(`${config.apiBaseUrl}/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Blog deleted');
        fetchBlogs();
      } catch (error) {
        toast.error('Failed to delete blog');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Blog Management</h2>
        <Link
          to="/admin/blogs/create"
          className="flex items-center gap-2 bg-[#915EFF] hover:bg-[#7b4ed1] px-6 py-3 rounded-xl font-bold transition-all"
        >
          <HiOutlinePlus size={20} />
          Add New Blog
        </Link>
      </div>

      <div className="bg-tertiary rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-secondary">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {blogs.map((blog: any) => (
              <tr key={blog._id} className="hover:bg-white/5 transition-all">
                <td className="px-6 py-4 font-medium">{blog.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    blog.isPublished ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-secondary text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <Link to={`/admin/blogs/edit/${blog._id}`} className="text-blue-500 hover:text-blue-400">
                      <HiOutlinePencil size={20} />
                    </Link>
                    <button onClick={() => deleteHandler(blog._id)} className="text-red-500 hover:text-red-400">
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default BlogList;
