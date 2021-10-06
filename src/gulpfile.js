const gulp = require('gulp')
const hash = require('gulp-hash')
const del = require('del')
const postcss = require('gulp-postcss')
const critical = require('critical').stream
const logger = require('gulplog')
const htmlmin = require('gulp-htmlmin')

function images () {
  return gulp.src('images/**/*')
    .pipe(hash())
    .pipe(gulp.dest('static/images'))
    .pipe(hash.manifest('hash.json'))
    .pipe(gulp.dest('data/images'))
}

function css () {
  del(['static/dist/css/**/*'])

  return gulp.src('./css/main.css')
    .pipe(postcss([
      require('postcss-import')(),
      require('postcss-preset-env')({
        stage: 1,
        features: {
          browsers: ['last 1 version'],
          'nesting-rules': true
        }
      }),
      require('cssnano')({
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }]
      })
    ]))
    .pipe(hash())
    .pipe(gulp.dest('static/dist/css'))
    .pipe(hash.manifest('hash.json'))
    .pipe(gulp.dest('data/css'))
}

function minifyHtml () {
  return gulp.src('./public/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./public'))
}

function inlineCritical () {
  const hash = require('./data/css/hash.json')
  return gulp
    .src(['./public/index.html', './public/articles/**/*.html', './public/about/**/*.html'])
    .pipe(critical({
      base: './public',
      inline: true,
      minify: true,
      dimensions: [
        {
          height: 200,
          width: 500
        },
        {
          height: 700,
          width: 960
        }
      ],
      css: [`./public/dist/css/${hash['main.css']}`]
    }))
    .on('error', (err) => logger.error(err.message))
    .pipe(gulp.dest('./public'))
}

gulp.task('images', images)
gulp.task('css', css)
gulp.task('critical', inlineCritical)
gulp.task('minify-html', minifyHtml)

gulp.task('watch', () => {
  gulp.watch('./css/**/*', css)
})

gulp.task('default', gulp.series(gulp.parallel('css', 'images')))
