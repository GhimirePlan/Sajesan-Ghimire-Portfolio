import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  HiOutlineClock, 
  HiOutlineCalendar, 
  HiOutlineUser, 
  HiOutlineArrowLeft,
  HiOutlineChevronRight,
  HiOutlineChatAlt2
} from 'react-icons/hi';
import { Navbar, StarsCanvas, Footer } from '../components';
import { toast } from 'react-toastify';
import { config } from '../constants/config';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<TOCItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [commentData, setCommentData] = useState({ name: '', email: '', comment: '' });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${config.apiBaseUrl}/api/blogs/${slug}`);
        setBlog(data);
        fetchComments(data._id);
      } catch (error) {
        toast.error('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const fetchComments = async (blogId: string) => {
    try {
      const { data } = await axios.get(`${config.apiBaseUrl}/api/comments/${blogId}`);
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments');
    }
  };

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Sajesan Ghimire`;
      
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll('h1, h2, h3');
        const tocItems: TOCItem[] = Array.from(headings).map((heading: any, index) => {
          const id = `heading-${index}`;
          heading.id = id;
          return {
            id,
            text: heading.innerText,
            level: parseInt(heading.tagName[1]),
          };
        });
        setToc(tocItems);
      }
    }
  }, [blog]);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const textLength = content.split(/\s+/).length;
    return Math.ceil(textLength / wordsPerMinute);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiBaseUrl}/api/comments`, {
        ...commentData,
        blogId: blog._id
      });
      toast.success('Comment submitted for approval!');
      setCommentData({ name: '', email: '', comment: '' });
    } catch (error) {
      toast.error('Failed to submit comment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#915EFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-white">
        <h2 className="text-4xl font-bold mb-4">Blog Post Not Found</h2>
        <Link to="/" className="text-[#915EFF] hover:underline flex items-center gap-2">
          <HiOutlineArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-primary relative z-0">
      <Navbar />
      
      <div className="relative pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-between text-secondary text-sm mb-8">
            <div className="flex items-center gap-2">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <HiOutlineChevronRight />
              <span className="text-white truncate max-w-[200px]">{blog.title}</span>
            </div>
            <Link to="/" className="flex items-center gap-2 text-[#915EFF] hover:underline font-bold">
              <HiOutlineArrowLeft /> Back to Home
            </Link>
          </nav>

          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-secondary font-medium">
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="text-[#915EFF]" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineClock className="text-[#915EFF]" />
                {calculateReadTime(blog.content)} min read
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineUser className="text-[#915EFF]" />
                Sajesan Ghimire
              </div>
            </div>
          </motion.div>

          {/* Cover Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl"
          >
            <img 
              src={blog.coverImage} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar - Table of Contents */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-32 bg-tertiary/30 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#915EFF] rounded-full" />
                  Table of Contents
                </h4>
                <ul className="space-y-3">
                  {toc.map((item) => (
                    <li 
                      key={item.id}
                      style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                    >
                      <a 
                        href={`#${item.id}`}
                        className="text-secondary hover:text-[#915EFF] text-sm transition-all duration-300 block"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 max-w-4xl">
              <div 
                ref={contentRef}
                className="blog-content text-secondary text-lg leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              <div className="mt-16 flex flex-wrap gap-3">
                {blog.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-sm text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Card */}
              <div className="mt-20 bg-tertiary/40 border border-white/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#915EFF]/20">
                  <img src="/profile11.png" alt="Sajesan Ghimire" className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <h4 className="text-white font-bold text-xl">Sajesan Ghimire</h4>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success('Link copied to clipboard!');
                      }}
                      className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/10 transition-all"
                    >
                      Copy Article Link
                    </button>
                  </div>
                  <p className="text-secondary text-sm mb-4 leading-relaxed">
                    Electrical System Designer & Researcher passionate about sustainable energy solutions and modern web technologies.
                  </p>
                  <Link to="/" className="text-[#915EFF] font-bold text-sm hover:underline">
                    View Portfolio
                  </Link>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-24">
                <h3 className="text-white font-bold text-3xl mb-10 flex items-center gap-3">
                  <HiOutlineChatAlt2 className="text-[#915EFF]" />
                  Comments ({comments.length})
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="bg-tertiary/20 p-8 rounded-3xl border border-white/10 mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-white text-sm font-medium">Name</span>
                      <input 
                        type="text"
                        value={commentData.name}
                        onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                        required
                        className="bg-primary/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[#915EFF] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-white text-sm font-medium">Email</span>
                      <input 
                        type="email"
                        value={commentData.email}
                        onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                        required
                        className="bg-primary/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[#915EFF] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    <span className="text-white text-sm font-medium">Comment</span>
                    <textarea 
                      rows={4}
                      value={commentData.comment}
                      onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                      required
                      className="bg-primary/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[#915EFF] transition-colors"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-[#915EFF] hover:bg-[#7b4ed1] text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-[#915EFF]/20"
                  >
                    Post Comment
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-8">
                  {comments.map((comment: any) => (
                    <div key={comment._id} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white font-bold">{comment.name}</span>
                        <span className="text-secondary text-xs">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-secondary text-sm leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className="relative z-0">
        <StarsCanvas />
        <Footer />
      </div>

      <style>{`
        .blog-content { color: #aaa6c3; line-height: 1.8; }
        .blog-content h1 { font-size: 2.5rem; font-weight: 800; color: white; margin-top: 2.5rem; margin-bottom: 1.5rem; }
        .blog-content h2 { font-size: 2rem; font-weight: 700; color: white; margin-top: 2rem; margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        .blog-content h3 { font-size: 1.5rem; font-weight: 600; color: white; margin-top: 1.5rem; margin-bottom: 1rem; }
        .blog-content p { margin-bottom: 1.5rem; font-size: 1.125rem; }
        .blog-content ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1.5rem; }
        .blog-content ol { list-style-type: decimal; padding-left: 2rem; margin-bottom: 1.5rem; }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content img { border-radius: 1.5rem; margin: 2.5rem auto; display: block; max-width: 100%; height: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .blog-content blockquote { 
          border-left: 6px solid #915EFF; 
          padding: 1.5rem 2rem; 
          font-style: italic; 
          color: #dfd9ff; 
          background: rgba(145, 94, 255, 0.05); 
          border-radius: 0 1.5rem 1.5rem 0;
          margin: 2.5rem 0;
          font-size: 1.25rem;
          position: relative;
        }
        .blog-content blockquote::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 10px;
          font-size: 4rem;
          color: rgba(145, 94, 255, 0.2);
          font-family: serif;
        }
        .blog-content pre { 
          background: #1a1f2e; 
          padding: 1.5rem; 
          border-radius: 1rem; 
          overflow-x: auto; 
          margin: 2.5rem 0; 
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }
        .blog-content code {
          background: rgba(145, 94, 255, 0.1);
          color: #915EFF;
          padding: 0.2rem 0.4rem;
          border-radius: 0.4rem;
          font-size: 0.9em;
        }
        .blog-content a {
          color: #915EFF;
          text-decoration: underline;
          transition: opacity 0.3s;
        }
        .blog-content a:hover {
          opacity: 0.8;
        }
        /* Styling for "Tips" or Callouts (can be done via blockquote or special class) */
        .blog-content .tip {
          background: rgba(34, 197, 94, 0.1);
          border-left: 6px solid #22c55e;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 2rem 0;
          color: #e2e8f0;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
