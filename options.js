var storage_name = "hide_text_selectors";
var selector_name = "hide_selectors";

function save_options() {
  var input_box = document.getElementById(selector_name);
  localStorage[storage_name] = input_box.value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = '<div class="alert alert-success">Options Saved.</div>';
  setTimeout(function() {
    status.innerHTML = "";
  }, 1000);
}

function restore_options() {
  var saved_selector = localStorage[storage_name];
  if (saved_selector) {
    var input_box = document.getElementById(selector_name);
    input_box.value = saved_selector;
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#save').addEventListener('click', save_options);
})