var gulp = require("gulp");
var browserSync = require("browser-sync");

var pug = require("gulp-pug");
var gulpSequence = require('gulp-sequence');
var posthtml = require("gulp-posthtml");
var posthtmlAttrsSorter = require('posthtml-attrs-sorter');
var prettify = require('gulp-prettify');


var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var autoprefixer = require("gulp-autoprefixer");
var spritesmith = require("gulp.spritesmith");
var iconfont = require("gulp-iconfont");
var iconfontCss = require("gulp-iconfont-css");

//babel
var babel = require("gulp-babel");
var rename = require("gulp-rename");

//yaml json
var yaml = require('gulp-yaml');
var mergeJson = require('gulp-merge-json');


//util
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var notifier = require('node-notifier');
var reload = browserSync.reload;
var onError = function (err) {
	notify.onError({
		title: "Gulp",
		subtitle: "Failure!",
		message: "Error: <%= error.message %>",
		sound: "Beep"
	})(err);

	this.emit("end");
};

var options = {
	posthtml: {
		plugins: [
			posthtmlAttrsSorter({
				order: [
					'class',
					'id',
					'name',
					'data',
					'ng',
					'src',
					'for',
					'type',
					'href',
					'values',
					'title',
					'alt',
					'role',
					"aria"
				]
			})
		],
		options: {}
	},

	htmlPrettify: {
		'unformatted': ['pre', 'code', 'textarea'],
		'indent_with_tabs': true,
		'preserve_newlines': true,
		'brace_style': 'expand',
		'end_with_newline': true
	},
};



//Minifiers + helpers
//var rename = require("gulp-rename");
//var concat = require("gulp-concat");
//var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");


// Build json from yaml
gulp.task('yaml2json', function () {
	return gulp.src("media/pug/data/*.yml")
		.pipe(plumber({errorHandler: onError}))
		.pipe(yaml({space: '\t'}))
		.pipe(mergeJson('data.json'))
		.pipe(gulp.dest('media/pug'));
});

//Pug(jade)
gulp.task("pug", function () {
	var jsonData = requireUncached('./media/pug/data.json');

	return gulp.src("media/pug/*.pug")
		.pipe(plumber({errorHandler: onError}))
		.pipe(pug({
			locals: jsonData
		}))
		.pipe(posthtml(options.posthtml.plugins, options.posthtml.options))
		.pipe(prettify(options.htmlPrettify))
		.pipe(gulp.dest("./"));
});
function requireUncached(module) {
	delete require.cache[require.resolve(module)]
	return require(module)
}

// SASS
gulp.task("sass", function () {
	return gulp.src("media/sass/screen.sass")
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			// includePaths: ["media/sass"],
			outputStyle: "nested"
			// outputStyle: "compressed"
		}))
		.pipe(autoprefixer({
			browsers: ['last 3 versions', '> 5%'],
			cascade: false
		}))
		// .pipe(minifyCss())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("media/css"))
		.pipe(notify({
			'title': 'Gulp-message',
			'message': 'SASS compiled!',
			onLast: true
		}))
		.pipe(browserSync.reload({
			stream: true,
			match: '**/*.css'
		}));

});

//Babel
gulp.task("es6", function () {
	return gulp.src("media/js/es6.js")
		.pipe(plumber({errorHandler: onError}))
		.pipe(babel())
		.pipe(rename("es5.js"))
		.pipe(gulp.dest("media/js/"))
		.pipe(notify({
			'title': 'Gulp-message',
			'message': 'ES6 compiled!',
			onLast: true
		}))
		.pipe(browserSync.stream());
});

// Img-min
gulp.task("min-img", function () {
	return gulp.src("media/img/*.{jpg, png}")
		.pipe(imagemin({
			progressive: true,
			svgPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			optimizationLevel: 7
		}))
		.pipe(gulp.dest("media/img"))
		.pipe(notify({
			'title': 'Gulp-message',
			'message': 'Images minified!',
			onLast: true
		}));
	//.pipe(browserSync.stream());
});

// Svg2Font
var fontName = "gulp-svg-font";
gulp.task("iconfont", function () {
	gulp.src(["media/svg/*.svg"])
		.pipe(iconfontCss({
			fontName: fontName,
			path: "media/sass/_lib/svgfont-layout.scss",
			targetPath: "../../sass/_lib/_svg-font.scss",
			fontPath: "../../media/fonts/svg-font/"
		}))
		.pipe(iconfont({
			fontName: fontName,
			normalize: true,
			fontHeight: 200
		}))
		.pipe(gulp.dest("media/fonts/svg-font"))
		.pipe(notify({
			'title': 'Gulp-message',
			'message': 'iconfonts created!',
			onLast: true
		}))
		.pipe(browserSync.stream());
});

//Sprite
gulp.task("sprite", function () {
	var spriteData = gulp.src("media/img/icons/*.png").pipe(spritesmith({
		imgName: "sprite.png",
		cssName: "sprite.sass",
		imgPath: "../img/sprite.png"
	}));
	spriteData.img.pipe(gulp.dest("media/img"));
	spriteData.css.pipe(gulp.dest("media/sass/_lib"))
		.pipe(notify({
			'title': 'Gulp-message',
			'message': 'Sprite created!',
			onLast: true
		}))
		.pipe(browserSync.stream());

});


// Gulp default run //
gulp.task("default", ["sass", "yaml2json", "pug", "es6", "sprite", "iconfont"], function () {
//Browser reload init
	browserSync.init({
		server: "./",
		index: "home.html"
	});

	/*watchers*/
	gulp.watch(['media/pug/**', '!media/pug/data.json'], function (event) {
		gulpSequence('yaml2json', 'pug')(function (err) {
			reload();
			notifier.notify({title: 'Gulp message', message: 'yaml+pug builded'});
		});
	});
	// gulp.watch("media/pug/data/!*.yml", ["yaml2json"]);

	gulp.watch("media/sass/**", ["sass"]);
	gulp.watch("media/js/es6.js", ["es6"]);
	//gulp.watch("media/img/*", ["min-img"]);
	gulp.watch("media/img/icons/*.png", ["sprite"]);
	gulp.watch("media/svg/**", ["iconfont"]);

	gulp.watch("media/js/*.js").on('change', browserSync.reload);

	//gulp.watch("media/js/**").on("change", browserSync.reload);
	//gulp.watch("*.html").on("change", browserSync.reload);
	notifier.notify({title: 'Gulp is started', message: 'Woohoo!'});
});
