var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var babili = require('gulp-babili');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var deploy = require('gulp-gh-pages');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require("run-sequence");

var 	files = "./src/js/*.js";

gulp.task("default", ["build"], function() {		
	gulp.watch(files, ["build"]);
});

gulp.task("build", function() {	
	gutil.log("###Hello gulp!###");
	runSequence('copySrc', 'minify', 'deploy');
	//gulp.run('lint', 'minify');
});

gulp.task("deploy", function() {
	gulp.src("./dist/**/*")
		.pipe(deploy());
});

gulp.task("clean", function() {
	gulp.src("dist")
		.pipe(clean());
});

gulp.task("copySrc", ["clean"], function() {	
	gulp.src("./src/*.html")
		.pipe(gulp.dest("./dist"));
	gulp.src("./src/css/*.css")
		.pipe(gulp.dest("./dist/css"));	
});

gulp.task("concat", function() {
	gulp.src(files)
		.pipe(concat("./dist/js/"))
		.pipe(rename("main.js"))
		.pipe(gulp.dest("./dist/js"));
});

gulp.task("minify", ["concat"], function() {
	gulp.src(files)
		.pipe(concat("./dist/js/"))
		.pipe(rename("main.min.js"))
		.pipe(babili({
		 	mangle: {
		 		keepClassName: true
		 	}
		 }))		
		.pipe(gulp.dest("./dist/js"));
});

gulp.task("uglify", function() {
	gulp.src(files)
		.pipe(concat("./dist/js/"))
		.pipe(rename("main.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./dist"));
});

gulp.task("lint", function() {
	gulp.src(files)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));	
});