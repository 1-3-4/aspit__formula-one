var gulp = require('gulp');
var sass = require('gulp-sass');
var uglycss = require('gulp-uglifycss');
var rename = require('gulp-rename');

var localhost = 'C:/apps/xampp/htdocs/';
var paths = {
	src: 'src/**/*',
	srcPHP: 'src/**/*.php',
	srcSCSS: 'src/resources/scss/*',
	scrIMG: 'src/resources/images/*',
	
	tmp: localhost + 'tmp',
	tmpPHP: localhost + 'tmp/*.php',
	tmpCSS: localhost + 'tmp/resources/css/',
	tmpIMG: localhost + 'tmp/resources/images/'
};

gulp.task('default', ['watch']);

gulp.task('php', function () {
	return gulp.src(paths.srcPHP)
		.pipe(gulp.dest(paths.tmp));
});

gulp.task('img', function () {
	return gulp.src(paths.scrIMG)
		.pipe(gulp.dest(paths.tmpIMG));
});

gulp.task('sass-and-rename', function () {
	return gulp.src(paths.srcSCSS)
		.pipe(sass())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest(paths.tmpCSS));
});

gulp.task('uglifycss', function () {
	return gulp.src(paths.srcSCSS)
		.pipe(sass().on('error', sass.logError))
		.pipe(uglycss())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(paths.tmpCSS));
});

gulp.task('copy', ['php', 'img', 'sass-and-rename']);

gulp.task('watch', function () {
	gulp.watch(paths.src, ['copy']);
});