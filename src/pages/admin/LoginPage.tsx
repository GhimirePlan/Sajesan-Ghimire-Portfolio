import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { config } from '../../constants/config';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${config.apiBaseUrl}/api/users/login`, {
        email,
        password,
      });
      login(data);
      toast.success('Logged in successfully');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-tertiary p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-white font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-primary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-primary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#915EFF] py-3 px-8 text-white font-bold rounded-xl hover:bg-[#7b4ed1] transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
