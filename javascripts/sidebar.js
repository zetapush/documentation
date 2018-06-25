(function() {
  var open = function(el) {
    $(el).addClass('opened');
    $('.sectlevel3', el).css('max-height', $('.sectlevel3', el).attr('data-height'));
  }

  var closeAll = function() {
    $('.sectlevel2 li').removeClass('opened');
    $('.sectlevel3').css('max-height', 0);
  }

  var init = function() {
    $('.sectlevel3').each(function(i, el) {
      $(el).addClass('computing-size');
      $(el).attr('data-height', $(el).outerHeight()+'px');
      $(el).removeClass('computing-size');
    });
    $('.sectlevel2 li').each(function(i, el) {
      if($('.sectlevel3', el).length) {
        $(el).addClass('has-subsection');
        $('> a', el).append('<i class="fa fa-caret-right"></i>');
      }
    });
    $('.sectlevel2 li').click(function(e) {
      closeAll();
      open($(e.currentTarget));
    });
    closeAll();
  }

  $(document).ready(init);  
})();