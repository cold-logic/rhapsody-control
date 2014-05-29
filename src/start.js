/*
 * Rhapsody Control
 * Version 1.0
 * Chris Davison
 */

// Create forever instance
var forever = require('forever'),
  options = {
    'uid': 'rhapsody-control',
    'logFile': 'rhapsody-control.log',
    'outFile': 'rhapsody-control_out.log',
    'errFile': 'rhapsody-control_err.log'
  },
  monitor = forever.startDaemon('js/server.min.js', options);