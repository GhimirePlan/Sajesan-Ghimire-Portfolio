import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiEye, FiEdit3 } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import RichEditor from '../../components/admin/RichEditor';
import ImageField from '../../components/admin/ImageField';
import RichContent from '../../components/content/RichContent';
import CopyLinkButton from '../../components/content/CopyLinkButton';
import { adminApi, errorMessage, slugify, contentLink } from '../../utils/admin';
import { disciplines } from '../../constants/projectCatalog';
type Kind = 'blog' | 'project';
type EditorData = {
  title: string;
  subtitle: string;
  slug: string;
  id: string;
  description: string;
  content: string;
  coverImage: string;
  coverAlt: string;
  pdfUrl: string;
  sourceUrl: string;
  tags: string;
  details: string;
  scope: string;
  discipline: string;
  group: string;
  sortOrder: number;
  isPublished: boolean;
  isArchived: boolean;
  isFeatured: boolean;
};
const empty: EditorData = {
  title: '',
  subtitle: '',
  slug: '',
  id: '',
  description: '',
  content: '',
  coverImage: '',
  coverAlt: '',
  pdfUrl: '',
  sourceUrl: '',
  tags: '',
  details: '',
  scope: 'professional',
  discipline: 'solar',
  group: '',
  sortOrder: 0,
  isPublished: false,
  isArchived: false,
  isFeatured: false,
};
const fromRecord = (data: any): EditorData => ({
  ...empty,
  ...data,
  slug: data.slug || slugify(data.title || ''),
  tags: (data.tags || []).join(', '),
  details: (data.details || []).join('\n'),
});
export default function ContentEditor({ kind }: { kind: Kind }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const root = kind === 'blog' ? 'blogs' : 'projects';
  const noun = kind === 'blog' ? 'article' : 'project';
  const [form, setForm] = useState<EditorData>(empty);
  const [baseline, setBaseline] = useState(JSON.stringify(empty));
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [preview, setPreview] = useState(false);
  const [bodyBusy, setBodyBusy] = useState(false);
  const [imageBusy, setImageBusy] = useState(false);
  const [recovery, setRecovery] = useState<{ form: EditorData; at: number } | null>(null);
  const [localSaved, setLocalSaved] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const latest = useRef({ form: empty, dirty: false });
  let userId = 'owner';
  try {
    userId = JSON.parse(localStorage.getItem('userInfo') || 'null')?._id || 'owner';
  } catch {}
  const draftKey = `portfolio-draft:${userId}:${kind}:${id || 'new'}`;
  const dirty = ready && JSON.stringify(form) !== baseline;
  latest.current = { form, dirty };
  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setLoadError('');
    setError('');
    setNotice('');
    setRecovery(null);
    setPreview(false);
    (async () => {
      try {
        const data = id
          ? fromRecord((await adminApi.get(`/api/${root}/manage/${encodeURIComponent(id)}`)).data)
          : { ...empty };
        if (cancelled) return;
        setForm(data);
        setBaseline(JSON.stringify(data));
        try {
          const saved = JSON.parse(localStorage.getItem(draftKey) || 'null');
          if (saved?.form && JSON.stringify(saved.form) !== JSON.stringify(data))
            setRecovery(saved);
        } catch {}
        setReady(true);
      } catch (error) {
        if (!cancelled) setLoadError(errorMessage(error));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, kind, draftKey, root]);
  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ form, at: Date.now() }));
        setLocalSaved('Local draft saved');
      } catch {
        setLocalSaved('Local draft storage is full. Save your changes to the server.');
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [form, dirty, draftKey]);
  useEffect(
    () => () => {
      if (latest.current.dirty)
        try {
          localStorage.setItem(
            draftKey,
            JSON.stringify({ form: latest.current.form, at: Date.now() })
          );
        } catch {}
    },
    [draftKey]
  );
  useEffect(() => {
    const before = (event: BeforeUnloadEvent) => {
      if (dirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    const hotkey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        if (!saving && !bodyBusy && !imageBusy) formRef.current?.requestSubmit();
      }
    };
    window.addEventListener('beforeunload', before);
    window.addEventListener('keydown', hotkey);
    return () => {
      window.removeEventListener('beforeunload', before);
      window.removeEventListener('keydown', hotkey);
    };
  }, [dirty, saving, bodyBusy, imageBusy]);
  function change<K extends keyof EditorData>(key: K, value: EditorData[K]) {
    setForm(previous => ({ ...previous, [key]: value }));
    setNotice('');
  }
  function changeTitle(title: string) {
    setForm(previous => {
      const field = kind === 'blog' ? 'slug' : 'id';
      return {
        ...previous,
        title,
        ...(!id && (!previous[field] || previous[field] === slugify(previous.title))
          ? { [field]: slugify(title) }
          : {}),
      };
    });
  }
  const words = form.content
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  async function save(event: FormEvent) {
    event.preventDefault();
    if (saving || bodyBusy || imageBusy) return;
    setError('');
    if (
      form.isPublished &&
      (!form.description.trim() ||
        (kind === 'blog' && (!form.coverImage || (!words && !form.content.includes('<img')))))
    ) {
      setError(
        'Before publishing, add a summary' +
          (kind === 'blog' ? ', body content, and thumbnail.' : '.')
      );
      setPreview(false);
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map(value => value.trim())
          .filter(Boolean),
        details: form.details
          .split('\n')
          .map(value => value.trim())
          .filter(Boolean),
      };
      const { data } = id
        ? await adminApi.put(`/api/${root}/${encodeURIComponent(id)}`, payload)
        : await adminApi.post(`/api/${root}`, payload);
      const saved = fromRecord(data);
      latest.current = { form: saved, dirty: false };
      setForm(saved);
      setBaseline(JSON.stringify(saved));
      localStorage.removeItem(draftKey);
      setRecovery(null);
      setLocalSaved('');
      setNotice(
        `${kind === 'blog' ? 'Article' : 'Project'} saved${
          data.isPublished ? ' and published' : ' as a draft'
        }.`
      );
      if (!id)
        navigate(`/admin/${root}/edit/${kind === 'blog' ? data._id : data.id}`, { replace: true });
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }
  function leave() {
    if (
      dirty &&
      !window.confirm('Leave this editor? Your local draft will be available when you return.')
    )
      return;
    navigate(`/admin/${root}`);
  }
  if (loadError)
    return (
      <AdminLayout>
        <div className="admin-panel">
          <h1>Unable to load {noun}</h1>
          <p role="alert" className="admin-error">
            {loadError}
          </p>
          <Link to={`/admin/${root}`}>Return to content library</Link>
        </div>
      </AdminLayout>
    );
  if (!ready)
    return (
      <AdminLayout>
        <p role="status">Loading editor…</p>
      </AdminLayout>
    );
  return (
    <AdminLayout>
      <div className="admin-page-heading">
        <div>
          <button type="button" onClick={leave} className="admin-back">
            <FiArrowLeft size={15} />
            All {root === 'blogs' ? 'articles' : 'projects'}
          </button>
          <h1>
            {id ? 'Edit' : 'Create'} {noun}
          </h1>
          <p>
            {dirty
              ? 'Unsaved changes'
              : id
                ? 'Changes saved'
                : 'Start with a draft. Publish when you are ready.'}
            {dirty && localSaved ? ` · ${localSaved}` : ''}
          </p>
        </div>
        <div className="admin-heading-actions">
          <button
            type="button"
            className="admin-secondary-button"
            disabled={bodyBusy || imageBusy}
            aria-pressed={preview}
            onClick={() => setPreview(!preview)}
          >
            {preview ? <FiEdit3 /> : <FiEye />}
            {preview ? 'Edit content' : 'Preview'}
          </button>
          <button
            type="submit"
            form="content-editor-form"
            disabled={saving || bodyBusy || imageBusy}
            className="admin-primary-button"
          >
            <FiSave />
            {saving ? 'Saving…' : `Save ${noun}`}
          </button>
        </div>
      </div>
      {recovery && (
        <div className="admin-recovery">
          <p>A local draft from {new Date(recovery.at).toLocaleString()} is available.</p>
          <button
            type="button"
            onClick={() => {
              setForm({ ...empty, ...recovery.form });
              setRecovery(null);
            }}
          >
            Restore draft
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem(draftKey);
              setRecovery(null);
            }}
          >
            Discard draft
          </button>
        </div>
      )}
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
      <form id="content-editor-form" ref={formRef} onSubmit={save} className="admin-editor-grid">
        <div className="admin-editor-main">
          {preview ? (
            <article className="admin-panel admin-preview">
              <p className="admin-eyebrow">{form.isPublished ? 'Published' : 'Draft'} preview</p>
              {form.coverImage && (
                <img
                  src={form.coverImage}
                  alt={form.coverAlt || form.title}
                  className="admin-preview-cover"
                />
              )}
              <h2>{form.title || 'Untitled ' + noun}</h2>
              <p className="admin-preview-summary">{form.description}</p>
              <p className="admin-help mb-6">
                {words} words · {Math.max(1, Math.ceil(words / 200))} min read
              </p>
              <RichContent html={form.content} />
              {kind === 'project' && form.details && (
                <ul className="mt-6 text-secondary text-sm list-disc pl-5">
                  {form.details
                    .split('\n')
                    .filter(Boolean)
                    .map(detail => (
                      <li key={detail}>{detail}</li>
                    ))}
                </ul>
              )}
            </article>
          ) : (
            <>
              <div className="admin-panel admin-fields">
                <h2>Content</h2>
                <label>
                  {kind === 'blog' ? 'Article' : 'Project'} title
                  <input
                    required
                    maxLength={220}
                    value={form.title}
                    onChange={event => changeTitle(event.target.value)}
                    placeholder={
                      kind === 'blog' ? 'A clear, descriptive article title' : 'Project name'
                    }
                  />
                </label>
                {kind === 'project' && (
                  <label>
                    Subtitle
                    <input
                      maxLength={280}
                      value={form.subtitle || ''}
                      onChange={event =>
                        setForm({ ...form, subtitle: event.target.value } as EditorData)
                      }
                      placeholder="Capacity, location, or project focus"
                    />
                  </label>
                )}
                <label>
                  Summary
                  <textarea
                    rows={3}
                    maxLength={1600}
                    value={form.description}
                    onChange={event => change('description', event.target.value)}
                    placeholder="A concise summary for cards and search results"
                  />
                  <small>{form.description.length}/1600 characters</small>
                </label>
              </div>
              <div className="admin-panel admin-body-panel">
                <div className="admin-section-title">
                  <h2>{kind === 'blog' ? 'Article body' : 'Project case study'}</h2>
                  <span>
                    {words} words · {Math.max(1, Math.ceil(words / 200))} min read
                  </span>
                </div>
                <RichEditor
                  value={form.content}
                  onChange={value => change('content', value)}
                  onBusyChange={setBodyBusy}
                />
              </div>
              {kind === 'project' && (
                <div className="admin-panel admin-fields">
                  <h2>Project highlights</h2>
                  <label>
                    Role, outcome, and status — one item per line
                    <textarea
                      rows={4}
                      value={form.details}
                      onChange={event => change('details', event.target.value)}
                      placeholder={
                        'Role: Electrical design and site coordination\nOutcome: Commissioned installation'
                      }
                    />
                  </label>
                  <label>
                    Source / publication URL
                    <input
                      value={form.sourceUrl}
                      onChange={event => change('sourceUrl', event.target.value)}
                      placeholder="https://…"
                    />
                  </label>
                </div>
              )}
            </>
          )}
        </div>
        <aside className="admin-editor-aside">
          <div className="admin-panel admin-fields">
            <h2>Publishing</h2>
            <label>
              Status
              <select
                aria-label="Publishing status"
                disabled={form.isArchived}
                value={form.isPublished ? 'published' : 'draft'}
                onChange={event => change('isPublished', event.target.value === 'published')}
              >
                <option value="draft">Draft — not public</option>
                <option value="published">Published — visible on site</option>
              </select>
            </label>
            {form.isArchived && (
              <p className="admin-help">
                This item is archived. Restore it in the library before publishing.
              </p>
            )}
            <label>
              {kind === 'blog' ? 'URL slug' : 'Project link ID'}
              <input
                required
                readOnly={kind === 'project' && !!id}
                value={kind === 'blog' ? form.slug : form.id}
                onChange={event => change(kind === 'blog' ? 'slug' : 'id', event.target.value)}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                maxLength={180}
              />
              <small>
                {kind === 'project' && id
                  ? 'The existing project link is preserved.'
                  : 'Lowercase letters, numbers, and hyphens.'}
              </small>
            </label>
            {((form.slug && kind === 'blog') || (form.id && kind === 'project')) && (
              <CopyLinkButton url={contentLink(kind, form)} label="Copy post link" />
            )}
            {id && form.isPublished && (
              <a
                className="admin-text-button"
                href={contentLink(kind, form)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open published {noun} ↗
              </a>
            )}
            {kind === 'project' && (
              <>
                <label>
                  Project type
                  <select
                    aria-label="Project type"
                    value={form.scope}
                    onChange={event => change('scope', event.target.value)}
                  >
                    <option value="professional">Professional</option>
                    <option value="academic">Academic & research</option>
                  </select>
                </label>
                <label>
                  Discipline
                  <select
                    aria-label="Discipline"
                    value={form.discipline}
                    onChange={event => change('discipline', event.target.value)}
                  >
                    {disciplines.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Display order
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    value={form.sortOrder}
                    onChange={event => change('sortOrder', Number(event.target.value))}
                  />
                </label>
                <label className="admin-check">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={event => change('isFeatured', event.target.checked)}
                  />
                  Feature on homepage
                </label>
              </>
            )}
          </div>
          <div className="admin-panel admin-fields">
            <h2>Thumbnail</h2>
            <ImageField
              value={form.coverImage}
              onChange={value => change('coverImage', value)}
              alt={form.coverAlt}
              onAltChange={value => change('coverAlt', value)}
              onBusyChange={setImageBusy}
            />
          </div>
          <div className="admin-panel admin-fields">
            <h2>Organization & attachments</h2>
            <label>
              Tags — comma separated
              <input
                value={form.tags}
                onChange={event => change('tags', event.target.value)}
                placeholder="Solar PV, MATLAB, Power systems"
              />
            </label>
            <label>
              Document / PDF URL
              <input
                value={form.pdfUrl}
                onChange={event => change('pdfUrl', event.target.value)}
                placeholder="https://…"
              />
              <small>Use a publicly accessible PDF or Google Drive link.</small>
            </label>
          </div>
          <p className="admin-help">
            Ctrl / ⌘ + S saves changes. Local drafts help recover edits on this device; click Save
            to store them online.
          </p>
        </aside>
      </form>
    </AdminLayout>
  );
}
