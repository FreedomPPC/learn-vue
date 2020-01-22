const config = {
    presets: [
        ['@vue/app', {
            polyfills: [
                'es6.symbol',
                'es7.array.includes',
                'es6.string.includes',
                'es6.array.find',
                'es6.array.find-index'
            ]
        }]
    ],
    plugins: [
        ['@babel/plugin-proposal-optional-chaining']
    ]
};
// 正式环境打包去除console，保留error和warn等级
if (process.env.VUE_APP_ENV === 'production') {
    config.plugins.push([
        'babel-plugin-transform-remove-console', {exclude: ['error', 'warn']}
    ]);
}

module.exports = config;
