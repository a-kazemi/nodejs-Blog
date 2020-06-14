/*eslint-disable */
//import axios from 'axios';
const addComment = async (name, msg, postId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/comments',
      data: {
        name,
        content: msg,
        post: postId
      }
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    console.log(error);
  }
};
const CommentForm = $('#CommentForm');
if (CommentForm) {
  $('#CommentForm').on('submit', e => {
    e.preventDefault();
    const name = $('#name')[0].value;
    const msg = $('#message')[0].value;
    const postId = $('#CommentForm input.btn').attr('data');
    addComment(name, msg, postId);
  });
}
