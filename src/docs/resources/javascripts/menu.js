(function() {
  var displayMainTitle = function() {
    $('nav .main-title span').text($('#header > h1').text());
    $('nav .main-title').click(function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  var selectCurrentPage = function() {
    var currentUrl = window.location.pathname;
    $('nav ul li').each(function(i, el) {
      if($('a', el).attr('href').replace(/\/$/, '')==currentUrl.replace(/\/$/, '')) {
        $(el).addClass('selected');
      }
    });
  }

  var toggleMenu = function() {
    if($('nav').hasClass('opened')) {
      closeMenu();
    } else {
      $('nav').addClass('opened');      
    }
  }
  
  var closeMenu = function() {
    $('nav').removeClass('opened');
  }

  var init = function() {
    displayMainTitle();
    selectCurrentPage();
    $('body').click(closeMenu);
  }

  $(document).ready(init);
})();