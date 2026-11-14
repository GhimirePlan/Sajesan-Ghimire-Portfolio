import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiEdit3, FiArchive, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import CopyLinkButton from '../../components/content/CopyLinkButton';
import { adminApi, contentLink, errorMessage } from '../../utils/admin';
export default function ContentList({ kind }: { kind: 'blog' | 'project' }) {
  const root = kind === 'blog' ? 'blogs' : 'projects';
  const label = kind === 'blog' ? 'Articles' : 'Projects';
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('active');
  const [sort, setSort] = useState(kind === 'project' ? 'order' : 'recent');
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const key = (item: any) => (kind === 'blog' ? item._id : item.id);
  async function load() {
    setError('');
    try {
      setItems((await adminApi.get(`/api/${root}/manage`)).data);
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    setSelected([]);
    void load();
  }, [root]);
  const visible = useMemo(
    () =>
      items
        .filter(
          item =>
            (status === 'archived'
              ? item.isArchived
              : !item.isArchived &&
                (status === 'active' ||
                  (status === 'published' && item.isPublished) ||
                  (status === 'draft' && !item.isPublished))) &&
            `${item.title} ${item.description} ${item.tags?.join(' ')} ${
              item.id || item.slug || ''
            }`
              .toLowerCase()
              .includes(query.toLowerCase())
        )
        .sort((a, b) =>
          sort === 'title'
            ? a.title.localeCompare(b.title)
            : sort === 'order'
              ? (a.sortOrder || 0) - (b.sortOrder || 0)
              : new Date(b.updatedAt || b.createdAt).getTime() -
                new Date(a.updatedAt || a.createdAt).getTime()
        ),
    [items, status, query, sort]
  );
  async function mutate(
    item: any,
    action: 'archive' | 'restore' | 'publish' | 'unpublish' | 'delete'
  ) {
    if (
      action === 'archive' &&
      !window.confirm(
        `Archive “${item.title}”? It will be hidden from the public site and can be restored later.`
      )
    )
      return;
    if (
      action === 'delete' &&
      !window.confirm(`Permanently delete “${item.title}”? This cannot be restored.`)
    )
      return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      if (action === 'delete')
        await adminApi.delete(`/api/${root}/${encodeURIComponent(key(item))}?permanent=true`);
      else if (action === 'archive')
        await adminApi.delete(`/api/${root}/${encodeURIComponent(key(item))}`);
      else
        await adminApi.put(
          `/api/${root}/${encodeURIComponent(key(item))}`,
          action === 'restore'
            ? { isArchived: false, isPublished: false }
            : { isPublished: action === 'publish' }
        );
      setNotice(
        action === 'delete'
          ? 'Item permanently deleted.'
          : action === 'archive'
            ? 'Item archived.'
            : action === 'restore'
              ? 'Restored as a draft.'
              : 'Publishing status updated.'
      );
      await load();
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }
  async function bulkArchive() {
    if (!window.confirm(`Archive ${selected.length} selected items? They can be restored later.`))
      return;
    setBusy(true);
    const results = await Promise.allSettled(
      selected.map(id => adminApi.delete(`/api/${root}/${encodeURIComponent(id)}`))
    );
    setSelected([]);
    await load();
    const failed = results.filter(r => r.status === 'rejected').length;
    if (failed) setError(`${failed} item(s) could not be archived.`);
    else setNotice('Selected items archived.');
    setBusy(false);
  }
  return (
    <AdminLayout>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Content library</p>
          <h1>{label}</h1>
          <p>
            {kind === 'blog'
              ? 'Write, format, and publish engineering articles.'
              : 'Manage project case studies, thumbnails, and homepage features.'}
          </p>
        </div>
        <Link className="admin-primary-button" to={`/admin/${root}/create`}>
          <FiPlus />
          New {kind === 'blog' ? 'article' : 'project'}
        </Link>
      </div>
      {error && (
        <p role="alert" className="admin-error-banner">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="admin-success-banner">
          {notice}
        </p>
      )}
      <div className="admin-panel">
        <div className="admin-library-toolbar">
          <label className="admin-search">
            <FiSearch size={17} />
            <span className="sr-only">Search {label.toLowerCase()}</span>
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder={`Search ${label.toLowerCase()}, tags, or links`}
            />
          </label>
          <label className="admin-sort">
            Sort
            <select value={sort} onChange={event => setSort(event.target.value)}>
              <option value="recent">Recently updated</option>
              <option value="title">Title A–Z</option>
              {kind === 'project' && <option value="order">Display order</option>}
            </select>
          </label>
          <button
            type="button"
            className="admin-icon-button"
            aria-label="Refresh content"
            onClick={() => void load()}
          >
            <FiRefreshCw />
          </button>
        </div>
        <div className="admin-status-filters" role="group" aria-label="Content status">
          {[
            ['active', 'All active'],
            ['published', 'Published'],
            ['draft', 'Drafts'],
            ['archived', 'Archived'],
          ].map(([value, name]) => (
            <button
              type="button"
              key={value}
              aria-pressed={status === value}
              onClick={() => {
                setStatus(value);
                setSelected([]);
              }}
            >
              {name}
              <span>
                {
                  items.filter(item =>
                    value === 'archived'
                      ? item.isArchived
                      : !item.isArchived &&
                        (value === 'active' ||
                          (value === 'published' && item.isPublished) ||
                          (value === 'draft' && !item.isPublished))
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        {selected.length > 0 && (
          <div className="admin-selection">
            <span>{selected.length} selected</span>
            <button type="button" disabled={busy} onClick={() => void bulkArchive()}>
              Archive selected
            </button>
            <button type="button" onClick={() => setSelected([])}>
              Clear selection
            </button>
          </div>
        )}
        <div className="admin-list-meta">
          <span>
            {visible.length} {visible.length === 1 ? 'item' : 'items'}
          </span>
          {visible.length > 0 && status !== 'archived' && (
            <label className="admin-check">
              <input
                type="checkbox"
                checked={visible.every(item => selected.includes(key(item)))}
                onChange={event => setSelected(event.target.checked ? visible.map(key) : [])}
              />
              Select all shown
            </label>
          )}
        </div>
        {loading ? (
          <p role="status" className="admin-empty">
            Loading content…
          </p>
        ) : visible.length ? (
          <div className="admin-content-list">
            {visible.map(item => (
              <article className="admin-content-row" key={key(item)}>
                {status !== 'archived' && (
                  <input
                    type="checkbox"
                    aria-label={`Select ${item.title}`}
                    checked={selected.includes(key(item))}
                    onChange={event =>
                      setSelected(previous =>
                        event.target.checked
                          ? [...previous, key(item)]
                          : previous.filter(value => value !== key(item))
                      )
                    }
                  />
                )}
                <div className="admin-list-thumbnail">
                  {item.coverImage ? (
                    <img src={item.coverImage} alt="" loading="lazy" />
                  ) : (
                    <span>{kind === 'blog' ? 'Aa' : '↗'}</span>
                  )}
                </div>
                <div className="admin-content-info">
                  <Link to={`/admin/${root}/edit/${key(item)}`} className="admin-content-title">
                    {item.title}
                  </Link>
                  <div className="admin-content-meta">
                    <span
                      className={`admin-status ${
                        item.isArchived ? 'archived' : item.isPublished ? 'published' : 'draft'
                      }`}
                    >
                      {item.isArchived ? 'Archived' : item.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {item.isFeatured && kind === 'project' && <span>Homepage feature</span>}
                    <span>{new Date(item.updatedAt || item.createdAt).toLocaleDateString()}</span>
                    {kind === 'blog' && <span>{item.views || 0} views</span>}
                  </div>
                </div>
                <div className="admin-row-actions">
                  <Link to={`/admin/${root}/edit/${key(item)}`}>
                    <FiEdit3 size={14} />
                    Edit
                  </Link>
                  <CopyLinkButton url={contentLink(kind, item)} />
                  {item.isPublished && !item.isArchived && (
                    <a href={contentLink(kind, item)} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink size={14} />
                      View
                    </a>
                  )}
                  {item.isArchived ? (
                    <>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void mutate(item, 'restore')}
                      >
                        Restore
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void mutate(item, 'delete')}
                      >
                        Delete permanently
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          void mutate(item, item.isPublished ? 'unpublish' : 'publish')
                        }
                      >
                        {item.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void mutate(item, 'archive')}
                      >
                        <FiArchive size={14} />
                        Archive
                      </button>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="admin-empty">
            <h2>
              {query
                ? 'No matching content'
                : status === 'archived'
                  ? 'Nothing archived yet'
                  : 'No content here yet'}
            </h2>
            <p>
              {query
                ? 'Try another search or change the status filter.'
                : 'Create a draft to get started.'}
            </p>
            {kind === 'project' && items.length === 0 && (
              <button
                type="button"
                disabled={busy}
                className="admin-secondary-button"
                onClick={async () => {
                  setBusy(true);
                  try {
                    const { data } = await adminApi.post('/api/projects/import');
                    setNotice(data.message);
                    await load();
                  } catch (error) {
                    setError(errorMessage(error));
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Import existing portfolio projects
              </button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
