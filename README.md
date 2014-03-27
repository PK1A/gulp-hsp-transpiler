gulp-hsp-transpiler
====================

## Usage

In your `gulpfile.js`:

```javascript
var gulp = require('gulp');
var hspCompiler = require('gulp-hsp-compiler');
var hspTranspiler = require('gulp-hsp-transpiler');

gulp.task('default', function() {

    //compile & copy
    gulp.src('src/**/*.hsp')
        .pipe(hspCompiler())
        .pipe(hspTranspiler())
        .pipe(gulp.dest('dist'));

});
```