import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { config } from '../../constants/config';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ color: [] }, { background: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'script', 'super', 'sub',
  'indent',
  'direction',
  'color', 'background',
  'blockquote', 'code-block',
  'link', 'image', 'video',
];

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    coverImage: '',
    tags: '',
    isPublished: false,
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const { data } = await axios.get(`${config.apiBaseUrl}/api/blogs/${id}`);
          setFormData({
            ...data,
            tags: data.tags.join(', '),
          });
        } catch (error) {
          toast.error('Failed to fetch blog');
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
      const payload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        content: formData.content,
        coverImage: formData.coverImage,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        isPublished: formData.isPublished,
      };

      if (id) {
        await axios.put(`${config.apiBaseUrl}/api/blogs/${id}`, payload, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Blog updated');
      } else {
        await axios.post(`${config.apiBaseUrl}/api/blogs`, payload, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Blog created');
      }
      navigate('/admin/blogs');
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-8">{id ? 'Edit Blog' : 'Create New Blog'}</h2>
      
      <form onSubmit={handleSubmit} className="bg-tertiary p-8 rounded-2xl border border-white/10 flex flex-col gap-6">
        <style>{`
          .ql-container {
            font-size: 16px;
            background: white;
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          .ql-toolbar {
            background: #f3f4f6;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
          }
          .ql-editor {
            min-height: 300px;
          }
          .ql-editor blockquote {
            border-left: 4px solid #915EFF !important;
            background: #f9fafb;
            padding: 10px 20px !important;
          }
        `}</style>
        <div className="flex flex-col gap-2">
          <span className="text-white font-medium">Title</span>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            className="bg-primary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-white font-medium">URL Slug (SEO)</span>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="bg-primary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
            placeholder="my-blog-post-title"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-white font-medium">Short Description</span>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-primary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
            rows={3}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-white font-medium">Cover Image URL</span>
          <input
            type="text"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="bg-primary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-white font-medium">Tags (comma separated)</span>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="React, ThreeJS, WebDev"
            className="bg-primary py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-white font-medium">Content</span>
          <div className="bg-white text-black rounded-lg overflow-hidden min-h-[400px]">
            <ReactQuill 
              theme="snow" 
              value={formData.content} 
              onChange={(val) => setFormData({ ...formData, content: val })} 
              modules={modules}
              formats={formats}
              className="h-[350px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="isPublished"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
            className="w-5 h-5 accent-[#915EFF]"
          />
          <label htmlFor="isPublished" className="text-white font-medium cursor-pointer">
            Publish immediately
          </label>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#915EFF] hover:bg-[#7b4ed1] py-3 px-8 text-white font-bold rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Blog'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="bg-white/10 hover:bg-white/20 py-3 px-8 text-white font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default BlogEditor;
