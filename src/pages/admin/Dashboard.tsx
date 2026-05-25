import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { HiOutlineDocumentText, HiOutlineChatAlt2, HiOutlineEye } from 'react-icons/hi';
import { config } from '../../constants/config';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalComments: 0,
    totalViews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: blogs } = await axios.get(`${config.apiBaseUrl}/api/blogs`);
        const { data: comments } = await axios.get(`${config.apiBaseUrl}/api/comments`, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')!).token}` }
        });

        setStats({
          totalBlogs: blogs.length,
          totalComments: comments.length,
          totalViews: blogs.reduce((acc: number, blog: any) => acc + blog.views, 0),
        });
      } catch (error) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { name: 'Total Blogs', value: stats.totalBlogs, icon: <HiOutlineDocumentText className="text-blue-500" size={40} /> },
    { name: 'Total Comments', value: stats.totalComments, icon: <HiOutlineChatAlt2 className="text-green-500" size={40} /> },
    { name: 'Total Views', value: stats.totalViews, icon: <HiOutlineEye className="text-purple-500" size={40} /> },
  ];

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.name} className="bg-tertiary p-8 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-secondary font-medium mb-2">{card.name}</p>
              <h3 className="text-4xl font-bold">{card.value}</h3>
            </div>
            {card.icon}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Recent Activity</h3>
        <div className="bg-tertiary rounded-2xl border border-white/10 p-6">
          <p className="text-secondary">System is active. No major alerts.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
