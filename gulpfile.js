var gulp = require('gulp');
var plugins=require('gulp-load-plugins')(); //initialization
var browserSync=require('browser-sync').create(); //creating server

gulp.task('css',function(){
 return gulp.src(['./sass/styles.scss'])
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass().on('Error',plugins.sass.logError))
  .pipe(plugins.cssmin())
  .pipe(plugins.autoprefixer())
  .pipe(plugins.sourcemaps.write())
  .pipe(gulp.dest('./dist/css'))  
  .pipe(browserSync.stream());
});


gulp.task('js',function(){
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './src/js/magic.js',
    './src/admin.js'
  ])
  .pipe(plugins.babel({
    presets:['es2015']
  }))
  .pipe(plugins.concat('all.js'))
  .pipe(plugins.uglify())
  .pipe(gulp.dest('./dist/js'))
  .pipe(browserSync.stream());

});

gulp.task('watch',function(){
  gulp.watch(['./sass/*.scss'],['css']);
  gulp.watch(['./src/js/*.js'],['js']);
});

gulp.task('serve', function(){
  browserSync.init({
    server:{
      baseDir: './'
    }
  });
  gulp.watch('*.html').on('change',browserSync.reload);
});

// gulp.task('default',function(){
//   console.log('first ever task of mine.');
// });
gulp.task('default',['css','js','watch','serve']);  //Now run only gulp