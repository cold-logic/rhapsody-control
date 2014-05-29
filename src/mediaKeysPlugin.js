mediaKeysPlugin = {};
(function() {
  if (window.fluid) {
    mediaKeysPlugin.forward = function() {
      $("#player-next").click();
    };
    mediaKeysPlugin.backward = function() {
      $("#player-previous").click();
    };
    mediaKeysPlugin.play = function() {
      if ("none" == $("#player-play").css("display")) {
        $("#player-pause").click();
      } else {
        $("#player-play").click();
      }
    };
  }
})();