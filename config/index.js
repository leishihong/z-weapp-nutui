const { resolve } = require('path');

const pathResolve = (fileName) => resolve(__dirname, '..', fileName);

const config = {
	projectName: 'z-weapp-nutui',
	date: '2023-2-7',
	designWidth: 750,
	deviceRatio: {
		640: 2.34 / 2,
		750: 1,
		828: 1.81 / 2,
		375: 2 / 1
	},
	sourceRoot: 'src',
	outputRoot: 'dist',
	plugins: ['@tarojs/plugin-html'],
	defineConstants: {
		LOCATION_API_KEY: JSON.stringify('6WUBZ-X4TE6-OJBSZ-MMCIH-2EXCV-42BLQ'),
		// 小程序版本号，手动添加
		WE_APP_VERSION: JSON.stringify('1.0.0'),
		CUSTOM_EMAIL: JSON.stringify('kkdxxh@mytaste.ntesmail.com') // 客服邮箱
	},
	copy: {
		patterns: [],
		options: {}
	},
	framework: 'react',
	compiler: 'webpack4',
	alias: {
		api: pathResolve('src/api'),
		components: pathResolve('src/components'),
		assets: pathResolve('src/assets'),
		pages: pathResolve('src/pages'),
		utils: pathResolve('src/utils'),
		store: pathResolve('src/store'),
		libs: pathResolve('src/libs'),
		styles: pathResolve('src/styles'),
		hooks: pathResolve('src/hooks'),
		constants: pathResolve('src/constants')
	},
	sass: {
		// resource: [pathResolve('src/styles/nutui-theme.scss')],
		// data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`
	},
	mini: {
    // webpackChain(chain, webpack) {
    //   chain.optimization.splitChunks({
    //     chunks: 'all',
    //     maxInitialRequests: Infinity,
    //     minSize: 0,
    //     cacheGroups: {
    //       common: {
    //         name: 'common',
    //         minChunks: 2,
    //         priority: 1,
    //       },
    //       vendors: {
    //         name: 'vendors',
    //         minChunks: 2,
    //         test: (module) => {
    //           return /[\\/]node_modules[\\/]/.test(module.resource)
    //         },
    //         priority: 10,
    //       },
    //       // taro: {
    //       //   name: 'taro',
    //       //   test: (module) => {
    //       //     if (/@tarojs[\\/][a-z]+/.test(module.context)) {
    //       //       console.log(module.context)
    //       //     }
    //       //     return /@tarojs[\\/][a-z]+/.test(module.context)
    //       //   },
    //       //   priority: 100,
    //       // },
    //     },
    //   })
    // },
		postcss: {
			pxtransform: {
				enable: true,
				config: {
					selectorBlackList: ['nut-']
				}
			},
			url: {
				enable: true,
				config: {
					limit: 1024 // 设定转换尺寸上限
				}
			},
			cssModules: {
				enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:5]'
				}
			}
		}
	},
	h5: {
		publicPath: '/',
		staticDirectory: 'static',
		// esnextModules: ['nutui-react'],
		postcss: {
			pxtransform: {
				enable: true,
				config: {
					selectorBlackList: ['nut-']
				}
			},
			autoprefixer: {
				enable: true,
				config: {}
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]'
				}
			}
		}
	}
};

module.exports = function (merge) {
	if (process.env.NODE_ENV === 'development') {
		return merge({}, config, require('./dev'));
	}
	return merge({}, config, require('./prod'));
};
