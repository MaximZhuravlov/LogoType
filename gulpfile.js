let gulp = require("gulp");
let sass = require("gulp-sass");
let browserSync = require("browser-sync");
let uglify = require("gulp-uglify");
let concat = require("gulp-concat");
let cleanCSS = require("gulp-clean-css");
let rename = require("gulp-rename");
let del = require("del");
let autoprefixer = require("gulp-autoprefixer");

gulp.task("html", function () {
	return gulp.src("app/**/*.html") /* 'return' indicates that the task is asynchronous */
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("scss", function () {
	return gulp.src("app/scss/**/*.scss")
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 8 versions"]
		}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("css-libraries", function () {
	return gulp.src([
		"node_modules/reset-css/reset.css",
		"node_modules/magnific-popup/dist/magnific-popup.css",
		"node_modules/slick-carousel/slick/slick.css",
		"node_modules/jquery-form-styler/dist/jquery.formstyler.css"
	])
		.pipe(concat("libs.min.css"))
		.pipe(cleanCSS({
			 compatibility: 'ie8'
		}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("js", function () {
	return gulp.src("app/js/**/*.js")
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("js-libraries", function () {
	return gulp.src([
		"node_modules/jquery/dist/jquery.min.js",
		"node_modules/magnific-popup/dist/jquery.magnific-popup.min.js",
		"node_modules/slick-carousel/slick/slick.min.js",
		"node_modules/jquery-form-styler/dist/jquery.formstyler.min.js"
	])
		.pipe(concat("libs.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("app/js"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("browser-sync", function () {
	browserSync.init({
		server: {
			baseDir: "app/"
		},
		notify: false
	});
});

gulp.task("clean", async function () {
	del.sync("dist");
});

gulp.task("export", function () {
	let buildHTML = gulp.src("app/**/*.html")
		.pipe(gulp.dest("dist"));
	let buildCSS = gulp.src("app/css/**/*.css")
		.pipe(gulp.dest("dist/css"));
	let buildJS = gulp.src("app/js/**/*.js")
		.pipe(gulp.dest("dist/js"));
	let buildFonts = gulp.src("app/fonts/**/*.*") /* any format */
		.pipe(gulp.dest("dist/fonts"));
	let buildImages = gulp.src("app/images/**/*.*") /* any format */
		.pipe(gulp.dest("dist/images"));
});

gulp.task("watch", function () {
	gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
	gulp.watch("app/**/*.html", gulp.parallel("html"));
	gulp.watch("app/js/**/*.js", gulp.parallel("js"));
});

gulp.task("build", gulp.series("export", "clean"));

gulp.task("default", gulp.parallel("css-libraries", "js-libraries", "browser-sync", "watch"));