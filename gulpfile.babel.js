import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import webpack from 'webpack';
import config from './webpack-prod.config.babel';
import zip from 'gulp-zip';
import md5 from 'gulp-md5';
import through2 from 'through2';
import path from 'path';
import pkg from './package.json';

gulp.task('clean', () => {
  return del([
    'app/duxing-rrdd-react/**'
  ]);
});

gulp.task('build', ['clean', 'webpack:build']);

gulp.task('webpack:build', (callback) => {
  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }

    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    callback();
  });
});

gulp.task('zip', ['build'], () => {
  return gulp.src('duxing-rrdd-react/**/*.{html,js,css,jpg,jpeg,png,gif,svg,woff,woff2,ttf,eot}')
    .pipe(zip(`archive_${pkg.version}.zip`))
    .pipe(md5())
    .pipe(through2.obj(function(file, enc, cb) {
      this.push(file);
      this.push(new gutil.File({
        cwd: file.cwd,
        base: file.base,
        path: path.join(file.base, 'filename'),
        contents: new Buffer(path.basename(file.path))
      }));
      cb();
    }))
    .pipe(gulp.dest('duxing-rrdd-react'));
});

gulp.task('default', ['build', 'zip']);
