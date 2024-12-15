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
    image: {
      type: String,
      required: [true, 'An image is required.'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Article', ArticleSchema);
