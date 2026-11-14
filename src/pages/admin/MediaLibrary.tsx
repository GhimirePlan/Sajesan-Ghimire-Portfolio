import { useEffect, useRef, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminApi, errorMessage, mediaUrl, uploadImage } from '../../utils/admin';
import CopyLinkButton from '../../components/content/CopyLinkButton';
export default function MediaLibrary() {
  const [files, setFiles] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const load = async () => {
    try {
      setFiles((await adminApi.get('/api/media/manage')).data);
    } catch (error) {
      setError(errorMessage(error));
    }
  };
  useEffect(() => {
    void load();
  }, []);
  return (
    <AdminLayout>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Uploaded assets</p>
          <h1>Media library</h1>
          <p>Reuse uploaded images in article bodies, project case studies, and thumbnails.</p>
        </div>
        <button
          type="button"
          disabled={busy}
          className="admin-primary-button"
          onClick={() => fileInput.current?.click()}
        >
          {busy ? 'Uploading…' : 'Upload images'}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple
          className="sr-only"
          aria-label="Upload library images"
          onChange={async event => {
            const incoming = Array.from(event.target.files || []);
            event.target.value = '';
            setBusy(true);
            setError('');
            try {
              for (const file of incoming) await uploadImage(file);
              await load();
            } catch (error) {
              setError(error instanceof Error ? error.message : 'Upload failed');
              await load();
            } finally {
              setBusy(false);
            }
          }}
        />
      </div>
      {error && (
        <p role="alert" className="admin-error-banner">
          {error}
        </p>
      )}
      <div className="admin-media-grid">
        {files.map(file => (
          <article className="admin-panel" key={file._id}>
            <a href={mediaUrl(file.url)} target="_blank" rel="noopener noreferrer">
              <img
                src={mediaUrl(file.url)}
                alt={file.filename || 'Uploaded image'}
                loading="lazy"
              />
            </a>
            <h2>{file.filename || 'Image'}</h2>
            <p>
              {Math.round(file.bytes / 1024)} KB · {new Date(file.createdAt).toLocaleDateString()}
            </p>
            <CopyLinkButton url={new URL(mediaUrl(file.url), window.location.origin).href} />
            <div className="admin-media-actions">
              <button
                type="button"
                onClick={async () => {
                  const name = window.prompt('Image filename', file.filename);
                  if (!name || name === file.filename) return;
                  try {
                    await adminApi.patch(`/api/media/${file._id}`, { filename: name });
                    await load();
                  } catch (error) {
                    setError(errorMessage(error));
                  }
                }}
              >
                Rename
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (
                    !window.confirm(
                      'Delete this image? Images used by saved content cannot be deleted.'
                    )
                  )
                    return;
                  try {
                    await adminApi.delete(`/api/media/${file._id}`);
                    await load();
                  } catch (error) {
                    setError(errorMessage(error));
                  }
                }}
              >
                Delete unused image
              </button>
            </div>
          </article>
        ))}
      </div>
      {!files.length && !error && (
        <p className="admin-empty">
          No images uploaded yet. Upload an image here or from an editor.
        </p>
      )}
    </AdminLayout>
  );
}
