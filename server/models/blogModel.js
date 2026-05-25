import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Allow multiple documents with no slug
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
