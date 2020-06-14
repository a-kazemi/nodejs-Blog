const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'Post must have name!'],
      unique: true
    },
    Image: {
      type: String,
      required: true
    },
    description: String,
    Content: {
      type: String,
      required: true
    },
    category: String,
    tags: [String],
    publishDate: { type: Date, default: Date.now },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    ratings: [Number],
    url: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id'
});

postSchema.pre('save', function(next) {
  this.url = this.Name.split(' ').join('_');
  next();
});
postSchema.pre('save', function(next) {
  if (!this.isModified('ratings')) return next();

  const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
  this.ratingsAverage = average(this.ratings);
  this.ratingsQuantity = this.ratings.length;
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
