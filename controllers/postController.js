const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const Post = require('./../models/postModel');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().populate('comments');
  res.status(200).json({
    status: 'success',
    length: posts.length,
    posts
  });
});

exports.newPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    post: newPost
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('comments');
  if (!post) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: post
  });
});
exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });
  if (!post) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: post
  });
});
exports.addRating = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!req.body.rate) {
    return next(new AppError('No document found with that ID', 404));
  }

  post.ratings.push(req.body.rate);
  await post.save();
  res.status(200).json({
    status: 'Success',
    data: post
  });
});
