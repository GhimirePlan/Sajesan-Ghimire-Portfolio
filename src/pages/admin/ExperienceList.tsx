import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';
import { experiences } from '../../constants';
import { adminApi, errorMessage, uploadImage } from '../../utils/admin';
import { EXPERIENCE_CACHE, type ExperienceEntry } from '../../hooks/useExperience';

export default function ExperienceList() {
  const [entries, setEntries] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    adminApi.get('/api/experience/manage').then(({ data }) => {
      if (active) setEntries(data.entries ?? experiences.map(entry => ({ ...entry, isPublished: true })));
    }).catch(error => { if (active) setError(errorMessage(error)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function update(index: number, patch: Partial<ExperienceEntry>) {
    setEntries(current => current.map((entry, i) => i === index ? { ...entry, ...patch } : entry));
    setDirty(true);
  }
  function move(index: number, direction: number) {
    setEntries(current => {
      const next = [...current];
      [next[index], next[index + direction]] = [next[index + direction], next[index]];
      return next;
    });
    setDirty(true);
  }
  async function save(event: React.FormEvent) {
    event.preventDefault(); setSaving(true); setError('');
    try {
      const { data } = await adminApi.put('/api/experience', { entries });
      setEntries(data.entries); setDirty(false);
      try { localStorage.setItem(EXPERIENCE_CACHE, JSON.stringify({ entries: data.entries.filter((entry: ExperienceEntry) => entry.isPublished !== false), time: Date.now() })); } catch {}
      toast.success('Experience saved. Public caches refresh within a few minutes.');
    } catch (error) { setError(errorMessage(error)); }
    finally { setSaving(false); }
  }
  return <AdminLayout>
    <div className="admin-page-heading">
      <div><p className="admin-eyebrow">Professional background</p><h1>Experience</h1>
        <p>Edit your timeline, reorder roles, or hide entries. Changes publish when you save.</p></div>
    </div>
    {error && <p role="alert" className="text-red-300 mb-5">{error}</p>}
    {loading ? <p role="status">Loading editor…</p> : error && !entries.length ?
      <button className="admin-secondary-button" onClick={() => window.location.reload()}>Retry loading</button> :
      <form onSubmit={save} className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="admin-secondary-button" disabled={saving || uploading !== null || entries.length >= 40} onClick={() => {
            setEntries(current => [...current, { title: '', companyName: '', date: '', icon: '', iconBg: '#383e56', points: [], isPublished: true }]); setDirty(true);
          }}>Add experience</button>
          <button className="admin-primary-button" disabled={saving || uploading !== null || !dirty}>{saving ? 'Saving…' : 'Save changes'}</button>
          <span role="status" className="text-secondary text-sm">{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
        </div>
        {entries.length === 0 && <p className="text-secondary">No experience entries. Add a role to start your timeline.</p>}
        {entries.map((entry, index) => <fieldset key={index} disabled={saving || uploading !== null} className="admin-fields rounded-2xl border border-white/10 bg-tertiary/40 p-5 sm:p-6 space-y-4 min-w-0">
          <legend className="px-2 text-sm font-semibold">{index + 1}. {entry.title || 'New experience'}</legend>
          <div className="flex flex-wrap gap-3 items-center">
            <button type="button" className="admin-secondary-button" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Move experience ${index + 1} up`}>↑ Move up</button>
            <button type="button" className="admin-secondary-button" disabled={index === entries.length - 1} onClick={() => move(index, 1)} aria-label={`Move experience ${index + 1} down`}>↓ Move down</button>
            <button type="button" className="text-red-300 text-sm" onClick={() => {
              if (window.confirm('Remove this experience? Save changes to apply.')) { setEntries(current => current.filter((_, i) => i !== index)); setDirty(true); }
            }}>Remove</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm">Role / job title<input required maxLength={180} value={entry.title} onChange={e => update(index, { title: e.target.value })} /></label>
            <label className="block text-sm">Company / organisation<input required maxLength={180} value={entry.companyName} onChange={e => update(index, { companyName: e.target.value })} /></label>
            <label className="block text-sm">Dates<input required maxLength={100} placeholder="Jan 2025 – Present" value={entry.date} onChange={e => update(index, { date: e.target.value })} /></label>
            <label className="admin-check self-end py-3"><input type="checkbox" checked={entry.isPublished !== false} onChange={e => update(index, { isPublished: e.target.checked })} />Show on portfolio</label>
          </div>
          <label className="block text-sm">Highlights <span className="text-secondary">(one per line, up to 15)</span>
            <textarea rows={5} maxLength={15000} value={entry.points.join('\n')} onChange={e => update(index, { points: e.target.value.split('\n') })} />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm">Company logo URL<input maxLength={1000} placeholder="https://… or /image.webp" value={entry.icon} onChange={e => update(index, { icon: e.target.value })} /></label>
            <label className="block text-sm">Logo background<input type="color" value={entry.iconBg} onChange={e => update(index, { iconBg: e.target.value })} /></label>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {entry.icon && <img src={entry.icon} alt={entry.companyName || 'Company logo preview'} width={48} height={48} className="object-contain rounded-lg" />}
            <label className="block text-sm">Upload company logo<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={async e => {
              const file = e.target.files?.[0]; if (!file) return;
              setUploading(index);
              try { update(index, { icon: await uploadImage(file) }); }
              catch (error) { toast.error(errorMessage(error)); }
              finally { setUploading(null); e.target.value = ''; }
            }} /></label>
            {uploading === index && <span role="status" className="text-secondary text-sm">Uploading…</span>}
          </div>
        </fieldset>)}
        <button className="admin-primary-button" disabled={saving || uploading !== null || !dirty}>{saving ? 'Saving…' : 'Save changes'}</button>
      </form>}
  </AdminLayout>;
}
