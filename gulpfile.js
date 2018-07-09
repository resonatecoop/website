var gulp         = require("gulp"),
    gutil = require('gulp-util'),
    sass         = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    hash         = require("gulp-hash"),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    del          = require("del");

// Compile SCSS files to CSS
gulp.task("scss", function () {
    del(["static/css/**/*"])
    gulp.src("src/scss/**/*.scss")
        .pipe(sass({outputStyle : "compressed"}))
        .pipe(autoprefixer({browsers : ["last 20 versions"]}))
        .pipe(hash())
        .pipe(gulp.dest("static/css"))
        //Create a hash map
        .pipe(hash.manifest("hash.json"))
        //Put the map in the data directory
        .pipe(gulp.dest("data/css"))
})

// Hash images
gulp.task("images", function () {
    del(["static/images/**/*"])
    gulp.src("src/images/**/*")
        .pipe(hash())
        .pipe(gulp.dest("static/images"))
        .pipe(hash.manifest("hash.json"))
        .pipe(gulp.dest("data/images"))
        .on('error', gutil.log);
})

// Hash javascript
// gulp.task("js", function () {
//     del(["static/js/**/*"])
//     gulp.src("src/js/**/*")
//         .pipe(hash())
//         .pipe(gulp.dest("static/js"))
//         .pipe(hash.manifest("hash.json"))
//         .pipe(gulp.dest("data/js"))
// })

gulp.task("js", function () {
  var bundleStream = browserify({entries: "src/js/main.js"});

  del(["static/js/**/*"]);
  return bundleStream.bundle()
    .pipe(source("main.js"))
    .pipe(hash())
    .pipe(gulp.dest("static/js"))
    .pipe(hash.manifest("hash.json"))
    .pipe(gulp.dest("data/js"));
})




// Hash fonts
gulp.task("fonts", function () {
    return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("static/fonts"))
});


// Set watch as default task
gulp.task("default", ["watch"])

// Watch asset folder for changes
gulp.task("watch", ["scss", "images", "js", "fonts"], function () {
    gulp.watch("src/scss/**/*", ["scss"])
    gulp.watch("src/images/**/*", ["images"])
    gulp.watch("src/js/**/*", ["js"])
    gulp.watch("src/fonts/**/*", ["fonts"])
})
