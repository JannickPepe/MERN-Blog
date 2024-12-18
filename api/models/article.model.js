import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
    },
    text: {
      type: String,
      required: [true, 'Text content is required.'],
    },
    link: {
      type: String,
      required: [true, 'A URL is required.'],
      validate: {
        validator: (v) => {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: 'Please enter a valid URL.',
      },
    },
    likes: { 
      type: Number, 
      default: 0 
    },
    likedByUsers: 
    { type: [String], 
      default: [] 
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rank: { 
      type: Number, 
      default: 0 
  },
  },
  { timestamps: true }
);



export default mongoose.model('Article', ArticleSchema);
