/*
MutationObserver test
https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
*/

currentTrack = $('#player-track-link').text();

if (observer) {
  observer.disconnect(); // stop observing
}

// select the target node
var target = $('#player-track-link').get(0);

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  if (mutations[0].oldValue != currentTrack) {
    currentTrack = mutations[0].oldValue;
    // console.log("Track changed");
  }
});

// configuration of the observer:
var config = {
  attributes: true,
  attributeOldValue: true,
  attributeFilter: ["title"]
};

// pass in the target node, as well as the observer options
observer.observe(target, config);