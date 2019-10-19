const browserify = require('browserify')
const gulp = require('gulp')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const hash = require('gulp-hash')
const uglify = require('gulp-uglify-es').default
const del = require('del')
const postcss = require('gulp-postcss')
const critical = require('critical').stream
const logger = require('gulplog')
const htmlmin = require('gulp-htmlmin')
const run = require('gulp-run')

function javascript () {
  const b = browserify({
    entries: './js/main.js',
    debug: true,
    transform: [
      ['babelify', { presets: ['@babel/preset-env'] }]
    ]
  })

  del(['static/dist/js/**/*'])

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(hash())
    .pipe(uglify())
    .pipe(gulp.dest('static/dist/js'))
    .pipe(hash.manifest('hash.json'))
    .pipe(gulp.dest('data/js'))
}

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
  return gulp.src('../**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'))
}

function inlineCritical () {
  const hash = require('./data/css/hash.json')
  return gulp
    .src(['../index.html', '../articles/**/*.html', '../about/**/*.html'])
    .pipe(critical({
      base: '../',
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
      css: [`../dist/css/${hash['main.css']}`]
    }))
    .on('error', (err) => logger.error(err.message))
    .pipe(gulp.dest('../'))
}

function hugo () {
  return run('npm run build').exec()
}

gulp.task('javascript', javascript)
gulp.task('images', images)
gulp.task('css', css)
gulp.task('critical', inlineCritical)
gulp.task('minify-html', minifyHtml)
gulp.task('hugo', hugo)

gulp.task('watch', () => {
  gulp.watch('./css/**/*', css)
  gulp.watch('./js/**/*', javascript)
})

gulp.task('default', gulp.series(gulp.parallel('javascript', 'css', 'images'), 'hugo', 'critical'))
