
/*---------------------------------------------------------------------------------
   * @ file        : gulpfile.js
   * @ description : this file describes the gulp tasks.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
----------------------------------------------------------------------------------*/

// to run gulp tasks type command 'gulp' in terminal and press enter. -- it runs the default task.
// to run specific task type command 'gulp taskName' in terminal and press enter.
// Here i am writing some example task. Accourding to your requirement write the gulp task and enjoy it.

// grab our gulp packages.
const gulp       = require('gulp');
const gutil      = require('gulp-util');
const concat     = require('gulp-concat');
const uglify     = require('gulp-uglify');
const clean      = require('gulp-clean');
const rename     = require('gulp-rename');
const removeLogs = require('gulp-removelogs');
const filesize   = require('gulp-filesize');
const changed    = require('gulp-changed');
const watch      = require('gulp-watch');
const strip      = require('gulp-strip-comments');
const prettify   = require('gulp-jsbeautifier');
const trimlines  = require('gulp-trimlines');

// Create a default task.
gulp.task('default', ['Configs', 'Controllers', 'Models', 'plugIns', 'Routes', 'Services', 'Utils', 'git', 'env', 'package', 'server'], function() {
  return gutil.log('\x1b[42m%s\x1b[0m','--------  Gulp Task run successfully!.  ---------')
});

gulp.task('Configs', function () {
  return gulp.src('Configs/*.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle/Configs'));    // save in bundle folder.
});
// err
gulp.task('Controllers', function () {  
  return gulp.src('Controllers/*.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle/Controllers'));    // save in bundle folder.
});

gulp.task('Models', function () {
  return gulp.src('Models/*.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle/Models'));    // save in bundle folder.
});

// this task is for removing all logs from the files and and trim line and minify the source files.
gulp.task('plugIns', function () {
  return gulp.src('PlugIns/*.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle/plugIns'));    // save in bundle folder.
});
// err
gulp.task('Routes', function () {
  return gulp.src('Routes/*.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle/Routes'));    // save in bundle folder.
});
// err
gulp.task('Services', function () {
  return gulp.src('Services/*.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle/Services'));    // save in bundle folder.
});

gulp.task('Utils', function () {
  return gulp.src('Utils/*.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle/Utils'));    // save in bundle folder.
});

gulp.task('git', function () {
  return gulp.src('.gitignore').pipe(gulp.dest('bundle'));    // save in bundle folder.
});

gulp.task('env', function () {
  return gulp.src('env.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle'));    // save in bundle folder.
});

gulp.task('package', function () {
  return gulp.src('package.json').pipe(gulp.dest('bundle'));    // save in bundle folder.
});
// err
gulp.task('server', function () {
  return gulp.src('server.js')
    .pipe(removeLogs())            // remove comments.
    .pipe(strip())                 // remove multi line comments.
    .pipe(trimlines())             // trim line and white spaces.
    .pipe(prettify())              // make it beautiful (i.e alignment).
    .pipe(uglify())                // minify the file.
    .pipe(gulp.dest('bundle'));    // save in bundle folder.
});





/* To generate documentation for particular file use command docco gulpfile.js */

// Concat all the files from the utils folder and remove the logs from those files and minify and finally stored into the bundle folder as utils.min.js (renamed).
// gulp.task('Utils_bundle', function() {  
//   return gulp.src('Utils/*.js')     // source folder.
//   	.pipe(concat('utils.js'))	      // concat all files.
//   	.pipe(filesize()) 			        // show file size before minify.
//   	.pipe(removeLogs())			        // remove logs from the file.
//     .pipe(uglify())				          // minify the file.
//     .pipe(rename('utils.min.js'))   // rename the file.
//     .pipe(gulp.dest('bundle'))	    // destinatioon folder to store the minified file.
//     .pipe(filesize())				        // show file size after minify.
//     .on('error', gutil.log)			    // if any error occur.
// });

// // prototype regarding gulp task.
// gulp.task('task1', function() {
//   //do stuff
// });

// // prototype regarding dependent gulp task.    // we can add more dependent tasks in the optional array also.
// gulp.task('dependenttask', ['task1'], function() {
//   //do stuff after 'task1' is done.
// });

