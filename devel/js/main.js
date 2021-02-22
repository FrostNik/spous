$(function () {
  $('.left-box__video-box').on('click', function (e) {
    $(this).find('.video-item__dropdown-menu').slideToggle(200);
    $(this).find('.test').toggleClass('active');
    e.preventDefault();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.left-box__video-box').length) {
      $('.test').removeClass('active');
      $('.video-item__dropdown-menu').slideUp(200);
    }
  });

})