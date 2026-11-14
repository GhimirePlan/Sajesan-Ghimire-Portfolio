import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { config } from '../../constants/config';
import '../../components/admin/admin.css';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { data } = await axios.post(`${config.apiBaseUrl}/api/users/login`, {
        email,
        password,
      });
      if (!data.isAdmin) {
        setError('This account does not have administrator access.');
        return;
      }
      login(data);
      navigate('/admin', { replace: true });
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Could not sign in. Please try again.'
          : 'Could not sign in.'
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="admin-shell admin-login-page">
      <div className="admin-login-card">
        <Link className="admin-back" to="/">
          <FiArrowLeft />
          Back to portfolio
        </Link>
        <span className="admin-login-icon">
          <FiLock size={23} />
        </span>
        <p className="admin-eyebrow">Portfolio studio</p>
        <h1>Welcome back.</h1>
        <p className="admin-login-description">
          Sign in to manage articles, engineering projects, and media.
        </p>
        {error && (
          <p role="alert" className="admin-error-banner">
            {error}
          </p>
        )}
        <form onSubmit={submit} className="admin-fields">
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              autoComplete="username"
              required
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <span className="admin-password-input">
              <input
                aria-label="Password"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={event => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                aria-label={show ? 'Hide password' : 'Show password'}
                onClick={() => setShow(!show)}
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </button>
            </span>
          </label>
          <button className="admin-primary-button" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}
