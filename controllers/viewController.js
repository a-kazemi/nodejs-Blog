const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Post = require('./../models/postModel');

exports.getHome = catchAsync(async (req, res, next) => {
  const posts = await Post.find().populate('comments');
  res.status(200).render('main', { posts });
});

exports.getSinglePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ url: req.params.url }).populate('comments');
  res.status(200).render('single', { post });
});
