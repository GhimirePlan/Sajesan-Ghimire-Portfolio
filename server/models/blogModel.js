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
      required: function () {
        return this.isPublished;
      },
    },
    content: {
      type: String,
      required: function () {
        return this.isPublished;
      },
    },
    coverImage: {
      type: String,
      required: function () {
        return this.isPublished;
      },
    },
    coverAlt: { type: String, default: '' },
    isArchived: { type: Boolean, default: false },
    pdfUrl: {
      type: String,
      required: false,
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
