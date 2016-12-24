// Saves options to chrome.storage
function save_options() {
  console.log(j);
  var colorD = document.getElementById('defC').value;
  if(colorD === "") {
    colorD = "D1D1D1";
  }
  var colorH = document.getElementById('hovC').value;
  if(colorH === "") {
    colorH = "B1B1B1";
  }
  var colorC = document.getElementById('colC').value;
  if(colorC === "") {
    colorC = "A1A1A1";
  }
  var mHide = document.getElementById('hides').checked;
  var scroll = document.getElementById('scrolls').checked;
  var widthB = document.getElementById("myRange").value;
  console.log(widthB);
  chrome.storage.sync.set({
    defaultColor: colorD,
    hoverColor: colorH,
    collapsedColor: colorC,
    mButton: mHide,
    scroll: scroll,
    widthS: widthB
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    changePreview();
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
var j;
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    defaultColor: "D1D1D1",
    hoverColor: "B1B1B1",
    collapsedColor: "A1A1A1",
    mButton: true,
    scroll: true,
    widthS: 100
  }, function(items) {
    j = items;
    document.getElementById('defC').style.backgroundColor = '#' + items.defaultColor;
    document.getElementById('hovC').style.backgroundColor = '#' + items.hoverColor;
    document.getElementById('colC').style.backgroundColor = '#' + items.collapsedColor;
    document.getElementById('hides').checked = items.mButton;
    document.getElementById('scrolls').checked = items.scroll;
    document.getElementById("myRange").value = items.widthS;
    document.getElementById('defC').value = "";
    document.getElementById('hovC').value = "";
    document.getElementById('colC').value = "";
    changePreview();
  });
}
function changePreview() {
  chrome.storage.sync.get({
    defaultColor: "D1D1D1",
    hoverColor: "B1B1B1",
    collapsedColor: "A1A1A1",
    mButton: true,
    scroll: true,
    widthS: 100
  }, function(items) {
    console.log(items);
    j = items;
    if(items.mButton) {
      document.querySelector('.min').style.color = 'transparent';
    } else {
      document.querySelector('.min').style.color = 'black';
    }
    var wid = (items.widthS / 100) * 20 + "px"
    document.querySelector(".bar").style.width = wid;
    document.querySelector(".bar").style.backgroundColor = '#' + items.defaultColor;
  });
}
document.querySelector(".bar").addEventListener("mouseover", function(){if(j){changeC();}});
function changeC() {
  var a = '#' + j.hoverColor;
  document.querySelector(".bar").style.backgroundColor = a;
}
document.querySelector(".bar").addEventListener("mouseleave", function(){if(j){revC();}});
function revC() {
  var a = '#' + j.defaultColor;
  document.querySelector(".bar").style.backgroundColor = a;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
