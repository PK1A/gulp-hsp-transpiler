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
                var transpileResult = hspTranspiler(String(file.contents), file.path);
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
