var hspTranspiler = require('hashspace/hsp/transpiler').processString;
var through = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function () {

    function transpileAFile(file, enc, cb) {

        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-hsp-transpiler', 'Streaming not supported'));
            return cb();
        }

        if (file.isBuffer()) {
            try {
                var contentAsString = String(file.contents);
                var transpileResult = {changed: false};

                try {
                    transpileResult = hspTranspiler(contentAsString, file.path);
                } catch (e) {
                    this.emit('error', new PluginError('gulp-hsp',
                        'Transpilation error in "' + file.path + '" at '+ e.line + ':' + e.col + ': ' + e.message), {
                        fileName: file.path,
                        lineNumber: e.line,
                        stack: e.stack
                    });
                }

                if (transpileResult.changed) {
                    file.contents = new Buffer(transpileResult.code);
                }
            } catch (e) {
                this.emit('error', e);
            }
        }

        this.push(file);
        cb();
    }

    return through.obj(transpileAFile);
}
