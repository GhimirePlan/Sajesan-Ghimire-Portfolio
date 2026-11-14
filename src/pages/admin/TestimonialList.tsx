import { useEffect, useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';
import { testimonials } from '../../constants';
import { adminApi, errorMessage } from '../../utils/admin';
import { TESTIMONIAL_CACHE, type TestimonialEntry } from '../../hooks/useTestimonials';
export default function TestimonialList() {
  const [entries, setEntries] = useState<TestimonialEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    adminApi.get('/api/testimonials/manage').then(({ data }) => {
      if (active) setEntries(data.entries ?? testimonials.map(({ name, designation, company, testimonial }) => ({ name, designation, company, testimonial, isPublished: true })));
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
  function update(index: number, patch: Partial<TestimonialEntry>) {
    setEntries(current => current.map((entry, i) => i === index ? { ...entry, ...patch } : entry)); setDirty(true);
  }
  function move(index: number, direction: number) {
    setEntries(current => { const next = [...current]; [next[index], next[index + direction]] = [next[index + direction], next[index]]; return next; }); setDirty(true);
  }
  async function save(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError('');
    try {
      const { data } = await adminApi.put('/api/testimonials', { entries });
      setEntries(data.entries); setDirty(false);
      try { localStorage.setItem(TESTIMONIAL_CACHE, JSON.stringify({ entries: data.entries.filter((entry: TestimonialEntry) => entry.isPublished !== false), time: Date.now() })); } catch {}
      toast.success('Testimonials saved.');
    } catch (error) { setError(errorMessage(error)); }
    finally { setSaving(false); }
  }
  return <AdminLayout>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">Professional feedback</p><h1>Testimonials</h1><p>Edit, reorder, or hide feedback. Save changes to publish.</p></div></div>
    {error && <p role="alert" className="text-red-300 mb-5">{error}</p>}
    {loading ? <p role="status">Loading editor…</p> : error && !entries.length ? <button className="admin-secondary-button" onClick={() => window.location.reload()}>Retry loading</button> :
      <form onSubmit={save} className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="admin-secondary-button" disabled={saving || entries.length >= 30} onClick={() => { setEntries(current => [...current, { name: '', designation: '', company: '', testimonial: '', isPublished: true }]); setDirty(true); }}>Add testimonial</button>
          <button className="admin-primary-button" disabled={saving || !dirty}>{saving ? 'Saving…' : 'Save changes'}</button>
          <span role="status" className="text-secondary text-sm">{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
        </div>
        {!entries.length && <p className="text-secondary">No testimonials yet. Add feedback to get started.</p>}
        {entries.map((entry, index) => <fieldset key={index} disabled={saving} className="admin-fields rounded-2xl border border-white/10 bg-tertiary/40 p-5 sm:p-6 min-w-0">
          <legend className="px-2 text-sm font-semibold">{index + 1}. {entry.name || 'New testimonial'}</legend>
          <div className="flex flex-wrap gap-3 items-center">
            <button type="button" className="admin-secondary-button" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Move testimonial ${index + 1} up`}>↑ Move up</button>
            <button type="button" className="admin-secondary-button" disabled={index === entries.length - 1} onClick={() => move(index, 1)} aria-label={`Move testimonial ${index + 1} down`}>↓ Move down</button>
            <button type="button" className="text-red-300 text-sm" onClick={() => { if (window.confirm('Remove this testimonial? Save changes to apply.')) { setEntries(current => current.filter((_, i) => i !== index)); setDirty(true); } }}>Remove</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label>Name<input required maxLength={120} value={entry.name} onChange={e => update(index, { name: e.target.value })} /></label>
            <label>Role / designation<input maxLength={180} value={entry.designation} onChange={e => update(index, { designation: e.target.value })} /></label>
            <label>Company / organisation<input maxLength={180} value={entry.company} onChange={e => update(index, { company: e.target.value })} /></label>
            <label className="admin-check self-end py-3"><input type="checkbox" checked={entry.isPublished !== false} onChange={e => update(index, { isPublished: e.target.checked })} />Show on portfolio</label>
          </div>
          <label>Feedback<textarea required rows={5} maxLength={2000} value={entry.testimonial} onChange={e => update(index, { testimonial: e.target.value })} /></label>
        </fieldset>)}
        <button className="admin-primary-button" disabled={saving || !dirty}>{saving ? 'Saving…' : 'Save changes'}</button>
      </form>}
  </AdminLayout>;
}
