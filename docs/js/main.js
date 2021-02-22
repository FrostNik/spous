$(function () {
  $('.dropdown-wrap').on('click', function (e) {
    $(this).find('.dropdown-content').slideToggle(200);
    $(this).find('.dropdown-btn').toggleClass('active');
    e.preventDefault();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.dropdown-wrap').length) {
      $('.dropdown-btn').removeClass('active');
      $('.dropdown-content').slideUp(200);
    }
  });
})