var gulp
= require('gulp'),
connect = require('gulp-connect');


var jshint = require('gulp-jshint'), stylish = require('jshint-stylish');

// Servidor web de desarrollo
gulp.task('server', function() {
connect.server({
root: './app',
port: 7000,
livereload: true
//middleware: function(connect, opt) {
//return [ historyApiFallback ];
//}
});
});


//Ayuda para el CSS preprocesador css
var stylus = require('gulp-stylus'),
nib
= require('nib');
// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
gulp.src('./app/stylesheets/main.styl')
.pipe(stylus({ use: nib() }))
.pipe(gulp.dest('./app/stylesheets'))
.pipe(connect.reload());
});
// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
gulp.src('./app/**/*.html')
.pipe(connect.reload());
});


// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() { return gulp.src('./app/scripts/*/.js')
.pipe(jshint('.jshintrc')) .pipe(jshint.reporter('jshint-stylish'))
.pipe(jshint.reporter('fail')); });


// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
gulp.watch(['./app/**/*.html'], ['html']);
gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
gulp.watch(['./app/scripts/**/*.js'], ['jshint']);
});


gulp.task('default', ['watch','server']);
