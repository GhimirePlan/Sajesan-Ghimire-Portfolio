import mongoose from 'mongoose';

const linkedinPostSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
      default: 'Tech',
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const LinkedInPost = mongoose.model('LinkedInPost', linkedinPostSchema);

export default LinkedInPost;
