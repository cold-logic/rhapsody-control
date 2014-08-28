module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      scripts: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          mangle: {
            except: ['jQuery']
          },
          compress:true
        },
        files: {
          'js/start.min.js': ['src/start.js'],
          'js/socket.io.min.js': ['src/socket.io.js'],
          'js/userscript.min.js': ['src/userscript.js'],
          'js/control.min.js': ['src/control.js'],
          'js/server.min.js': ['src/server.js'],
          'js/mediaKeysPlugin.min.js': ['src/mediaKeysPlugin.js']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};