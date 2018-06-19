const gulp = require('gulp');
//transpile
const babel = require('gulp-babel');
//browser loader
var browserSync = require('browser-sync').create();
//webp images for optimization on some browsers
const webp = require('gulp-webp');
//responsive images module that requires imagemagick/graphicsmagic installed
const responsive = require('gulp-responsive-images');
//gulp delete for cleaning up directories
const del = require('del');
//run sequence to make sure each gulp command completes in the right order.
const runSequence = require('run-sequence');
//minify js 
const uglify = require('gulp-uglify');
//no whitespaces html
const htmlmin = require('gulp-htmlmin');
//module bundler
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
//babel for browserify
const babelify = require('babelify');
var minifyCss = require('gulp-minify-css');
//incline css into html
var inline = require('gulp-inline');

// =======================================================================// 
// !                Default and bulk tasks                                //        
// =======================================================================//  

//main task for building production dir
gulp.task('build', function (callback) {
    runSequence('clean',['responsive-jpg', 'responsive-webp'], 'scripts'), callback
});

//delete build to start over from scratch
gulp.task('clean', function () {
    return del.sync('build');
});


//to reload the project without building all over again
gulp.task('dev', function (callback) {
    runSequence('scripts'), callback
});

// =======================================================================// 
//                  Images and fonts                                      //        
// =======================================================================//  


gulp.task('webp', () =>
    gulp.src('src/img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('src/img'))
);


gulp.task('responsive-jpg', function () {
    gulp.src(['src/img/**/*'])
        .pipe(responsive({
            '*.jpg': [{
                    width: 1600,
                    quality: 40
                },
                {
                    width: 800,
                    quality: 70
                },
                {
                    width: 550,
                    quality: 100
                }
            ]
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('responsive-webp', function () {
    gulp.src(['src/img/**/*'])
        .pipe(responsive({
            '*.webp': [{
                    width: 1600,
                    quality: 40
                },
                {
                    width: 800,
                    quality: 70
                },
                {
                    width: 550,
                    quality: 80
                }
            ]
        }))
        .pipe(gulp.dest('build/img'));
});

// =======================================================================// 
//                  Gulp tasks                                            //        
// =======================================================================//  

//uses runSequence to first run the watch task, then load up the server
//and serve the files
gulp.task('scripts', function (callback) {
    runSequence('watch', 'browsersync', callback);
});


gulp.task('watch', (['browserify-main', 'inline-css']), function () {
    gulp.watch('src/css/*.css', ['inline-css']);
    gulp.watch('src/*.html', ['inline-css']);
    gulp.watch('src/js/*.js', ['browserify-main']);
});

//inline our css to avoid render blocking
gulp.task('inline-css', function () {
    return gulp.src('src/index.html')
        .pipe(inline({
            base: 'src/',
            css: [minifyCss],
            disabledTypes: ['svg', 'img', 'js'] // Only inline css files
        }))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// =======================================================================// 
//                  javascript functions                                  //        
// =======================================================================//  

//bundle with browserify and babelify. You will need to do this
//with each main file that requires imports/modules

gulp.task("browserify-main", function () {
    //wrap the bundle with browserify
    return browserify({
            //choose entry file (js file with bundling needs)
            entries: "./src/js/main.js"
        })
        //transpile it
        .transform(babelify.configure({
            presets: ["@babel/preset-env"]
        }))
        .bundle()
        //rename output file with source plugin
        .pipe(source("main.js"))
        .pipe(buffer())
        //initialize sourcemaps before minification
        .pipe(sourcemaps.init())
        //minify js
        .pipe(uglify())
        //write the sourcemaps to a easy to find folder
        .pipe(sourcemaps.write('./maps'))
        //output the bundled file
        .pipe(gulp.dest("./build/js"))
        //reload the browser to see changes
        .pipe(browserSync.reload({
            stream: true
        }));
})



// =======================================================================// 
//                   browser-reload                                       //        
// =======================================================================//  

gulp.task('browsersync', function () {
    browserSync.init({
        server: {
            //dir we want to serve from
            baseDir: 'build'
        },
    })
})