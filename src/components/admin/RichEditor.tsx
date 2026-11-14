import { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { uploadImage } from '../../utils/admin';
import { sanitizeRichContent } from '../content/RichContent';
export default function RichEditor({
  value,
  onChange,
  onBusyChange,
}: {
  value: string;
  onChange: (html: string) => void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const ref = useRef<ReactQuill>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const activeImage = useRef<HTMLImageElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [source, setSource] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const [imageOptions, setImageOptions] = useState<{
    index: number;
    alt: string;
    width: string;
  } | null>(null);
  const modules = useMemo(
    () => ({
      table: true,
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ script: 'sub' }, { script: 'super' }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: { image: () => fileRef.current?.click() },
      },
    }),
    []
  );
  async function insertFiles(files: File[]) {
    if (!files.length) return;
    setBusy(true);
    onBusyChange?.(true);
    setError('');
    try {
      for (const file of files.slice(0, 10)) {
        const url = await uploadImage(file);
        const editor = ref.current?.getEditor();
        if (!editor) continue;
        const index = editor.getSelection(true)?.index ?? editor.getLength() - 1;
        editor.insertEmbed(index, 'image', url, 'user');
        editor.setSelection(index + 1, 0, 'silent');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Image upload failed.');
    } finally {
      setBusy(false);
      onBusyChange?.(false);
    }
  }
  useEffect(() => {
    if (source) return;
    const editor = ref.current?.getEditor();
    if (!editor) return;
    const root = editor.root;
    root.setAttribute('aria-label', 'Body content');
    root.setAttribute('role', 'textbox');
    root.setAttribute('aria-multiline', 'true');
    const pasted = (event: ClipboardEvent) => {
      const files = Array.from(event.clipboardData?.files || []).filter(f =>
        f.type.startsWith('image/')
      );
      if (files.length) {
        event.preventDefault();
        event.stopImmediatePropagation();
        void insertFiles(files);
        return;
      }
      const html = event.clipboardData?.getData('text/html');
      if (html?.includes('data:image/')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        void (async () => {
          setBusy(true);
          onBusyChange?.(true);
          try {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            for (const image of Array.from(doc.images)) {
              if (!image.src.startsWith('data:image/')) continue;
              const response = await fetch(image.src);
              const blob = await response.blob();
              image.src = await uploadImage(new File([blob], 'pasted-image', { type: blob.type }));
            }
            const index = editor.getSelection(true)?.index ?? editor.getLength() - 1;
            editor.clipboard.dangerouslyPasteHTML(
              index,
              sanitizeRichContent(doc.body.innerHTML),
              'user'
            );
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Paste failed.');
          } finally {
            setBusy(false);
            onBusyChange?.(false);
          }
        })();
      }
    };
    const dropped = (event: DragEvent) => {
      const files = Array.from(event.dataTransfer?.files || []).filter(f =>
        f.type.startsWith('image/')
      );
      if (files.length) {
        event.preventDefault();
        event.stopImmediatePropagation();
        void insertFiles(files);
      }
    };
    const dragged = (event: DragEvent) => {
      if (event.dataTransfer?.types.includes('Files')) event.preventDefault();
    };
    const clicked = (event: MouseEvent) => {
      activeImage.current = event.target instanceof HTMLImageElement ? event.target : null;
    };
    root.addEventListener('click', clicked);
    root.addEventListener('paste', pasted, true);
    root.addEventListener('drop', dropped, true);
    root.addEventListener('dragover', dragged);
    return () => {
      root.removeEventListener('click', clicked);
      root.removeEventListener('paste', pasted, true);
      root.removeEventListener('drop', dropped, true);
      root.removeEventListener('dragover', dragged);
    };
  }, [source]);
  return (
    <div className="rich-editor">
      <div className="editor-tools">
        <span>Body editor</span>
        <div>
          <button
            type="button"
            disabled={source || busy}
            onClick={() => ref.current?.getEditor().history.undo()}
          >
            Undo
          </button>
          <button
            type="button"
            disabled={source || busy}
            onClick={() => ref.current?.getEditor().history.redo()}
          >
            Redo
          </button>
          <button type="button" disabled={busy || source} onClick={() => fileRef.current?.click()}>
            Upload image
          </button>
          <button type="button" disabled={source} onClick={() => setShowUrl(!showUrl)}>
            Image URL
          </button>
          <button
            type="button"
            disabled={source}
            onClick={() => {
              const editor = ref.current?.getEditor();
              editor?.focus();
              (editor?.getModule('table') as any)?.insertTable(3, 3);
            }}
          >
            Insert table
          </button>
          <button
            type="button"
            disabled={source || busy}
            onClick={() => {
              const editor = ref.current?.getEditor();
              editor?.focus();
              (editor?.getModule('table') as any)?.insertRowBelow();
            }}
          >
            Add row
          </button>
          <button
            type="button"
            disabled={source || busy}
            onClick={() => {
              const editor = ref.current?.getEditor();
              editor?.focus();
              (editor?.getModule('table') as any)?.insertColumnRight();
            }}
          >
            Add column
          </button>
          <button
            type="button"
            disabled={source || busy}
            onClick={() => {
              const editor = ref.current?.getEditor();
              editor?.focus();
              (editor?.getModule('table') as any)?.deleteTable();
            }}
          >
            Remove table
          </button>
          <button
            type="button"
            disabled={source || busy}
            onClick={() => {
              const editor = ref.current?.getEditor();
              if (!editor) return;
              if (activeImage.current && editor.root.contains(activeImage.current)) {
                const image = activeImage.current;
                const blot = Quill.find(image);
                if (blot) {
                  setImageOptions({
                    index: editor.getIndex(blot as any),
                    alt: image.alt || '',
                    width: image.getAttribute('width') || 'auto',
                  });
                  setError('');
                  return;
                }
              }
              const index = editor.getSelection(true)?.index ?? 0;
              for (const position of [index, Math.max(0, index - 1)]) {
                const leaf = editor.getLeaf(position)[0];
                if (leaf?.domNode instanceof HTMLImageElement) {
                  setImageOptions({
                    index: editor.getIndex(leaf),
                    alt: leaf.domNode.alt || '',
                    width: leaf.domNode.getAttribute('width') || 'auto',
                  });
                  setError('');
                  return;
                }
              }
              setError(
                'Click an image or place the cursor just after it, then choose Image settings.'
              );
            }}
          >
            Image settings
          </button>
          <button type="button" disabled={busy} onClick={() => setSource(!source)}>
            {source ? 'Visual editor' : 'HTML source'}
          </button>
        </div>
      </div>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="sr-only"
        ref={fileRef}
        aria-label="Upload body image"
        onChange={event => {
          void insertFiles(Array.from(event.target.files || []));
          event.target.value = '';
        }}
      />
      {showUrl && (
        <div className="editor-image-url">
          <label>
            Image URL
            <input
              value={imageUrl}
              onChange={event => setImageUrl(event.target.value)}
              placeholder="https://…"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              try {
                const url = new URL(imageUrl);
                if (!['https:', 'http:'].includes(url.protocol)) throw new Error();
                const editor = ref.current?.getEditor();
                editor?.insertEmbed(
                  editor.getSelection(true)?.index ?? editor.getLength() - 1,
                  'image',
                  url.href,
                  'user'
                );
                setShowUrl(false);
                setImageUrl('');
              } catch {
                setError('Enter a valid HTTP or HTTPS image URL.');
              }
            }}
          >
            Insert image
          </button>
        </div>
      )}
      {imageOptions && (
        <div className="editor-image-url">
          <label>
            Image description
            <input
              aria-label="Inline image description"
              value={imageOptions.alt}
              onChange={event => setImageOptions({ ...imageOptions, alt: event.target.value })}
              placeholder="Describe what the image shows"
            />
          </label>
          <label>
            Width
            <select
              aria-label="Inline image width"
              value={imageOptions.width}
              onChange={event => setImageOptions({ ...imageOptions, width: event.target.value })}
            >
              <option value="auto">Original</option>
              <option value="100%">Full width</option>
              <option value="75%">75%</option>
              <option value="50%">50%</option>
              <option value="25%">25%</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              ref.current?.getEditor().formatText(
                imageOptions.index,
                1,
                {
                  alt: imageOptions.alt,
                  width: imageOptions.width === 'auto' ? false : imageOptions.width,
                },
                'user'
              );
              setImageOptions(null);
            }}
          >
            Apply image settings
          </button>
          <button type="button" onClick={() => setImageOptions(null)}>
            Cancel
          </button>
        </div>
      )}
      {source ? (
        <textarea
          className="editor-html-source"
          aria-label="HTML source"
          value={value}
          onChange={event => onChange(event.target.value)}
        />
      ) : (
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value}
          onChange={(html, _delta, source) => {
            if (source === 'user') onChange(html);
          }}
          modules={modules}
        />
      )}
      <div className="editor-help">
        <span>
          {busy
            ? 'Uploading and optimizing image…'
            : 'Paste or drop images into the editor. Use the toolbar for headings, lists, links, code, tables, and video.'}
        </span>
        <span role="status">{error}</span>
      </div>
    </div>
  );
}
