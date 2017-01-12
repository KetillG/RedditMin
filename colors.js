// imports jquery
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// gets settings from storage
var savedSettings;
chrome.storage.sync.get({
  defaultColor: "D1D1D1",
  hoverColor: "B1B1B1",
  collapsedColor: "A1A1A1",
  mButton: true,
  scroll: true,
  widthS: 60
}, function(items) {
  savedSettings = items;
  addClickBar(savedSettings);
});
// makes the bar it self
function addClickBar(items) {
  console.log(items);
  var css = "";
  // css variables
  var bColor = 'background-color: #' + items.defaultColor + ';';
  var hColor = 'background-color: #' + items.hoverColor + ';';
  var cColor = "background-color: #" + items.collapsedColor + "!important;"
  var cButton = "";
  // if transparent is enabled then...
  if(items.mButton) {
    cButton = "color: transparent !important;"
  }
  //selects comment body
  var widthI = 2 * (items.widthS / 100);
  var widthO = 2.5 * (items.widthS / 100);

  // fetches the ids of each comment
  var comments = document.querySelectorAll(".comment");
  var commentRefrencer = "";
  // makes css for each id to have higher specificity than the subreddit custom css
  for (var i = 0; i < comments.length; i++) {
    if(comments[i].classList.contains('deleted')){
      comments[i].id = "del" + i;
    }
    css += '#' + comments[i].id + " {padding-left: "+ widthO +"em !important; box-shadow: 0px 1px 5px rgba(0,0,0,.16) !important; border: none !important; margin-bottom: 10px !important; margin-left: 0px !important;  position: relative; padding: 10px 10px 10px "+ widthO +"em !important; padding-left: "+ widthO +"em!important; border: 1px solid #EEE;}";
    css += '#' + comments[i].id + ".collapsed>.entry>.tagline>.expand{" + cColor + cButton + "}";
    css += '#' + comments[i].id + ">.entry>.tagline>.expand:hover { text-decoration: none; background-image: none !important; " + hColor + cButton + " }";
    css += '#' + comments[i].id + ">.entry>.tagline>.expand { margin-right: 3px !important; padding: 1px !important; height: 100% !important; background-image: none !important; position: absolute !important; top: 0 !important; left: 0 !important; bottom: 0 !important; width: "+ widthI +"em !important; text-align: center !important; " + bColor + cButton + " font-size: 10px !important; transition: color .15s,background-color .15s; }";
    css += '#' + comments[i].id + ".comment.gilded p.tagline {position: static;}";
    css += '#' + comments[i].id + ".thing .RES-keyNav-activeElement {position: static !important;}";
    css += '#' + comments[i].id + ".entry {position: static;}";
  }
  // injects the css made into the reddit
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
}
// when the load more comments button is clicked it reruns the code
var getMoreComments = document.querySelectorAll(".morechildren");
getMoreComments = getMoreComments[a.length - 1];
getMoreComments.addEventListener('click', function(event) {
  setTimeout(() => {
    addClickBar(savedSettings)
  }, 5000);
  });
