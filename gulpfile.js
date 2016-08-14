var	gulp 			= require('gulp'),
	concat 			= require('gulp-concat'),
	clean 			= require('gulp-rimraf'),
	less 			= require('gulp-less'),
	cssnano			= require('gulp-cssnano'),
	csscomb 		= require('gulp-csscomb'),
	autoprefixer	= require('gulp-autoprefixer'),
	uglify			= require('gulp-uglify'),
	notify			= require('gulp-notify'),
	SourceMap		= require('gulp-sourcemaps'),
	rename  		= require('gulp-rename'),
	browserSync		= require('browser-sync'),
	reload 			= browserSync.reload;

/* dirs */
var	assetsDir			= 'assets',
	lessDir				= assetsDir + '/less';
	jsDir				= assetsDir + '/js';
	targetCssFilename  	= 'netzorama.css',
	targetJsFilename	= 'netzorama.js',
	targetCss			= 'css',
	targetJs			= 'js',
	targetFont			= 'fonts',
	proxyname			= 'netzorama.dev'; // MAMP Hosts Server-Name

var scripts = [
	assetsDir	+ '/bower/jquery/dist/jquery.js',
	assetsDir	+ '/bower/modernizr/modernizr.js',
	jsDir 		+ '/owl.carousel2.min.js',
	jsDir 		+ '/custom.js'
];

// Delete all Files in the Folder targetCss, targetJS, targetFont
gulp.task('clean', function() {
	gulp.src([targetCss + '/*', targetJs + '/*.js', targetFont + '/*'], {read:false})
		.pipe(clean());
});

// Concat Javascript Files from the variable scripts and saves it to the targetJsFilename
gulp.task('mergeScriptsdev', function() {
	gulp.src(scripts)
		.pipe(concat(targetJsFilename))
		.pipe(gulp.dest(targetJs))
		.pipe(reload({stream:true}));
});

// Concat Javascript Files from the variable scripts, minified and store it to the targetJsFilename
gulp.task('mergeScripts', function() {
	gulp.src(scripts)
		.pipe(concat(targetJsFilename))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(targetJs));
});

//
gulp.task('cssdev', function(){
	return gulp.src(lessDir + '/import.less')
		.pipe(SourceMap.init())
		.pipe(less())
		.on('error',function (err) {
			console.log(err.toString());
		})
		.pipe(autoprefixer('last 20 version'))
		.pipe(csscomb())
		.pipe(concat(targetCssFilename))
		.pipe(SourceMap.write('.'))
		.pipe(notify('cssdev done'))
		.pipe(gulp.dest(targetCss))
		.pipe(reload({stream:true}));
});

gulp.task('css', function(){
	return gulp.src(lessDir + '/import.less')
		.pipe(less())
		.pipe(autoprefixer('last 20 version'))
		.pipe(csscomb())
		.pipe(concat(targetCssFilename))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(targetCss))
});

gulp.task('html', function(){
	return gulp.src('index.php')
		.pipe(gulp.dest(''))
		.pipe(reload({stream:true}));
});


gulp.task('watch', ['connect'], function() {
	gulp.watch(lessDir + '/**/*.less', ['cssdev']);
	gulp.watch(jsDir + '/**/*.js', ['mergeScriptsdev']);
	gulp.watch('index.php', ['html']);
});

gulp.task('connect', function() {
	browserSync({
		proxy: proxyname,
		port: 3000,
		open: false
	});
});

gulp.task('default', function(){
	gulp.start(['css', 'mergeScripts']);
});