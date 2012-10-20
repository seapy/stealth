var Hide = {
  init: function() {
    this.status = false;
  },
  toggle: function() {
    this.status = !this.status;
  },
  show_str: function() {
    return this.status ? "O" : "X";
  },
  param_str: function(selector) {
    return "var hide_status = " + this.status + "; var hide_class_selectors = \"" + selector + "\";";
  }
};

Hide.init();

function onRequest(request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse({});
};

chrome.extension.onRequest.addListener(onRequest);

function hide() {
  var selectors = localStorage["hide_text_selectors"];
  var visibility = "visible";
  if (Hide.status) {
     visibility = "hidden"
  }
  var code = selectors + " {visibility: " + visibility + ";}";
  chrome.tabs.insertCSS(null, {code: code});
}

// Add page action icon click Listener
chrome.pageAction.onClicked.addListener(function(tab) {
  Hide.toggle();
  hide();
  var icon = "images/show.png";
  if (Hide.status) {
    icon  = "images/hide.png";
  }
  chrome.pageAction.setIcon({path: icon, tabId: tab.id});
});

// Add When page on update listener
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status === "complete") {
    hide();
  }
});