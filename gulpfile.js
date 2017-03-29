
/*---------------------------------------------------------------------------------
   * @ file        : gulpfile.js
   * @ description : this file describes the gulp tasks.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
----------------------------------------------------------------------------------*/

// to run gulp tasks type command 'gulp' in terminal and press enter. -- it runs the default task.
// to run specific task type command 'gulp taskName' in terminal and press enter.

// grab our gulp packages.
const   gulp       = require('gulp'),
        gutil      = require('gulp-util'),
        concat     = require('gulp-concat'),
        uglify     = require('gulp-uglify'),
        clean      = require('gulp-clean'),
        rename     = require('gulp-rename'),
        removeLogs = require('gulp-removelogs'),
        filesize   = require('gulp-filesize');

// Create a default task.
gulp.task('default', ['Utils_bundle'], function() {
  return gutil.log('\x1b[42m%s\x1b[0m','--------  Gulp Task run successfully!.  ---------')
});

// Concat all the files from the utils folder and remove the logs from those files and minify and finally stored into the bundle folder as utils.min.js (renamed).
gulp.task('Utils_bundle', function() {  
  return gulp.src('Utils/*.js')     // source folder.
  	.pipe(concat('utils.js'))	    // concat all files.
  	.pipe(filesize()) 			    // show file size before minify.
  	.pipe(removeLogs())			    // remove logs from the file.
    .pipe(uglify())				    // minify the file.
    .pipe(rename('utils.min.js'))   // rename the file.
    .pipe(gulp.dest('bundle'))	    // destinatioon folder to store the minified file.
    .pipe(filesize())				// show file size after minify.
    .on('error', gutil.log)			// if any error occur.
});



// prototype regarding gulp task.
gulp.task('task1', function() {
  //do stuff
});

// prototype regarding dependent gulp task.    // we can add more dependent tasks in the optional array also.
gulp.task('dependenttask', ['task1'], function() {
  //do stuff after 'task1' is done.
});




