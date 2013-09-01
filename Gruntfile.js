module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      files: ["Gruntfile.js","lib/**/*.js","test/**/*.js"]
    }
  });

  //load jshint plugin
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');

  //default tasks
  grunt.registerTask("default",["jshint"]);
}