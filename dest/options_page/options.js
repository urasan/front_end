$(function() {
  chrome.storage.sync.get(
    'apiUrl',
    function(item) {
      console.log(item.apiUrl);
      $('#api-url').val(item.apiUrl);
    }
  );
});

$('#button-set').on('click', function() {
  chrome.storage.sync.set({'apiUrl': $('#api-url').val()}, function() {
    console.log('Setting saved');
  });
});
