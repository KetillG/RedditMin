/*chrome.storage.sync.get({
  defaultColor: "D1D1D1",
  hoverColor: "B1B1B1"
}, function(items) {
  console.log(items);
  var bColor = '#' + items.defaultColor;
  var myElements = document.querySelectorAll(".expand");
  for (var i = 0; i < myElements.length; i++) {
    myElements[i].setAttribute("style", "background-color:" + bColor +";");
  }
  document.getElementById('defC').style.backgroundColor = '#' + items.defaultColor;
  document.getElementById('hovC').style.backgroundColor = '#' + items.hoverColor;
  document.getElementById('defC').value = "";
  document.getElementById('hovC').value = "";
});*/

chrome.storage.sync.get({
  defaultColor: "D1D1D1",
  hoverColor: "B1B1B1",
  mButton: true
}, function(items) {
  var bColor = '#' + items.defaultColor;
  var hColor = '#' + items.hoverColor;
  var cButton = "";
  if(items.mButton === true)
  {
    cButton = "color: transparent;"
    console.log(cButton);
  }
  console.log(items);
  var css = ".comment .expand { position: absolute; top: 0; left: 0; bottom: 0; width: 2em; text-align: center; background-color: " + bColor + ";" + cButton + " font-size: 10px; transition: color .15s,background-color .15s; } .comment .expand { margin-right: 3px; padding: 1px; } .commentarea>.sitetable>.comment { background: #fff; box-shadow: 0px 1px 5px rgba(0,0,0,.16); border: none!important; margin-bottom: 10px; margin-left: 0; } .comment { overflow: none!important; } .comment, body.res-commentBoxes .comment, html body.res .comment { position: relative; padding: 10px 10px 10px 2.5em!important; padding-left: 2.5em!important; border: 1px solid #EEE; } .comment .expand:hover { text-decoration: none; color: inherit; background-color: " + hColor +";" + cButton + " }";
  style = document.createElement('style');
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
});
