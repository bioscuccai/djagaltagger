axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

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

  $('#imagerange-form').on('submit', function(e) {
    e.preventDefault();
    axios.post('/api/image_ranges/', {
      name: $('#name').val(),
      start: $('#start').val(),
      end: $('#end').val()
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(console.error);
  });
});
