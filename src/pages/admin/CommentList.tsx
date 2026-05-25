import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { HiOutlineCheck, HiOutlineX, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { config } from '../../constants/config';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
      const { data } = await axios.get(`${config.apiBaseUrl}/api/comments`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setComments(data);
    } catch (error) {
      toast.error('Failed to fetch comments');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
      await axios.put(`${config.apiBaseUrl}/api/comments/${id}`, 
        { isApproved: !currentStatus },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      toast.success(currentStatus ? 'Comment rejected' : 'Comment approved');
      fetchComments();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const deleteHandler = async (id: string) => {
    if (window.confirm('Delete this comment?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
        await axios.delete(`${config.apiBaseUrl}/api/comments/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Comment deleted');
        fetchComments();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-8">Comment Management</h2>

      <div className="bg-tertiary rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-secondary">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Blog</th>
              <th className="px-6 py-4">Comment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {comments.map((c: any) => (
              <tr key={c._id} className="hover:bg-white/5 transition-all">
                <td className="px-6 py-4">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-secondary">{c.email}</p>
                </td>
                <td className="px-6 py-4 text-sm max-w-[150px] truncate">
                  {c.blog?.title || 'Unknown'}
                </td>
                <td className="px-6 py-4 text-sm max-w-[300px]">
                  {c.comment}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    c.isApproved ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {c.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => toggleStatus(c._id, c.isApproved)} 
                      className={c.isApproved ? 'text-yellow-500' : 'text-green-500'}
                    >
                      {c.isApproved ? <HiOutlineX size={20} /> : <HiOutlineCheck size={20} />}
                    </button>
                    <button onClick={() => deleteHandler(c._id)} className="text-red-500 hover:text-red-400">
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

export default CommentList;
