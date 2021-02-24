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
  
  $('.toggle-btn').on('click', function () {
    $(this).toggleClass('active');
  });

var customSelectWrap       = '.custom-select__wrap',
    customSelectCurrent    = '.custom-select__current',
    customSelectDrop       = '.custom-select__drop',
    customSelectOption     = '.option';
$(customSelectCurrent).each(function() {
  var value = $(this).next(customSelectDrop).find(customSelectOption + ':nth-child(2)').html();
  $(this).html(value);
});
$(customSelectCurrent).on('click', function() {
  $(customSelectDrop).slideUp();
  $(customSelectCurrent).not(this).removeClass('open');
  $(this).toggleClass('open').next(customSelectDrop).stop().slideToggle();
});
$(customSelectOption).on('click', function() {
  var value = $(this).html();
  $(this).closest(customSelectWrap).find(customSelectCurrent).removeClass('open').html(value)
    .next(customSelectDrop).slideUp();
});
$(document).mouseup(function (e) {
    var container = $(customSelectWrap);
    if (e.target!=container[0] && !container.has(e.target).length){
        container.find(customSelectCurrent).removeClass('open');
        container.find(customSelectDrop).slideUp();
    }
});

})