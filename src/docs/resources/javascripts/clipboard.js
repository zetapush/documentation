$(function() {
  $('.listingblock > .content > pre').append('<button class="clipboard"></button>');
  new ClipboardJS('.clipboard', {
    target: function(b) {
      var p = b.parentNode;
      return $('> code > table .code pre', p)[0] || $('> code', p)[0];
    }
  }).on('success', function(e) {
    e.clearSelection();
    $(e.trigger).addClass('copied');
    e.trigger.alt = 'Copied';
    setTimeout(function() {
      $(e.trigger).removeClass('copied');
      e.trigger.alt = 'Copy';
    }, 2000);
  }).on('error', function(e) {
    e.clearSelection();
    $(e.trigger).addClass('error');
    e.trigger.alt = 'Error';
    setTimeout(function() {
      $(e.trigger).removeClass('error');
      e.trigger.alt = 'Copy';
    }, 2000);
  });
});