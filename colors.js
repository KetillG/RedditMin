// imports jquery
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// gets settings from storage
chrome.storage.sync.get({
  defaultColor: "D1D1D1",
  hoverColor: "B1B1B1",
  collapsedColor: "A1A1A1",
  mButton: true,
  scroll: true,
  widthS: 100
}, function(items) {
  // css variables
  console.log(items);
  var bColor = 'background-color: #' + items.defaultColor + '!important;';
  var hColor = 'background-color: #' + items.hoverColor + '!important;';
  var cColor = "background-color: #" + items.collapsedColor + "!important;"
  var cButton = "";
  if(items.mButton) {
    cButton = "color: transparent !important;"
  }
  // css inserted

  var widthI = 2 * (items.widthS / 100);
  var widthO = 2.5 * (items.widthS / 100);
  var css = ".comment .expand { margin-right: 3px; padding: 1px; height: 100%; background-image: none !important; position: absolute; top: 0; left: 0; bottom: 0; width: "+ widthI +"em; text-align: center; " + bColor + cButton + " font-size: 10px; transition: color .15s,background-color .15s; } .child>.sitetable>.comment>.thing {padding-left: "+ widthO +"em !important;}  .commentarea>.sitetable>.comment {padding-left: "+ widthO +"em !important;} .commentarea>.sitetable>.comment .thing{padding-left: "+ widthO +"em !important; background: #fff; box-shadow: 0px 1px 5px rgba(0,0,0,.16); border: none!important; margin-bottom: 10px; margin-left: 0px !important;}.comment, body.res-commentBoxes .comment, html body.res .comment { position: relative; padding: 10px 10px 10px "+ widthO +"em !important; padding-left: "+ widthO +"em!important; border: 1px solid #EEE; }.comment .expand:hover { text-decoration: none; background-image: none !important; " + hColor + cButton + " } .comment>.entry>.tagline>.expand {" + cButton + "} .sitetable>.comment>.child>.sitetable>.comment .thing{ padding-left: "+ widthO +"em !important; } .collapsed a.expand {" + bColor + "} .collapsed>.entry>.tagline>.expand {" + cColor + "}";
  style = document.createElement('style');
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  // adds eventlistener to scroll on click
  document.getElementsByTagName('head')[0].appendChild(style);
  if (items.scroll) {
    var queryExpand = document.querySelectorAll(".expand");
    for (var i = 0; i < queryExpand.length; i++) {
      queryExpand[i].addEventListener("click", function(event) {
        if ($(event.target).offset().top < $(window).scrollTop()) {
          $('html, body').animate({ scrollTop: $(event.target).offset().top - 100 }, 'fast');
        }
      });
    }
  }
});

//var el = document.querySelector(".sitetable");
