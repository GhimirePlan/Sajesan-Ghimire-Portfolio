import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { config } from '../../constants/config';
import { BsLinkedin } from 'react-icons/bs';

const LinkedInList = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    url: '',
    tag: 'Tech',
    isFeatured: false,
  });

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${config.apiBaseUrl}/api/linkedin`);
      setPosts(data);
    } catch (error) {
      toast.error('Failed to fetch LinkedIn posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      url: post.url,
      tag: post.tag,
      isFeatured: post.isFeatured,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this LinkedIn post?')) {
      try {
        const userInfoStr = localStorage.getItem('userInfo');
        if (!userInfoStr) {
          toast.error('You must be logged in');
          return;
        }
        const userInfo = JSON.parse(userInfoStr);
        await axios.delete(`${config.apiBaseUrl}/api/linkedin/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Post removed');
        fetchPosts();
      } catch (error: any) {
        console.error('Delete error:', error);
        const message = error.response?.data?.message || 'Failed to delete post';
        toast.error(message);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userInfoStr = localStorage.getItem('userInfo');
      if (!userInfoStr) {
        toast.error('You must be logged in');
        return;
      }
      
      const userInfo = JSON.parse(userInfoStr);
      const authHeader = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };

      if (editingPost) {
        await axios.put(`${config.apiBaseUrl}/api/linkedin/${editingPost._id}`, formData, authHeader);
        toast.success('Post updated');
      } else {
        await axios.post(`${config.apiBaseUrl}/api/linkedin`, formData, authHeader);
        toast.success('Post added');
      }
      setShowModal(false);
      setEditingPost(null);
      setFormData({ url: '', tag: 'Tech', isFeatured: false });
      fetchPosts();
    } catch (error: any) {
      console.error('Save error:', error);
      const message = error.response?.data?.message || 'Failed to save post';
      toast.error(message);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <BsLinkedin className="text-[#0A66C2] text-[30px]" />
          <h2 className="text-3xl font-bold">LinkedIn Spotlights</h2>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setFormData({ url: '', tag: 'Tech', isFeatured: false });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#915EFF] hover:bg-[#7b4ed1] px-6 py-3 rounded-xl font-bold transition-all"
        >
          <HiOutlinePlus size={20} />
          Add LinkedIn URL
        </button>
      </div>

      <div className="bg-tertiary rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-secondary">
            <tr>
              <th className="px-6 py-4">URL</th>
              <th className="px-6 py-4">Tag</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map((post: any) => (
              <tr key={post._id} className="hover:bg-white/5 transition-all">
                <td className="px-6 py-4 font-medium truncate max-w-[400px]">
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {post.url}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10">
                    {post.tag}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {post.isFeatured ? (
                    <span className="text-yellow-400">Γÿà Yes</span>
                  ) : (
                    <span className="text-secondary">No</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button onClick={() => handleEdit(post)} className="text-blue-500 hover:text-blue-400">
                      <HiOutlinePencil size={20} />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-400">
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1d1836] w-full max-w-lg rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">
              {editingPost ? 'Edit LinkedIn URL' : 'Add LinkedIn URL'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-secondary mb-2">LinkedIn Post URL</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://www.linkedin.com/posts/..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#915EFF]"
                />
                <p className="text-[11px] text-secondary mt-2 italic">
                  Example: https://www.linkedin.com/posts/username_activity-1234567890-abcd
                </p>
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-secondary mb-2">Tag</label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#915EFF]"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Personal">Personal</option>
                    <option value="Achievement">Achievement</option>
                    <option value="Research">Research</option>
                    <option value="Career">Career</option>
                  </select>
                </div>
                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-5 h-5 accent-[#915EFF]"
                    />
                    <span className="text-secondary">Featured</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-[#915EFF] hover:bg-[#7b4ed1] transition-all"
                >
                  {editingPost ? 'Update URL' : 'Save URL'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default LinkedInList;
