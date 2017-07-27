var helpers = require('./helpers');

const COMPILER = process.env.COMPILER;

exports.compilerConfig = function(){

    if(COMPILER == 'AOT'){
        return require('./webpack.aot.js');
    } else {
        return require('./webpack.jit.js');
    }
}

exports.prodOutputPath = function(){

    if(COMPILER == 'AOT'){
        return helpers.root('dist/aot');
    } else {
        return helpers.root('dist/jit');
    }
}