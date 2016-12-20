// Saves options to chrome.storage
function save_options() {
  var colorD = document.getElementById('defC').value;
  var colorH = document.getElementById('hovC').value;
  var mHide = document.getElementById('hides').checked;
  var scroll = document.getElementById('scrolls').checked;
  chrome.storage.sync.set({
    defaultColor: colorD,
    hoverColor: colorH,
    mButton: mHide,
    scroll: scroll
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    defaultColor: "D1D1D1",
    hoverColor: "B1B1B1",
    mButton: true,
    scroll: true
  }, function(items) {
    document.getElementById('defC').style.backgroundColor = '#' + items.defaultColor;
    document.getElementById('hovC').style.backgroundColor = '#' + items.hoverColor;
    document.getElementById('hides').checked = items.mButton;
    document.getElementById('defC').value = "";
    document.getElementById('hovC').value = "";
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
