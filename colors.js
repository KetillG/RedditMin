var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

chrome.storage.sync.get({
  defaultColor: "D1D1D1",
  hoverColor: "B1B1B1",
  mButton: true,
  scroll: true
}, function(items) {
  var bColor = '#' + items.defaultColor;
  var hColor = '#' + items.hoverColor;
  var cButton = "";
  if(items.mButton)
  {
    cButton = "color: transparent !important;"
  }
  var css = ".comment .expand { margin-right: 3px; padding: 1px; height: 100%; background-image: none !important; position: absolute; top: 0; left: 0; bottom: 0; width: 2em; text-align: center; background-color: " + bColor + ";" + cButton + " font-size: 10px; transition: color .15s,background-color .15s; } .child>.sitetable>.comment>.thing {padding-left: 2.5em !important;}  .commentarea>.sitetable>.comment {padding-left: 2.5em !important;} .commentarea>.sitetable>.comment .thing{padding-left: 2.5em !important; background: #fff; box-shadow: 0px 1px 5px rgba(0,0,0,.16); border: none!important; margin-bottom: 10px; margin-left: 0px !important;}.comment, body.res-commentBoxes .comment, html body.res .comment { position: relative; padding: 10px 10px 10px 2.5em !important; padding-left: 2.5em!important; border: 1px solid #EEE; }.comment .expand:hover { text-decoration: none; background-image: none !important; background-color: " + hColor +";" + cButton + " } .comment>.entry>.tagline>.expand {" + cButton + "} .sitetable>.comment>.child>.sitetable>.comment .thing{ padding-left: 2.5em !important; } .collapsed a.expand {background-color: " + bColor + ";}";
  style = document.createElement('style');
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
  if (items.scroll) {
    var queryExpand = document.querySelectorAll(".expand");
    for (var i = 0; i < queryExpand.length; i++) {
      queryExpand[i].addEventListener("click", function(event) {
        if (event.target.offsetParent.offsetTop < $(window).scrollTop()) {
          $('html, body').animate({ scrollTop: event.target.offsetParent.offsetTop }, 'fast');
        }
      });
    }
  }
});

//var el = document.querySelector(".sitetable");
