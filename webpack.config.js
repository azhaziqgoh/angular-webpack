module.exports = function(env){
    if(env && env.production){
        
        if(env.aot){
            console.log('aot');
            process.env.COMPILER = 'AOT';
        } else {
            console.log('jit');
            process.env.COMPILER = 'JIT';
        }

        return require('./config/webpack.prod.js')
        
    } else {
        return require('./config/webpack.dev.js')
    }
}