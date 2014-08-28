mediaKeysPlugin = {};
(function() {
  var play, next, previous;
  if (Rhapsody) {
    play = function () {
      if (Rhapsody.queueController.isPlaying) {
        Rhapsody.queueController.pause();
      } else {
        Rhapsody.queueController.resume();
      }
    };
    next = function () {
      if (Rhapsody.queueController.isPlaying) {
        Rhapsody.queueController.playNext();
      }
    };
    previous = function () {
      if (Rhapsody.queueController.isPlaying) {
        Rhapsody.queueController.playPrevious();
      }
    };
  } else {
    play = function () {
      if ("none" == $("#player-play").css("display")) {
        $("#player-pause").click();
      } else {
        $("#player-play").click();
      }
    };
    next = function () {
      $("#player-next").click();
    };
    previous = function () {
      $("#player-previous").click();
    };
  }
  if (window.fluid) {
    mediaKeysPlugin.forward = function() {
      next();
    };
    mediaKeysPlugin.backward = function() {
      previous();
    };
    mediaKeysPlugin.play = function() {
      play();
    };
  }
})();