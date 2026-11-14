import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiBriefcase, FiMessageSquare, FiEye, FiArrowUpRight } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminApi, errorMessage } from '../../utils/admin';
export default function Dashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    void (async () => {
      const results = await Promise.allSettled([
        adminApi.get('/api/blogs/manage'),
        adminApi.get('/api/projects/manage'),
        adminApi.get('/api/comments'),
      ]);
      const setters = [setBlogs, setProjects, setComments];
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') setters[index](result.value.data);
        else setError(errorMessage(result.reason));
      });
      setLoading(false);
    })();
  }, []);
  const activeBlogs = blogs.filter(item => !item.isArchived);
  const activeProjects = projects.filter(item => !item.isArchived);
  const stats = [
    ['Articles', activeBlogs.length, FiFileText, '/admin/blogs'],
    ['Projects', activeProjects.length, FiBriefcase, '/admin/projects'],
    [
      'Awaiting moderation',
      comments.filter(item => !item.isApproved).length,
      FiMessageSquare,
      '/admin/comments',
    ],
    [
      'Content views',
      blogs.reduce((n, item) => n + (item.views || 0), 0) +
        projects.reduce((n, item) => n + (item.views || 0), 0),
      FiEye,
      '/admin/blogs',
    ],
  ] as const;
  const recent = [
    ...activeBlogs.map(item => ({
      ...item,
      kind: 'Article',
      edit: `/admin/blogs/edit/${item._id}`,
    })),
    ...activeProjects.map(item => ({
      ...item,
      kind: 'Project',
      edit: `/admin/projects/edit/${item.id}`,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
    )
    .slice(0, 6);
  return (
    <AdminLayout>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Your publishing workspace</p>
          <h1>Overview</h1>
          <p>Manage your writing, engineering projects, and professional updates.</p>
        </div>
        <div className="admin-heading-actions">
          <Link className="admin-secondary-button" to="/admin/projects/create">
            New project
          </Link>
          <Link className="admin-primary-button" to="/admin/blogs/create">
            Write an article
          </Link>
        </div>
      </div>
      {error && (
        <p role="alert" className="admin-error-banner">
          {error}
        </p>
      )}
      <div className="admin-stat-grid">
        {stats.map(([name, count, Icon, path]) => (
          <Link to={path} key={name} className="admin-stat-card">
            <div>
              <p>{name}</p>
              <strong>{loading ? '…' : count}</strong>
            </div>
            <Icon size={21} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <div className="admin-overview-grid">
        <section className="admin-panel">
          <div className="admin-section-title">
            <h2>Recently updated</h2>
            <span>Latest saved content</span>
          </div>
          {recent.length ? (
            recent.map(item => (
              <Link className="admin-recent-row" key={item.edit} to={item.edit}>
                <div>
                  <p>{item.title}</p>
                  <span>
                    {item.kind} · {item.isPublished ? 'Published' : 'Draft'} ·{' '}
                    {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <FiArrowUpRight />
              </Link>
            ))
          ) : (
            <p className="admin-help mt-5">
              {loading
                ? 'Loading activity…'
                : 'Your recent articles and projects will appear here.'}
            </p>
          )}
        </section>
        <section className="admin-panel">
          <h2>Publishing checklist</h2>
          <ul className="admin-checklist">
            <li>Use a clear title and a concise summary.</li>
            <li>Add a thumbnail and a useful image description.</li>
            <li>Structure the body with headings, images, and supporting links.</li>
            <li>Preview the content, then choose Draft or Published.</li>
          </ul>
          <Link to="/admin/media" className="admin-text-button">
            Manage image library ↗
          </Link>
          <p className="admin-help mt-5">
            Drafts and archived content remain hidden from the public site.
          </p>
        </section>
      </div>
    </AdminLayout>
  );
}
