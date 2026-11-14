import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi';
import { BsLinkedin } from 'react-icons/bs';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms/Header';
import { config } from '../../constants/config';
import portrait from '../../assets/profile.webp';

type LinkedInPost = { _id: string; url: string; tag: string; isFeatured: boolean };
type PostCard = LinkedInPost & { tags: string[]; embedUrl: string | null };
function normalizePost(post: LinkedInPost): PostCard | null {
  try {
    const url = new URL(post.url);
    if (url.protocol !== 'https:' || !['linkedin.com', 'www.linkedin.com'].includes(url.hostname))
      return null;
    const match = url.pathname.match(/(?:ugcPost[-:]|activity[-:]|share:)(\d+)/);
    const id = match?.[1];
    const kind = url.pathname.includes('ugcPost') ? 'ugcPost' : 'share';
    return {
      ...post,
      url: `https://www.linkedin.com${url.pathname}`,
      tags: post.tag ? [post.tag] : [],
      embedUrl: id ? `https://www.linkedin.com/embed/feed/update/urn:li:${kind}:${id}` : null,
    };
  } catch {
    return null;
  }
}
function LinkedInSpotlight() {
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get<LinkedInPost[]>(`${config.apiBaseUrl}/api/linkedin`, { signal: controller.signal })
      .then(({ data }) => {
        const unique = new Map<string, PostCard>();
        for (const entry of data) {
          const post = normalizePost(entry);
          if (!post) continue;
          const key = post.embedUrl || post.url;
          const existing = unique.get(key);
          if (existing) {
            existing.tags = [...new Set([...existing.tags, ...post.tags])];
            existing.isFeatured ||= post.isFeatured;
          } else unique.set(key, post);
        }
        setPosts([...unique.values()]);
        setState('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setState('error');
      });
    return () => controller.abort();
  }, []);
  return (
    <>
      <div className="linkedin-section-heading">
        <Header useMotion={false} p="Professional updates" h2="On LinkedIn" />
        <a
          className="linkedin-profile-link"
          href="https://www.linkedin.com/in/sajesan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit my profile <FiArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="text-secondary text-sm leading-7 mt-4 max-w-xl">
        Project updates, professional milestones, and conversations about energy and engineering.
      </p>
      {state === 'loading' && (
        <p role="status" className="text-secondary text-sm mt-7">
          Loading updates…
        </p>
      )}
      {state !== 'loading' && !posts.length && (
        <p role="status" className="text-secondary text-sm mt-7">
          {state === 'error'
            ? 'Updates are temporarily unavailable. You can view them on LinkedIn.'
            : 'Follow my LinkedIn profile for the latest updates.'}
        </p>
      )}
      <div className={`linkedin-post-grid ${posts.length === 1 ? 'linkedin-single-post' : ''}`}>
        {posts.map(post => (
          <article className="linkedin-update-card" key={post._id}>
            <div className="linkedin-post-author">
              <img src={portrait} width={40} height={40} loading="lazy" alt="" />
              <div>
                <p className="text-white text-sm font-medium">Sajesan Ghimire</p>
                <p className="text-secondary text-xs mt-1">Electrical engineer & researcher</p>
              </div>
              <BsLinkedin
                size={20}
                className="text-[#c9b5ff] ml-auto shrink-0"
                aria-label="LinkedIn"
              />
            </div>
            <div className="linkedin-post-labels">
              {post.isFeatured && <span className="linkedin-featured-label">Featured update</span>}
              {post.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="linkedin-post-actions">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                Read on LinkedIn <FiArrowUpRight size={15} aria-hidden="true" />
              </a>
              {post.embedUrl && (
                <button
                  type="button"
                  aria-expanded={preview === post._id}
                  aria-controls={`linkedin-preview-${post._id}`}
                  onClick={() => setPreview(preview === post._id ? null : post._id)}
                >
                  {preview === post._id ? 'Hide preview' : 'Preview post'}
                  <FiChevronDown
                    size={15}
                    className={preview === post._id ? 'rotate-180' : ''}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            {preview === post._id && post.embedUrl && (
              <div className="linkedin-preview" id={`linkedin-preview-${post._id}`}>
                <iframe
                  src={post.embedUrl}
                  title="LinkedIn post by Sajesan Ghimire"
                  height="500"
                  width="100%"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <p className="text-secondary text-xs leading-6 mt-3">
                  If the preview is unavailable,{' '}
                  <a
                    className="underline"
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    open the post on LinkedIn
                  </a>
                  .
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
export default SectionWrapper(LinkedInSpotlight, 'linkedin');
