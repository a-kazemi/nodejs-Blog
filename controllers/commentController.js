const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const Comment = require('../models/commentModel');

exports.newComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.create(req.body);
  res.status(201).json({
    status: 'success',
    post: comment
  });
});
