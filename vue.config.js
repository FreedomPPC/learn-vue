const glob = require('glob');
const path = require('path');
const vConsolePlugin = require('vconsole-webpack-plugin');
// 打包模式
const NODE_ENV = process.env.NODE_ENV;
// 打包环境
const VUE_APP_ENV = process.env.VUE_APP_ENV;
// production和uat为正式环境
const isPro = VUE_APP_ENV === 'production' || VUE_APP_ENV === 'uat';
/**
 * 文件路径处理
 * @param {String} dir
 */
function resolve(dir) {
    return path.join(__dirname, dir);
}

/**
 * 获取多页面入口配置
 * @param {String} globPath
 */
function getMultiEntry(globPath) {
    const pages = {};

    glob.sync(globPath).forEach(entry=> {
        const basename = path.basename(entry, path.extname(entry));

        pages[basename] = {
            entry: entry,
            template: 'src/template/' + basename + '.html',
            filename: basename + '.html',
            chunks: ['runtime', basename]
        };
    });
    return pages;
}

const pages = getMultiEntry('src/entries/*.js');

module.exports = {
    pages: pages,
    // cdn资源路径请修改三元表达式的第一项
    publicPath: isPro ? './' : './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    // 是否需要编译template模板
    // 默认使用runtime-only，有需要compiler的自行修改
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false,
    productionSourceMap: false,
    css: {
        sourceMap: NODE_ENV !== 'production'
    },
    configureWebpack: {
        plugins: [
            // 集成vconsole，正式环境下不开启
            new vConsolePlugin({enable: !isPro})
        ]
    },
    chainWebpack: config=> {
        // 关闭prefetch和preload功能
        for (const chunk in pages) {
            if (pages.hasOwnProperty(chunk)) {
                config.plugins.delete('prefetch-' + chunk);
                config.plugins.delete('preload-' + chunk);
            }
        }
        // code-split，一般情况下设置chunks为all即可
        // 有特殊打包需要可以参考下面例子和文档
        // 如果自定义配置chunk，需要同时添加到line 26的chunks配置
        // https://webpack.docschina.org/plugins/split-chunks-plugin/#optimization-splitchunks
        config.optimization.splitChunks({
            cacheGroups: {
                chunks: 'all'
                /*
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
                elementUI: {
                    name: 'chunk-elementUI', // 单独将 elementUI 拆包
                    priority: 20, // 权重要大于上面的chunk，不然会被打进去上面
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                }
                */
            }
        })
        // 将runtime单独抽成chunk
        config.optimization.runtimeChunk('single')
        config.resolve.extensions
            .add('.less');
        // 别名配置
        config.resolve.alias
            .set('src', resolve('src'))
            .set('api', resolve('src/api'))
            .set('js', resolve('src/assets/js'))
            .set('img', resolve('src/assets/img'))
            .set('css', resolve('src/assets/css'))
            .set('fonts', resolve('src/assets/fonts'))
            .set('media', resolve('src/assets/media'))
            .set('static', resolve('static'));
    },
    // 配置本地服务器
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        open: false,
        publicPath: '/',
        contentBase: './',
        // 接口代理，有需要可以自行配置
        // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
        // proxy: {

            /*
            // 示例：/api下的所有请求都会被代理（比如/api/getList、/api/prize等）。
            '/api': {
                target: 'https://api.xxx.com', // 要代理的接口地址
                changeOrigin: true,

                // 如果你不太了解pathRewrite，可以删掉下面的选项
                pathRewrite: {
                    '^/api': '/api', // 这种配置，代码里写'/api/getList'，实际发送的请求是https://api.xxx.com/api/getList。
                    '^/api': '/' // 这种配置，代码里写'/api/getList'，实际发送的请求是https://api.xxx.com/getList。
                }
            }
            */
        // },
        quiet: true
    }
};
