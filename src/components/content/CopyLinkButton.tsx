import { useState } from 'react';
import { FiLink, FiX } from 'react-icons/fi';
export default function CopyLinkButton({
  url,
  label = 'Copy link',
}: {
  url: string;
  label?: string;
}) {
  const [status, setStatus] = useState('');
  return (
    <span className="copy-link-control">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setStatus('Link copied');
          } catch {
            setStatus('fallback');
          }
        }}
      >
        <FiLink size={14} aria-hidden="true" />
        {status === 'Link copied' ? 'Copied' : label}
      </button>
      {status === 'fallback' && (
        <label className="copy-link-fallback">
          <span>Copy this link</span>
          <button type="button" aria-label="Close link field" onClick={() => setStatus('')}>
            <FiX size={17} />
          </button>
          <input readOnly value={url} onFocus={event => event.target.select()} />
        </label>
      )}
      <span className="sr-only" role="status">
        {status === 'Link copied' ? status : ''}
      </span>
    </span>
  );
}
