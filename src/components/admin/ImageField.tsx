import { useRef, useState } from 'react';
import { adminApi, mediaUrl, uploadImage, errorMessage } from '../../utils/admin';
export default function ImageField({
  value,
  onChange,
  alt,
  onAltChange,
  onBusyChange,
}: {
  value: string;
  onChange: (url: string) => void;
  alt: string;
  onAltChange: (alt: string) => void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [library, setLibrary] = useState<any[] | null>(null);
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true);
    onBusyChange?.(true);
    setError('');
    try {
      onChange(await uploadImage(file));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setBusy(false);
      onBusyChange?.(false);
    }
  }
  return (
    <div className="image-field">
      <label>
        Thumbnail URL
        <input
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder="Paste an image URL or upload below"
        />
      </label>
      <div
        className="image-dropzone"
        onDragOver={event => event.preventDefault()}
        onDrop={event => {
          event.preventDefault();
          void upload(event.dataTransfer.files[0]);
        }}
        onPaste={event => {
          const file = Array.from(event.clipboardData.files).find(f => f.type.startsWith('image/'));
          if (file) {
            event.preventDefault();
            void upload(file);
          }
        }}
        tabIndex={0}
        aria-label="Thumbnail upload or paste area"
      >
        {value ? (
          <img src={value} alt={alt || 'Thumbnail preview'} />
        ) : (
          <p>Drop or paste an image here</p>
        )}
        <div className="flex gap-3 flex-wrap">
          <button type="button" disabled={busy} onClick={() => input.current?.click()}>
            {busy ? 'Uploading…' : value ? 'Replace thumbnail' : 'Upload thumbnail'}
          </button>
          {value && (
            <button type="button" onClick={() => onChange('')}>
              Remove
            </button>
          )}
        </div>
        <input
          ref={input}
          className="sr-only"
          aria-label="Thumbnail file"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={event => {
            void upload(event.target.files?.[0]);
            event.target.value = '';
          }}
        />
      </div>
      <label>
        Image description (alt text)
        <input
          value={alt}
          onChange={event => onAltChange(event.target.value)}
          maxLength={250}
          placeholder="Describe the image for accessibility"
        />
      </label>
      <button
        className="admin-text-button"
        type="button"
        onClick={async () => {
          if (library) {
            setLibrary(null);
            return;
          }
          try {
            setLibrary((await adminApi.get('/api/media/manage')).data);
          } catch (error) {
            setError(errorMessage(error));
          }
        }}
      >
        {library ? 'Close image library' : 'Choose an uploaded image'}
      </button>
      {library && (
        <div className="media-choice-grid">
          {library.length ? (
            library.map(file => (
              <button
                key={file._id}
                type="button"
                onClick={() => {
                  onChange(mediaUrl(file.url));
                  setLibrary(null);
                }}
              >
                <img
                  src={mediaUrl(file.url)}
                  alt={file.filename || 'Uploaded image'}
                  loading="lazy"
                />
                <span>{file.filename}</span>
              </button>
            ))
          ) : (
            <p>No uploaded images yet.</p>
          )}
        </div>
      )}
      {error && (
        <p role="alert" className="admin-error">
          {error}
        </p>
      )}
      <p className="admin-help">
        PNG, JPEG, WebP or GIF. Photos are resized and optimized before upload.
      </p>
    </div>
  );
}
