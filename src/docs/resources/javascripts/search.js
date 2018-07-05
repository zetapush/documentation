(function() {
  
  var search = instantsearch({
    appId: 'OUL28USF6Z',
    apiKey: 'eff5222daa0dd668572cd04a9a5b957c',
    indexName: 'dev_documentation',
    //urlSync: true,
    searchParameters: {
      hitsPerPage: 10
    },
    searchFunction: function(helper) {
      if(helper.state.query) {
        $('.search-results').addClass('show');
        helper.search();
      } else {
        $('.search-results').removeClass('show');
      }
    }
  });
  
  var init = function() {
    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-input',
        placeholder: 'Search',
        autofocus: false
      })
    );
    search.addWidget(
      instantsearch.widgets.infiniteHits({
        container: '#search-hits',
        templates: {
          item: document.getElementById('hit-template').innerHTML,
          empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
        }
      })
    );
    search.start();
    $('#search-input').click(function(e) {
      e.stopPropagation();
    });
    $('#search-hits').click(function(e) {
      e.stopPropagation();
    });
    $(document.body).click(function(e) {
      $('.search-results').removeClass('show');
    });
    $('#search-input').on('focus', function(e) {
      if(search.helper.state.query || document.getElementById('search-input').value) {
        $('.search-results').addClass('show');
      }
    });
  }

  $(document).ready(init);
})();