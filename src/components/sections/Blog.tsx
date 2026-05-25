import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { styles } from '../../constants/styles';
import { config } from '../../constants/config';

const BlogCard = ({ _id, slug, index, title, description, coverImage, createdAt, tags }: any) => {
  const linkPath = slug || _id;
  
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full flex flex-col">
        <div className="relative w-full h-[230px]">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="mt-5 flex-1">
          <h3 className="text-white font-bold text-[24px] line-clamp-2">{title}</h3>
          <p className="mt-2 text-secondary text-[14px] line-clamp-3">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag: string) => (
            <p key={tag} className="text-[14px] text-blue-text-gradient">
              #{tag}
            </p>
          ))}
        </div>

        <div className="mt-5 flex justify-between items-center">
          <span className="text-secondary text-[12px]">
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <Link 
            to={`/blogs/${linkPath}`}
            className="text-[#915EFF] font-bold hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${config.apiBaseUrl}/api/blogs`);
        setBlogs(data.filter((b: any) => b.isPublished).slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch blogs');
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My thoughts</p>
        <h2 className={styles.sectionHeadText}>Blog.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Sharing my experiences, insights, and technical guides. Here are some of my recent posts.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {blogs.map((blog: any, index: number) => (
          <BlogCard key={blog._id} index={index} {...blog} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Blog, 'blog');
