//when popup opened, options set according to chrome.storage
document.addEventListener('DOMContentLoaded', restore_options);

//adds event listeners to all options on popup that saves options 
unclickable.addEventListener('change', function(){
  //console.log(unclickable.checked);
  save_options();
});

strikethrough.addEventListener('change', function(){
  //console.log(strikethrough.checked);
  save_options();
});

greenBox.addEventListener('change', function(){
  //console.log(greenBox.checked);
  save_options();
});

greenBoxTime.addEventListener('change', function(){
  //console.log(greenBoxTime.value);
  save_options();
});

// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set({ //saves variables on left equal to those on right to chrome.storage
    unclickable: unclickable.checked,
    strikethrough: strikethrough.checked,
    greenBox: greenBox.checked,
    greenBoxTime: greenBoxTime.value,
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    unclickable: false,  //default values 
    strikethrough: false,
    greenBox: false,
    greenBoxTime: '2',
    
  }, function(items) { 
    unclickable.checked = items.unclickable; //sets form according to chrome.storage 
    strikethrough.checked = items.strikethrough;
    greenBox.checked = items.greenBox;
    greenBoxTime.value = items.greenBoxTime;
    //console.log("restored options!"); console.log(items);
  });
}
