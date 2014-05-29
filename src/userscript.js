/*jshint undef:true */
/*global $, jQuery, console, io */
rcontrol = {
  connect: function() { "use strict";
    
    // Web socket URL
    rcontrol.session = io("http://127.0.0.1:8001/rhapsody");

    // Connection failed set timer
    rcontrol.session.on("connect_failed", function() {
      console.log("rhapsody-control connect failed");
      rcontrol.timer = setTimeout(rcontrol.connect, 30000);
    });

    // When connected, remove attempt timer
    rcontrol.session.on("connect", function() {
      console.log("rhapsody-control connected");
      if (rcontrol.timer) clearTimeout(rcontrol.timer);
    });

    // On control event, fire jQuery handlers
    rcontrol.session.on("control", function(data) {
      switch(data) {
        case "pause":
          if ("none" == $("#player-play").css("display")) {
            $("#player-pause").click();
            rcontrol.notify("Pause");
          } else {
            $("#player-play").click();
            rcontrol.notify("Play");
          }
          break;
        case "next":
          $("#player-next").click();
          break;
        case "prev":
          $("#player-previous").click();
          break;
        case "shuffle":
          $("#player-shuffle").click();
          rcontrol.notify("Shuffle");
          break;
        default:
          console.log(data);
          break;
      }
    });
  },
  getArtist: function() { "use strict";
    return $("#player-artist-link").text();
  },
  getTrack: function() { "use strict";
    return $("#player-track-link").text();
  },
  getArtistAndTrack: function() { "use strict";
    var artist = rcontrol.getArtist(), track = rcontrol.getTrack(), glue = " - ";
    return (track ? [artist, track].join(glue) : "Nothing is playing");
  },
  notify: function(msg, title) { "use strict";
    var growl = {}, $cover = $(".player-album-thumbnail:nth-child(3)").find("img");
    growl.title = title || "Rhapsody";
    growl.description = msg || rcontrol.getArtistAndTrack();
    growl.sticky = false;
    if ($cover.attr("title")) {
      growl.icon = $cover.attr("src");
    }
    window.fluid.showGrowlNotification(growl);
  },
  observeTrackChange: function() { "use strict";
    console.log("rhapsody-control observeTrackChange");
    // disconnect any existing observer
    if (rcontrol.trackChangeObserver) rcontrol.trackChangeObserver.disconnect();

    // create an observer instance
    rcontrol.trackChangeObserver = new MutationObserver(function(mutations) {
      if (mutations[0].oldValue != rcontrol.currentTrack) {
        rcontrol.currentTrack = mutations[0].oldValue;
        rcontrol.notify(rcontrol.getArtist(), rcontrol.getTrack());
      }
    });

    // pass in the target node, as well as the observer options
    var target = $('#player-track-link').get(0);
    rcontrol.trackChangeObserver.observe(target, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["title"]
    });
  },
  observe: function() { "use strict";
    console.log("rhapsody-control observe");
    if ($('#player-track-link').length > 0) {
      rcontrol.observeTrackChange();
    } else {
      setTimeout(function(){
        rcontrol.observe();
      },1000);
    }
  },
  init: function() { "use strict";
    console.log("rhapsody-control init");
    jQuery.getScript("http://127.0.0.1:8002/js/socket.io.min.js", rcontrol.connect);
    rcontrol.observe();
  }
};
// Engage.
rcontrol.init();