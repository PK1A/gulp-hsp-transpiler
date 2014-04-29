gulp-hsp-transpiler
====================

## Usage

In your `gulpfile.js`:

```javascript
var gulp = require('gulp');
var hspTranspiler = require('gulp-hsp-transpiler');

gulp.task('default', function() {

    //transpile & copy
    gulp.src('src/**/*.js')
        .pipe(hspTranspiler())
        .pipe(gulp.dest('dist'));
});
```