$(function () {
  $('.tag-button').on('click', function(e) {
    e.preventDefault();
    let imageId = $(this).data('image');
    let tagName = $('#tag-name').val();
    if (!tagName) {
      return;
    }
    axios.get(`/images/${imageId}/${tagName}`);
  });
});
